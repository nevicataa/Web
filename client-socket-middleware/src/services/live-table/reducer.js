import { WebsocketStatus } from "../../utils/constants";
import {
    LIVE_TABLE_WS_OPEN,
    LIVE_TABLE_WS_CLOSE,
    LIVE_TABLE_WS_CONNECTING,
    LIVE_TABLE_WS_ERROR,
    LIVE_TABLE_WS_MESSAGE  
  } from "./actionsType";

import { liveTableUpdate } from "./live-table-update";

  
  const initialState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    table: []
};
  
  export const liveTableReducer = (state = initialState, action) => {
    switch (action.type) {
      case LIVE_TABLE_WS_CONNECTING: {
        return {
          ...state,
          status: WebsocketStatus.CONNECTING,
        };
      };
      case LIVE_TABLE_WS_OPEN: {
        return {
          ...state,
          status : WebsocketStatus.ONLINE,
          connectionError : '',
        };
      }
      case LIVE_TABLE_WS_CLOSE: {
        return {
            ...state,
            status : WebsocketStatus.OFFLINE,
        };
      }
      case LIVE_TABLE_WS_ERROR: {
        return {
            ...state,
            connectionError : action.payload,
        };
      }
      case LIVE_TABLE_WS_MESSAGE: {
        return {
            ...state,
            table: liveTableUpdate(state.table, action.payload)
        };
      }
      default: {
        return state;
      }
    }
  };
  