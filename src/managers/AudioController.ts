import { AudioControl } from "../interfaces/AudioControl";
import { Player } from "./Player";

export class AudioController implements AudioControl {

    public _player: Player;
    
    constructor(player: Player) {
        this._player = player;
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
    
    changeVolume(volume: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    setLoop(loop: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }

}