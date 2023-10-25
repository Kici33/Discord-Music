import { QueueControl } from "../interfaces/QueueControl";
import { Song } from "../objects/Song";
import { Player } from "./Player";

export class QueueController implements QueueControl {

    public _player: Player;
    
    public _currentSong: Song | undefined;
    public _queue: Song[] = [];

    public _loop: boolean = false;

    constructor(player: Player) {
        this._player = player;
    }

    shuffle(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    clearQueue(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getQueue(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    addSong(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    currentSong(): Promise<Song> {
        throw new Error("Method not implemented.");
    }

}