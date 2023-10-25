import { Client, Guild, Snowflake } from "discord.js";
import { AudioControl } from "../interfaces/AudioControl";
import { AudioSettings } from "../types/types";
import { Player } from "./Player";
import { LibraryError, LibraryErrors } from "../errors/LibraryError";
import { AudioPlayer, VoiceConnection, createAudioPlayer, joinVoiceChannel } from "@discordjs/voice";
import { Queue } from "../objects/Queue";
import { Song } from "../objects/Song";

export class AudioController implements AudioControl {

    private _player: Player;
    private _client: Client;
    private _guildId: Snowflake;
    private _guild: Guild;

    private _bitrate: number = 64_000;
    private _volume: number = 50;
    private _loop: boolean = false;

    private _audioPlayer: AudioPlayer;
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
    }

    getPlaybackState() {
        if (!this._audioPlayer) throw new Error("No audio player found!");
        return this._audioPlayer.state.status;
    }

    pause(): void {
        if (!this._audioPlayer) throw new Error("No audio player found!");
        this._audioPlayer.pause(true);
    }

    resume(): void {
        if (!this._audioPlayer) throw new Error("No audio player found!");
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
    
    changeVolume(volume: number): Promise<void> {
        throw new Error("Method not implemented.");
    }


    getVolume(): number {
        throw new Error("Method not implemented.");
    }


    setLoop(loop: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }


    isLooped(): boolean {
        throw new Error("Method not implemented.");
    }


    seek(position: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}