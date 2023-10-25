import { Snowflake } from "discord.js";

/**
 * Interface for controlling audio playback.
 */
export interface AudioControl {
    /**
     * Plays a song from a query or URL.
     * @param actionedBy Snowflake of the user who requested the song
     * @param query The query to search for
     */
    play(actionedBy: Snowflake, query: string): Promise<void>;

    /**
     * Pauses the current song.
     */
    pause(): void;

    /**
     * Resumes the current song in the queue.
     */
    resume(): void;

    /**
     * Skips the current song or multiple songs.
     * @param amount The amount of songs to skip
     * @param includeCurrentSong Whether to include the current song in the amount
     */
    skip(amount: number | undefined, includeCurrentSong: boolean): Promise<void>;

    /**
     * Changes the volume of the current song.
     * @param volume The volume to change to
     */
    changeVolume(volume: number): void;

    /**
     * Gets the current volume of the player
     */
    getVolume(): number;

    /**
     * Loops the current song.
     * @param loop Whether to loop the song or not
     */
    setLoop(loop: boolean): void;

    /**
     * Gets whether the current song is looped or not.
     */
    isLooped(): boolean;

    /**
     * Seeks to a certain position in the current song.
     * @param time The position to seek to
     */
    seek(time: number): Promise<void>;

}
