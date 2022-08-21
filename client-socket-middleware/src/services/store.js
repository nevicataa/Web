import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import rootReducer from "./reducers";
import { socketMiddleware } from "./middleware/socket-middleware";

import {
    LIVE_TABLE_CONNECT,
    LIVE_TABLE_DISCONNECT,
} from "./live-table/actionsType"

import { connect, wsClose, wsError, wsMessage, wsOpen, wsConnecting } from "./live-table/actions";
 

const wsActions = {
    wsConnect: LIVE_TABLE_CONNECT,
    wsDisconnect: LIVE_TABLE_DISCONNECT,
    wsConnecting: wsConnecting,
    onConnect: connect,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
  };

export const store = createStore(rootReducer,  
    composeWithDevTools(applyMiddleware(socketMiddleware(wsActions))) 
    )