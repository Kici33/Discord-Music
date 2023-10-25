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
    pause(): Promise<void>;

    /**
     * Resumes the current song in the queue.
     */
    resume(): Promise<void>;

    /**
     * Skips the current song or multiple songs.
     * @param amount The amount of songs to skip
     * @param includeCurrentSong Whether to include the current song in the amount
     */
    skip(amount: number | undefined, includeCurrentSong: boolean): Promise<void>;

    /**
     * Changes the bitrate of the current song.
     * @param bitrate The bitrate to change to
     */
    changeBitrate(bitrate: number): Promise<void>;

    /**
     * Gets the current bitrate of the player
     */
    getBitrate(): number;

    /**
     * Changes the volume of the current song.
     * @param volume The volume to change to
     */
    changeVolume(volume: number): Promise<void>;

    /**
     * Gets the current volume of the player
     */
    getVolume(): number;

    /**
     * Loops the current song.
     * @param loop Whether to loop the song or not
     */
    setLoop(loop: boolean): Promise<void>;

    /**
     * Gets whether the current song is looped or not.
     */
    isLooped(): boolean;

    /**
     * Seeks to a certain position in the current song.
     * @param position The position to seek to
     */
    seek(position: number): Promise<void>;

}
