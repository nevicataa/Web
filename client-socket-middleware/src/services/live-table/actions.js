import {
    LIVE_TABLE_CONNECT,
    LIVE_TABLE_DISCONNECT,
    LIVE_TABLE_WS_CLOSE,
    LIVE_TABLE_WS_CONNECTING,
    LIVE_TABLE_WS_ERROR,
    LIVE_TABLE_WS_MESSAGE,
    LIVE_TABLE_WS_OPEN
} from "./actionsType"

export const connect = (url) => ({ type: LIVE_TABLE_CONNECT, payload: url })
export const disconnect = () => ({ type: LIVE_TABLE_DISCONNECT })
export const wsConnecting = () => ({ type: LIVE_TABLE_WS_CONNECTING })
export const wsOpen = () => ({ type: LIVE_TABLE_WS_OPEN })
export const wsClose = () => ({ type: LIVE_TABLE_WS_CLOSE })
export const wsMessage = (data) => ({ type: LIVE_TABLE_WS_MESSAGE, payload: data });
export const wsError = (error) => ({ type: LIVE_TABLE_WS_ERROR, payload: error })