import { Song } from "./Song";

export class Playlist {
    private _name: string | undefined;
    private _author: string | undefined;
    private _url: string | undefined;
    private _songs: Song[] | undefined;

    constructor(name: string | undefined, author: string | undefined, url: string | undefined, songs: Song[] | undefined) {
        this._name = name;
        this._author = author;
        this._url = url;
        this._songs = songs;
    }

    get songs(): Song[] | undefined {
        return this._songs;
    }
}