import { Client, Guild, Snowflake } from "discord.js";
import { AudioControl } from "../interfaces/AudioControl";
import { AudioSettings } from "../types/types";
import { Player } from "./Player";
import { LibraryError, LibraryErrors } from "../errors/LibraryError";
import { AudioPlayer, AudioResource, StreamType, VoiceConnection, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { Song } from "../objects/Song";
import ytdl from "discord-ytdl-core";

export class AudioController implements AudioControl {

    private _player: Player;
    private _client: Client;
    private _guildId: Snowflake;
    private _guild: Guild;

    private _bitrate: number = 64_000;
    private _volume: number = 50;
    private _loop: boolean = false;

    private _audioPlayer: AudioPlayer;
    private _audioResource: AudioResource<Song>;

    private _voiceConnection: VoiceConnection;

    constructor(player: Player, guildId: Snowflake, settings: AudioSettings = {}) {
        this._player = player;
        this._client = player.client;
        this._guildId = guildId;
        this._guild = this._client.guilds.cache.get(this._guildId)!;
        
        this._bitrate = settings.bitrate ?? this._bitrate;
        this._volume = settings.volume ?? this._volume;
        this._loop = settings.loop ?? this._loop;
    }

    get player(): Player {
        return this._player;
    }

    _play(song: Song, seek?: number): void {
        if (!this._voiceConnection) throw new LibraryError(LibraryErrors.NO_VOICE_CONNECTION);
        if (!this._audioPlayer) throw new LibraryError(LibraryErrors.NO_AUDIO_PLAYER);

        const stream = ytdl(song.url, {
            filter: "audioonly",
            opusEncoded: false,
            fmt: "mp3",
            seek: seek ?? 0,
        }).on("error", (_err: any) => {
            throw new LibraryError(LibraryErrors.YOUTUBE_DL_ERROR);  
        });

        this._audioResource = createAudioResource(stream, {
            metadata: song,
            inputType: StreamType.Raw,
        });

        this._audioResource.volume?.setVolumeLogarithmic(this._volume / 200);
        this._audioPlayer.play(this._audioResource);

    }

    async play(actionedBy: string, query: string): Promise<void> {

        const guildMember = await this._guild.members.fetch(actionedBy).catch(() => null);
        if (!guildMember) throw new LibraryError(LibraryErrors.INVALID_GUILD_MEMBER);

        const voiceChannel = guildMember.voice.channel;
        if (!voiceChannel) throw new LibraryError(LibraryErrors.INVALID_VOICE_CHANNEL);

        if (this._voiceConnection === undefined) {
            this._voiceConnection = joinVoiceChannel({
                group: this.player.clientController.group,
                channelId: voiceChannel.id,
                guildId: this._guildId,
                adapterCreator: this._guild.voiceAdapterCreator,
            });
            this._audioPlayer = createAudioPlayer();
        }

        //TODO: Implement search function
        let song: Song = {} as Song;
        this._play(song);

    }

    getPlaybackState() {
        if (!this._audioPlayer) throw new LibraryError(LibraryErrors.NO_AUDIO_PLAYER);
        return this._audioPlayer.state.status;
    }

    pause(): void {
        if (!this._audioPlayer) throw new LibraryError(LibraryErrors.NO_AUDIO_PLAYER);
        this._audioPlayer.pause(true);
    }

    resume(): void {
        if (!this._audioPlayer) throw new LibraryError(LibraryErrors.NO_AUDIO_PLAYER);
        this._audioPlayer.unpause();
    }


    skip(amount: number, includeCurrentSong?: boolean): Promise<void> {
        const queueController = this.player.getQueueController(this._guildId)!;
        while(amount - (includeCurrentSong ? 1 : 0) > 0 && !queueController.getQueue().isEmpty) {
            queueController.getQueue().dequeue();
            amount--;
        }

        //TODO: Implement audio player skip function
        //TODO: Exit voice channel if queue is empty and leaveOnEnd is true
        if (includeCurrentSong) queueController.loadNextSong();

        return Promise.resolve();
    }
    
    changeVolume(volume: number): void {
        if (volume < 0 && volume >= 200) throw new LibraryError(LibraryErrors.INVALID_VOLUME);

        this._volume = volume;
        if (this._audioResource) this._audioResource.volume?.setVolumeLogarithmic(volume / 200);
    }


    getVolume(): number {
        return this._volume;
    }


    setLoop(loop: boolean): void {
        this._loop = loop;
    }


    isLooped(): boolean {
        return this._loop;
    }


    seek(time: number): Promise<void> {
        if (!this._voiceConnection) throw new LibraryError(LibraryErrors.NO_VOICE_CONNECTION);
        if (!this._audioPlayer) throw new LibraryError(LibraryErrors.NO_AUDIO_PLAYER);
        if (!this._audioResource) throw new LibraryError(LibraryErrors.NO_RESOURCE);
        if (!this._audioResource.metadata) throw new LibraryError(LibraryErrors.NO_RESOURCE);
        if (this._audioResource.metadata.length < time || time < 0) throw new LibraryError(LibraryErrors.INVALID_DURATION);

        this._play(this._audioResource.metadata, time);

        throw new Error("Method not implemented.");
    }

}