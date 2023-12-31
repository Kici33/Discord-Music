import { ClientOptions } from "../types/types";
import { Player } from "./Player";

export class ClientController {

    private _player: Player;

    private _leaveOnEmpty: boolean = false;
    private _leaveOnEnd: boolean = false;
    private _deafenOnJoin: boolean = true;

    private _group: string = "default";
    
    constructor(player: Player, clientOptions: ClientOptions = {}) {
        this._player = player;

        this._leaveOnEmpty = clientOptions.leaveOnEmpty ?? this._leaveOnEmpty;
        this._leaveOnEnd = clientOptions.leaveOnEnd ?? this._leaveOnEnd;
        this._deafenOnJoin = clientOptions.deafenOnJoin ?? this._deafenOnJoin;

        this._group = clientOptions.group ?? this._group;
    }

    get player(): Player {
        return this._player;
    }

    get leaveOnEmpty(): boolean {
        return this._leaveOnEmpty;
    }

    get leaveOnEnd(): boolean {
        return this._leaveOnEnd;
    }

    get deafenOnJoin(): boolean {
        return this._deafenOnJoin;
    }

    get group(): string {
        return this.group;
    }
}