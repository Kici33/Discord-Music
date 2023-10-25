import { Song } from "../objects/Song";

/**
 * Interface for managing the queue of songs.
 */
export interface QueueControl {
    /**
     * Shuffles the queue.
     */
    shuffle(): Promise<void>;

    /**
     * Clears the queue.
     */
    clearQueue(): Promise<void>;

    /**
     * Gets current queue.
     */
    getQueue(): Promise<any>;

    /**
     * Add a song to the queue.
     */
    addSong(): Promise<void>;

    /**
     * Display current song.
     */
    currentSong(): Promise<Song>;
}