import { AudioControl } from "../interfaces/AudioControl";
import { ClientOptions, AudioSettings } from "../types/types";
import { Player } from "./Player";

export class AudioController implements AudioControl {

    private _player: Player;

    private _bitrate: number = 64_000;
    private _volume: number = 50;
    private _loop: boolean = false;

    constructor(player: Player, settings: AudioSettings = {}) {
        this._player = player;
        
        this._bitrate = settings.bitrate ?? this._bitrate;
        this._volume = settings.volume ?? this._volume;
        this._loop = settings.loop ?? this._loop;
    }

    get player(): Player {
        return this._player;
    }

    play(actionedBy: string, query: string): Promise<void> {
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