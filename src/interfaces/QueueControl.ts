import { Queue } from "../objects/Queue";
import { Song } from "../objects/Song";

/**
 * Interface for managing the queue of songs.
 */
export interface QueueControl {
    /**
     * Shuffles the queue.
     */
    shuffle(): void;

    /**
     * Clears the queue.
     */
    clearQueue(): void;

    /**
     * Add a song to the queue.
     * @param song The song to be added
     */
    addSong(song: Song): void;

    /**
     * Gets current queue.
     */
    getQueue(): Queue<Song>;

    /**
     * Displays current song.
     */
    getCurentSong(): Song | undefined;
}