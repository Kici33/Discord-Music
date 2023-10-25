import { Song } from "../objects/Song"
import { SongData } from "../objects/SongData";
import { Playlist } from "../objects/Playlist";
import { LibraryErrors } from '../errors/LibraryError';
import fetch from 'isomorphic-unfetch';
import YTSR, {Video} from 'ytsr';
import Spotify from "spotify-url-info";
import appleSearch, { Track, RawPlaylist } from "apple-music-metadata";
import {Client, Playlist as IPlaylist, Video as IVideo, VideoCompact} from "youtubei";
import {ChannelType, GuildChannel} from "discord.js";
import { DefaultPlaylistOptions, DefaultSearchOptions, PlaylistSearchOptions, SearchOptions } from "../types/types";

let YouTube = new Client();
const {getData, getPreview} = Spotify(fetch);

export class Utils {
    static regexList = {
        YouTubeVideo: /^((?:https?:)\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))((?!channel)(?!user)\/(?:[\w\-]+\?v=|embed\/|v\/)?)((?!channel)(?!user)[\w\-]+)(((.*(\?|\&)t=(\d+))(\D?|\S+?))|\D?|\S+?)$/,
        YouTubeVideoID: /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
        YouTubePlaylist: /^((?:https?:)\/\/)?((?:www|m)\.)?((?:youtube\.com)).*(youtu.be\/|list=)([^#&?]*).*/,
        YouTubePlaylistID: /[&?]list=([^&]+)/,
        Spotify: /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-)+)(?:(?=\?)(?:[?&]foo=(\d*)(?=[&#]|$)|(?![?&]foo=)[^#])+)?(?=#|$)/,
        SpotifyPlaylist: /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:(album|playlist)\/|\?uri=spotify:playlist:)((\w|-)+)(?:(?=\?)(?:[?&]foo=(\d*)(?=[&#]|$)|(?![?&]foo=)[^#])+)?(?=#|$)/,
        Apple: /https?:\/\/music\.apple\.com\/.+?\/.+?\/(.+?)\//,
        ApplePlaylist: /https?:\/\/music\.apple\.com\/.+?\/.+?\/(.+?)\//,
    }

    /**
     *
     */
    private constructor() {
    }

    /**
     * Get ID from YouTube link
     * @param {string} url
     * @returns {?string}
     */
    static parseVideo(url: string): string | null {
        const match = url.match(this.regexList.YouTubeVideoID);
        return match ? match[7] : null;
    }

    /**
     * Get timecode from YouTube link
     * @param {string} url
     * @returns {?string}
     */
    static parseVideoTimecode(url: string): string | null {
        const match = url.match(this.regexList.YouTubeVideo);
        return match ? match[10] : null;
    }

    /**
     * Get ID from Playlist link
     * @param {string} url
     * @returns {?string}
     */
    static parsePlaylist(url: string): string | null {
        const match = url.match(this.regexList.YouTubePlaylistID);
        return match ? match[1] : null;
    }

    /**
     * Search for Songs
     * @param {string} Search
     * @param {PlayOptions} [SOptions=DefaultPlayOptions]
     * @param {number} [Limit=1]
     * @return {Promise<Song[]>}
     */
    static async search(Search: string, SOptions: SearchOptions = DefaultSearchOptions, Limit: number = 1): Promise<Song[]> {
        SOptions = Object.assign({}, DefaultSearchOptions, SOptions);
        let Filters;

        try {
            // Default Options - Type: Video
            let FiltersTypes = await YTSR.getFilters(Search);
            Filters = FiltersTypes.get('Type')!.get('Video')!;

            // Custom Options - Upload date: null
            if (SOptions?.uploadDate !== null)
                Filters = Array.from(
                        (
                            await YTSR.getFilters(Filters.url!)
                        )
                            .get('Upload date')!, ([name, value]) => ({name, url: value.url})
                    )
                        .find(o => o.name.toLowerCase().includes(SOptions?.uploadDate!))
                    ?? Filters;

            // Custom Options - Duration: null
            if (SOptions?.duration !== null)
                Filters = Array.from(
                        (
                            await YTSR.getFilters(Filters.url!)
                        )
                            .get('Duration')!, ([name, value]) => ({name, url: value.url})
                    )
                        .find(o => o.name.toLowerCase().startsWith(SOptions?.duration!))
                    ?? Filters;

            // Custom Options - Sort by: relevance
            if (SOptions?.sortBy !== null && SOptions?.sortBy !== 'relevance')
                Filters = Array.from(
                        (
                            await YTSR.getFilters(Filters.url!)
                        )
                            .get('Sort by')!, ([name, value]) => ({name, url: value.url})
                    )
                        .find(o => o.name.toLowerCase().includes(SOptions?.sortBy!))
                    ?? Filters;

            let Result = await YTSR(
                Filters.url!,
                {
                    limit: Limit,
                }
            );

            let items = Result.items as Video[];

            let songs: (Song | null)[] = items.map(item => {
                if (item?.type?.toLowerCase() !== 'video')
                    return null;
                return new Song(
                    item.author!.name,
                    item.title,
                    item.url,
                    parseInt(item.duration!.split(":")[0])*60 + parseInt(item.duration!.split(":")[1]),
                    item.bestThumbnail.url!,
                    SOptions.actionedBy,
                    new SongData(
                        null,
                        item.isLive,
                        SOptions.seek ?? 0
                    ))
            }).filter(I => I);

            return songs as Song[];
        } catch (e) {
            throw LibraryErrors.SEARCH_NULL;
        }
    }

    /**
     * Search for Song via link
     * @param {string} Search
     * @param {PlayOptions} SOptions
     * @return {Promise<Song>}
     */
    static async link(Search: string, SOptions: SearchOptions = DefaultSearchOptions) {

        let SpotifyLink =
            this.regexList.Spotify.test(Search);
        let YouTubeLink =
            this.regexList.YouTubeVideo.test(Search);
        let AppleLink =
            this.regexList.Apple.test(Search);

        if (AppleLink) {
            try {
                let AppleResult = await appleSearch(Search) as Track;
                if (AppleResult) {
                    let SearchResult = await this.search(
                        `${AppleResult.artist} - ${AppleResult.title}`,
                        SOptions
                    );
                    return SearchResult[0];
                }
            } catch (e) {
                throw LibraryErrors.INVALID_APPLE;
            }
        } else if (SpotifyLink) {
            try {
                let SpotifyResult = await getPreview(Search);
                let SearchResult = await this.search(
                    `${SpotifyResult.artist} - ${SpotifyResult.title}`,
                    SOptions
                );
                return SearchResult[0];
            } catch (e) {
                throw LibraryErrors.INVALID_SPOTIFY;
            }
        } else if (YouTubeLink) {
            let VideoID = this.parseVideo(Search);
            if (!VideoID) throw LibraryErrors.SEARCH_NULL;
            YouTube = new Client();
            let VideoResult = await YouTube.getVideo(VideoID) as IVideo;
            if (!VideoResult) throw LibraryErrors.SEARCH_NULL;
            let VideoTimecode = this.parseVideoTimecode(Search);

            return new Song(
                VideoResult.channel.name,
                VideoResult.title,
                Search,
                VideoResult.duration,
                VideoResult.thumbnails.best,
                SOptions.actionedBy,
                new SongData(
                    null,
                    VideoResult.isLiveContent,
                    SOptions.timecode && VideoTimecode ? Number(VideoTimecode) : 0,
                ))
        } else return null;
    }

    /**
     * Gets the best result of a Search
     * @param {Song|string} Search
     * @param {PlayOptions} SOptions
     * @param {Queue} Queue
     * @return {Promise<Song>}
     */
    static async best(Search: Song | string, SOptions: SearchOptions = DefaultSearchOptions): Promise<Song> {
        let _Song;

        if (Search instanceof Song)
            return Search as Song;

        _Song = await this.link(
            Search,
            SOptions
        ).catch(error => {
            if (!(error instanceof TypeError)) {
                throw LibraryErrors.UNKNOWN //Ignore typeError
            }
        });

        if (!_Song)
            _Song = (await this.search(
                Search,
                SOptions
            ))[0];

        return _Song;
    }

    /**
     * Search for Playlist
     * @param {string} Search
     * @param {PlaylistOptions} SOptions
     * @param {Queue} Queue
     * @return {Promise<Playlist>}
     */
    static async playlist(Search: string, SOptions: PlaylistSearchOptions & { data?: any } = DefaultPlaylistOptions): Promise<Playlist> {

        let Limit = SOptions.maxSongs ?? -1;
        let SpotifyPlaylistLink =
            this.regexList.SpotifyPlaylist.test(Search);
        let YouTubePlaylistLink =
            this.regexList.YouTubePlaylist.test(Search);
        let ApplePlaylistLink =
            this.regexList.ApplePlaylist.test(Search);

        if (ApplePlaylistLink) {

            let AppleResultData = await appleSearch(Search).catch(() => null) as RawPlaylist;
            if (!AppleResultData)
                throw LibraryErrors.INVALID_PLAYLIST;


            let songs = (
                await Promise.all(
                    AppleResultData.tracks.map(async (track, index) => {
                        if (Limit !== -1 && index >= Limit)
                            return null;
                        const Result = await this.search(
                            `${track.artist} - ${track.title}`,
                            SOptions
                        ).catch(() => null);
                        if (Result && Result[0]) {
                            return Result[0];
                        } else return null;
                    })
                )
            )
                .filter((V): V is Song => V !== null);


            if (songs.length === 0)
                throw LibraryErrors.INVALID_PLAYLIST;


            if (SOptions.shuffle)
                songs = this.shuffle(songs);
                

            return new Playlist(
                AppleResultData.title,
                AppleResultData.creator.name,
                Search,
                songs
            );     
        } else if (SpotifyPlaylistLink) {
            let SpotifyResultData = await getData(Search).catch(() => null);
            if (!SpotifyResultData || !['playlist', 'album'].includes(SpotifyResultData.type))
                throw LibraryErrors.INVALID_PLAYLIST;

            let songs = (
                await Promise.all(
                    (SpotifyResultData.tracks?.items ?? []).map(async (track: any, index: number) => {
                        if (Limit !== -1 && index >= Limit)
                            return null;
                        if (SpotifyResultData.type === 'playlist')
                            track = track.track
                        const Result = await this.search(
                            `${track.artists[0].name} - ${track.name}`,
                            SOptions
                        ).catch(() => null);
                        if (Result && Result[0]) {
                            return Result[0];
                        } else return null;
                    })
                )
            )
                .filter((V): V is Song => V !== null);

            if (songs.length === 0)
                throw LibraryErrors.INVALID_PLAYLIST;

            if (SOptions.shuffle)
                songs = this.shuffle(songs);

            return new Playlist(
                SpotifyResultData.name,
                SpotifyResultData.type === 'playlist' ? SpotifyResultData.owner.display_name : SpotifyResultData.artists[0].name,
                Search,
                songs
            );
        } else if (YouTubePlaylistLink) {
            let PlaylistID = this.parsePlaylist(Search);
            if (!PlaylistID)
                throw LibraryErrors.INVALID_PLAYLIST;

            YouTube = new Client();
            let YouTubeResultData = await YouTube.getPlaylist(PlaylistID);
            if (!YouTubeResultData || Object.keys(YouTubeResultData).length === 0)
                throw LibraryErrors.INVALID_PLAYLIST;

            // if (YouTubeResultData instanceof IPlaylist && YouTubeResultData.videoCount > 100 && (Limit === -1 || Limit > 100))
                // await YouTubeResultData.next(Math.floor((Limit === -1 || Limit > YouTubeResultData.videoCount ? YouTubeResultData.videoCount : Limit - 1) / 100));

            let songs = (YouTubeResultData.videos as VideoCompact[]).map((video: VideoCompact, index: number) => {
                if (Limit !== -1 && index >= Limit)
                    return null;
                return new Song(
                    video.channel!.name,
                    video.title,
                    `https://youtube.com/watch?v=${video.id}`,
                    video.duration ?? 0,
                    video.thumbnails.best!,
                SOptions.actionedBy,
                new SongData(
                    null,
                    video.isLive,
                    0
                )
                )
            })
                .filter((V): V is Song => V !== null);

            if (songs.length === 0)
                throw LibraryErrors.INVALID_PLAYLIST;

            if (SOptions.shuffle)
                songs = this.shuffle(songs);

            return new Playlist(
                YouTubeResultData.title,
                YouTubeResultData instanceof IPlaylist ? YouTubeResultData.channel?.name ?? 'YouTube Mix' : 'YouTube Mix',
                Search,
                songs
            );
        }

        throw LibraryErrors.INVALID_PLAYLIST;
    }

    /**
     * Shuffles an array
     * @param {any[]} array
     * @returns {any[]}
     */
    static shuffle(array: any[]): any[] {
        if (!Array.isArray(array))
            return [];
        const clone = [...array];
        const shuffled = [] as any[];
        while (clone.length > 0)
            shuffled.push(
                clone.splice(
                    Math.floor(
                        Math.random() * clone.length
                    ), 1
                )[0]
            );
        return shuffled;
    }

    /**
     * Converts milliseconds to duration (HH:MM:SS)
     * @returns {string}
     */
    static msToTime(duration: number): string {
        const seconds = Math.floor(duration / 1000 % 60);
        const minutes = Math.floor(duration / 60000 % 60);
        const hours = Math.floor(duration / 3600000);
        const secondsPad = `${seconds}`.padStart(2, '0');
        const minutesPad = `${minutes}`.padStart(2, '0');
        const hoursPad = `${hours}`.padStart(2, '0');

        return `${hours ? `${hoursPad}:` : ''}${minutesPad}:${secondsPad}`;
    }

    /**
     * Converts duration (HH:MM:SS) to milliseconds
     * @returns {number}
     */
    static timeToMs(duration: string): number {
        return duration.split(':')
            .reduceRight(
                (prev, curr, i, arr) => prev + parseInt(curr) * 60 ** (arr.length - 1 - i), 0
            ) * 1000;
    }

    static isVoiceChannel(Channel: GuildChannel): boolean {
        let type = Channel.type as ChannelType | string;
        if (typeof type === 'string')
            return ['GUILD_VOICE', 'GUILD_STAGE_VOICE'].includes(type);
        else return [ChannelType.GuildVoice, ChannelType.GuildStageVoice].includes(type);
    }

    static isStageVoiceChannel(Channel: GuildChannel): boolean {
        let type = Channel.type as ChannelType | string;
        if (typeof type === 'string')
            return type === 'GUILD_STAGE_VOICE';
        else return type === ChannelType.GuildStageVoice;
    }

}
