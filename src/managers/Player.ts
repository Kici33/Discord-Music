
import { Client, Snowflake } from "discord.js"
import { VoiceConnection } from "@discordjs/voice"
import { AudioController } from "./AudioController";
import { QueueController } from "./QueueController";

export class Player {

    private _client: Client;

    private _audioController: AudioController;
    private _queueController: QueueController;

    constructor(client: Client) {
        this._client = client;

        this._audioController = new AudioController(this);
        this._queueController = new QueueController(this);        
    }

    get audioController(): AudioController {
        return this._audioController;
    }

    

}