export const socketMiddleware = (wsActions) => {
	return store => {
		let socket = null;
		let isConnected = false;
		let reconnectTimer = 0;
		let url = '';

		return next => action => {
			const { dispatch, getState } = store;
			const { type, payload } = action;
			const { wsConnect, wsDisconnect, wsSendMessage, onConnect, onOpen, onClose, onError, onMessage, wsConnecting } = wsActions;

			if (type === wsConnect) {
				console.log('connect');
				url = action.payload;
				socket = new WebSocket(url);
				isConnected = true;
				dispatch(wsConnecting());
			}

			if (socket) {
				socket.onopen = () => {
					dispatch(onOpen());
				};

				socket.onerror = event => {
					dispatch(onError(event.code.toString()));
				};

				socket.onmessage = event => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					dispatch(onMessage(parsedData));
				};

				socket.onclose = event => {
					if (event.code !== 1000) {
						console.log('error')
						dispatch(onError(event.code.toString()));
					}
					console.log('close')
					dispatch(onClose());

					if (isConnected) {
						console.log('isConnected');
						dispatch(wsConnecting())
						reconnectTimer = window.setTimeout(() => {
							dispatch(onConnect(url));
						}, 3000)
					};
				};

				if (type === wsSendMessage) {
					console.log('send');
					socket.send(JSON.stringify(action.payload));
				}

				if (type === wsDisconnect) {
					console.log('disconnect')
					clearTimeout(reconnectTimer)
					isConnected = false;
					reconnectTimer = 0;
					socket.close();
					dispatch(onClose());
				}

			}

			next(action);
		};
	};
};