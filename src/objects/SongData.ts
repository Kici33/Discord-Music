
export class SongData {

    private _otherData: any;
    private _isLive: boolean;
    private _seekTime: number;

    constructor(otherData: any, isLive: boolean, seekTime: number) {
        this._otherData = otherData;
        this._isLive = isLive;
        this._seekTime = seekTime;
    }

    get otherData(): any {
        return this._otherData;
    }

    get isLive(): boolean {
        return this._isLive;
    }

    get seekTime(): number {
        return this._seekTime;
    }

}