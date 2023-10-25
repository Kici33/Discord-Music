
export class LibraryError extends Error {

    private _enum: LibraryErrors;

    constructor(error: LibraryErrors) {
        super(error);
        this._enum = error;
        this.name = error.toString();
    }

    getCode(): LibraryErrors {
        return this._enum;
    }

}

export enum LibraryErrors {

    INVALID_GUILD_MEMBER = "Provided guild member is invalid!",
    INVALID_GUILD = "Provided guild is invalid!",
    INVALID_VOICE_CHANNEL = "Provided voice channel is invalid!",

}
