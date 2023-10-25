
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
    UNKNOWN = 'Unknown',
    QUEUE_DESTROYED = 'QueueDestroyed',
    NOTHING_PLAYING = 'NothingPlaying',
    UNKNOWN_VOICE = 'UnknownVoice',
    CHANNEL_TYPE_INVALID = 'ChannelTypeInvalid',
    VOICE_CONNECTION_ERROR = 'VoiceConnectionError',
    NO_VOICE_CONNECTION = 'NoVoiceConnection',
    UNKNOWN_REPEAT_MODE = 'UnknownRepeatMode',
    RESOURCE_NOT_READY = 'ResourceNotReady',
    SEARCH_NULL = 'SearchIsNull',
    INVALID_PLAYLIST = 'InvalidPlaylist',
    INVALID_SPOTIFY = 'InvalidSpotify',
    INVALID_APPLE = 'InvalidApple',
    UNKNOWN_SONG = 'UnknownSong',
    INVALID_INDEX = 'InvalidIndex'

    NO_AUDIO_PLAYER = "No audio player found!",
    NO_VOICE_CONNECTION = "No voice connection found!",
    NO_RESOURCE = "No audio resource found!",

    INVALID_VOLUME = "Provided volume is invalid!",
    YOUTUBE_DL_ERROR = "An error occured while downloading the song!",
    INVALID_DURATION = "Provided duration is invalid!",

}
