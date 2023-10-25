
import { Client, Collection, Guild, Snowflake } from "discord.js"
import { AudioController } from "./AudioController";
import { QueueController } from "./QueueController";
import { AudioControl } from "../interfaces/AudioControl";
import { QueueControl } from "../interfaces/QueueControl";
import { ClientController } from "./ClientController";
import { AudioSettings, ClientOptions } from "../types/types";
import EventEmitter from "events";

/**
 * Class for managing the player.
 */
export class Player {

    /**
     * The client that instantiated this class.
     */
    private _client: Client;

    /**
     * The audio controller for this player.
     */
    private _audioController: Collection<Snowflake, AudioControl> = new Collection<Snowflake, AudioControl>();;

    /**
     * The queue controller for this player.
     */
    private _queueController: Collection<Snowflake, QueueControl> = new Collection<Snowflake, QueueControl>();;

    /**
     * The client controller for this player.
     */
    private _clientController: ClientController;

    /**
     * The event emitter for this player.
     */
    private _eventEmitter: EventEmitter = new EventEmitter();

    /**
     * Creates a new player.
     * @param client The client that instantiated this class
     * @param audioSettings The audio settings for this player
     * @param clientOptions The client options for this player
     */
    constructor(client: Client, clientOptions: ClientOptions = {}) {
        this._client = client;
        this._clientController = new ClientController(this, clientOptions);
    }

    intialize(guildId: Snowflake, audioSettings: AudioSettings = {}): void {
        this._audioController.set(guildId, new AudioController(this, guildId, audioSettings));
        this._queueController.set(guildId, new QueueController(this));
    }

    /**
     * Gets the event emitter for this player.
     */
    get eventEmitter(): EventEmitter {
        return this._eventEmitter;
    }

    /**
     * Gets the client that instantiated this class.
     */
    get client(): Client {
        return this._client;
    }

    /**
     * Gets the audio controller for the guild.
     * @param guildId The guild id
     */
    getAudioController(guildId: Snowflake): AudioControl | undefined {
        return this._audioController.get(guildId);
    }

    /**
     * Gets the queue controller for this guild.
     * @param guildId The guild id
     */
    getQueueController(guildId: Snowflake): QueueControl | undefined {
        return this._queueController.get(guildId);
    }

    /**
     * Gets the client controller for this player.
     */
    get clientController(): ClientController {
        return this._clientController;
    }
    
}