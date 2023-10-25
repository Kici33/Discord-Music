
import { Client } from "discord.js"
import { AudioController } from "./AudioController";
import { QueueController } from "./QueueController";
import { AudioControl } from "../interfaces/AudioControl";
import { QueueControl } from "../interfaces/QueueControl";
import { ClientController } from "./ClientController";
import { AudioSettings, ClientOptions } from "../types/types";

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
    private _audioController: AudioControl;

    /**
     * The queue controller for this player.
     */
    private _queueController: QueueControl;

    /**
     * The client controller for this player.
     */
    private _clientController: ClientController;

    /**
     * Creates a new player.
     * @param client The client that instantiated this class
     */
    constructor(client: Client, audioSettings: AudioSettings = {}, clientOptions: ClientOptions = {}) {
        this._client = client;

        this._audioController = new AudioController(this, audioSettings);
        this._queueController = new QueueController(this);   
        this._clientController = new ClientController(this, clientOptions);
    }

    /**
     * Gets the client that instantiated this class.
     */
    get client(): Client {
        return this._client;
    }

    /**
     * Gets the audio controller for this player.
     */
    get audioController(): AudioControl {
        return this._audioController;
    }

    /**
     * Gets the queue controller for this player.
     */
    get queueController(): QueueControl {
        return this._queueController;
    }
    
}