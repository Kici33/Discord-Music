
import { Client } from "discord.js"
import { AudioController } from "./AudioController";
import { QueueController } from "./QueueController";
import { AudioControl } from "../interfaces/AudioControl";
import { QueueControl } from "../interfaces/QueueControl";

export class Player {

    private _client: Client;

    private _audioController: AudioControl;
    private _queueController: QueueControl;

    constructor(client: Client) {
        this._client = client;

        this._audioController = new AudioController(this);
        this._queueController = new QueueController(this);        
    }

    get client(): Client {
        return this._client;
    }

    get audioController(): AudioControl {
        return this._audioController;
    }

    get queueController(): QueueControl {
        return this._queueController;
    }
    
}