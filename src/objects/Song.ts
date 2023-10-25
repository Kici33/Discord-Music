import { SongData } from "./SongData";

export class Song {

    private _author: string | undefined;
    private _name: string | undefined;
    private _url: string | undefined;
    private _length: number | undefined;
    private _thumbnail: string | undefined;
    private _actionedBy: string | undefined;
    private _songData: SongData | undefined;

    constructor(author: string | undefined, name: string | undefined, url: string | undefined, length: number | undefined, thumbnail: string | undefined, actionedBy: string | undefined, songData: SongData | undefined) {
        this._author = author;
        this._name = name;
        this._url = url;
        this._length = length;
        this._thumbnail = thumbnail;
        this._actionedBy = actionedBy;
        this._songData = songData;
    }

    get author(): string | undefined {
        return this._author;
    }

    get name(): string | undefined {
        return this._name;
    }

    get url(): string | undefined {
        return this._url;
    }

    get length(): number | undefined {
        return this._length;
    }

    get thumbnail(): string | undefined {
        return this._thumbnail;
    }

    get actionedBy(): string | undefined {
        return this._actionedBy;
    }

    get songData(): SongData | undefined {
        return this._songData;
    }

}