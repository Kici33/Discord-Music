import { SongData } from "./SongData";

export class Song {

    private _author: string;
    private _name: string;
    private _url: string;
    private _length: number;
    private _thumbnail: string | undefined;
    private _actionedBy: string | undefined;
    private _songData: SongData | undefined;

    constructor(author: string, name: string, url: string, length: number, thumbnail: string | undefined, actionedBy: string | undefined, songData: SongData | undefined) {
        this._author = author;
        this._name = name;
        this._url = url;
        this._length = length;
        this._thumbnail = thumbnail;
        this._actionedBy = actionedBy;
        this._songData = songData;
    }

    get author(): string {
        return this._author;
    }

    get name(): string {
        return this._name;
    }

    get url(): string {
        return this._url;
    }

    get length(): number {
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