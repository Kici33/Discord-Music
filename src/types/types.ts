
export interface AudioSettings {

    /**
     * The bitrate of the player.
     * @default 64_000
     * Ranges from 8_000 to 384_000
     */
    bitrate?: number;

    /**
     * The volume of the player.
     * @default 50
     * Ranges from 1 to 100
     */
    volume?: number;

    /**
     * Whether the player is looped or not.
     * @default false
     */
    loop?: boolean;

}

export interface ClientOptions {

    /**
     * Whether to leave the voice channel when the channel is empty;
     * @default false
     */
    leaveOnEmpty?: boolean;
    
    /**
     * Whether to leave the voice channel when the queue is empty;
     * @default false
     */
    leaveOnEnd?: boolean;

    /**
     * Whether to deafen the bot when it joins the voice channel.
     * @default true
     */
    deafenOnJoin?: boolean;

    /**
     * Group for the voice connection.
     * @default "default"
     */
    group?: string;

}