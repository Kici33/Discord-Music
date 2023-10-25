import { QueueControl } from "../interfaces/QueueControl";
import { Queue } from "../objects/Queue";
import { Song } from "../objects/Song";
import { Player } from "./Player";

export class QueueController implements QueueControl {

    private _player: Player;
    
    private _currentSong: Song | undefined;
    private _queue: Queue<Song> = new Queue<Song>();

    constructor(player: Player) {
        this._player = player;
    }

    get player(): Player {
        return this._player;
    }
    
    shuffle(): void {
        throw new Error("Method not implemented.");
    }
    
    clearQueue(): void {
        this._queue = new Queue<Song>();
    }

    getQueue(): Queue<Song> {
        return this._queue;
    }

    addSong(song: Song): void {
        this._queue.enqueue(song);
    }

    getCurentSong(): Song | undefined {
        return this._currentSong;
    }

}