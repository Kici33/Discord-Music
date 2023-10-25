import { QueueControl } from "../interfaces/QueueControl";
import { Queue } from "../objects/Queue";
import { Song } from "../objects/Song";
import { Player } from "./Player";

export class QueueController implements QueueControl {

    public _player: Player;
    
    public _currentSong: Song | undefined;
    public _queue: Queue<Song> = new Queue<Song>();

    public _loop: boolean = false;

    constructor(player: Player) {
        this._player = player;
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