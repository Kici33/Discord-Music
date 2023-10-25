
/**
 * Player options
 * @typedef {object} PlayerOptions
 * @param {boolean} [leaveOnEnd=true] If it should leave on end
 * @param {boolean} [leaveOnStop=true] If it should leave on stop
 * @param {boolean} [leaveOnEmpty=true] If it should leave on empty voice channel
 * @param {boolean} [deafenOnJoin=false] If it should deafen on join
 * @param {number} [timeout=0] Voice channel leave timeout
 * @param {number} [volume=100] Player volume
 * @param {string} [quality=high] Player quality
 * @param {string} [localAddress] Custom ipv4/ipv6 address
 * @param {string} [ytdlRequestOptions] Custom YTDL Request Options object
 */
export interface PlayerOptions {
    leaveOnEnd?: boolean,
    leaveOnEmpty?: boolean,
    deafenOnJoin?: boolean,
    timeout?: number,
    volume?: number,
    quality?: 'low' | 'high',
    localAddress?: string,
    ytdlRequestOptions?: object,
}