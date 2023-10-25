
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

    NO_AUDIO_PLAYER = "No audio player found!",
    NO_VOICE_CONNECTION = "No voice connection found!",
    NO_RESOURCE = "No audio resource found!",

    INVALID_VOLUME = "Provided volume is invalid!",
    YOUTUBE_DL_ERROR = "An error occured while downloading the song!",
    INVALID_DURATION = "Provided duration is invalid!",

}
