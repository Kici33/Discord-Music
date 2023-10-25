import { Client, Guild, Snowflake } from "discord.js";
import { AudioControl } from "../interfaces/AudioControl";
import { AudioSettings } from "../types/types";
import { Player } from "./Player";
import { LibraryError, LibraryErrors } from "../errors/LibraryError";
import { DiscordGatewayAdapterImplementerMethods, DiscordGatewayAdapterLibraryMethods, VoiceConnection, joinVoiceChannel } from "@discordjs/voice";

export class AudioController implements AudioControl {

    private _player: Player;
    private _client: Client;
    private _guildId: Snowflake;
    private _guild: Guild;

    private _bitrate: number = 64_000;
    private _volume: number = 50;
    private _loop: boolean = false;

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
        }
        
        



        throw new Error("Method not implemented.");
    }






























    pause(): Promise<void> {
        throw new Error("Method not implemented.");
    }


    resume(): Promise<void> {
        throw new Error("Method not implemented.");
    }


    skip(amount: number | undefined, includeCurrentSong: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }


    changeBitrate(bitrate: number): Promise<void> {
        throw new Error("Method not implemented.");
    }


    getBitrate(): number {
        throw new Error("Method not implemented.");
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