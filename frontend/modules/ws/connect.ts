import { useContext } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { AuthContext } from "./AuthUserContext";
import { Connection, Listener, Opcode } from "./types";

const apiUrl = "wss://api.dogehouse.tv/socket";
const heartbeatInterval = 41500;
const connectionTimeout = 15000;

const logger = (direction, opcode, data, fetchId, raw) => {
    const directionPadded = direction.toUpperCase().padEnd(3, " ");
    const fetchIdInfo = fetchId ? ` (fetch id ${fetchId})` : "";
    console.info(`${directionPadded} "${opcode}"${fetchIdInfo}: ${raw}`);
};

export const connect = ({
    onConnectionTaken = () => { },
    url = apiUrl,
    waitToReconnect,
    accessToken,
}): Promise<Connection> => { 
    return new Promise((resolve, reject) => {

        const socket = new ReconnectingWebSocket(url, [], {
            connectionTimeout,
            WebSocket
        })
        const api2send = (opcode: Opcode, data: unknown, ref?: any) => {
            if (socket.readyState !== socket.OPEN) return;

            const raw = `{"op":${opcode},"t":${Date.now()},"d":${JSON.stringify(data)}}`

            socket.send(raw);
            logger('out', opcode, data, ref, raw)
        }

        const listeners: Listener[] = [];

        socket.addEventListener('close', error => {
            // eslint-disable-next-line no-console
            console.log(error);
            if (error.code === 4001) {
                socket.close();
                //   onClearTokens();
            } else if (error.code === 4003) {
                socket.close();
                onConnectionTaken();
            } else if (error.code === 4004) {
                socket.close();
                //  onClearTokens();
            }

            if (!waitToReconnect) reject(error);
        })

        socket.addEventListener('message', e => {
            let message = JSON.parse(e.data);

            if (message.t == 'HELLO') {
                socket.send(JSON.stringify({
                    op: 2,
                    t: 'IDENTIFY',
                    d: {
                        token: accessToken,
                    }
                }))
            }

            if (message.op == 10) { // READY
                let user = message.d.user;
                user.communityIds = user.communities;
                user.communities = message.d.communities;
                const connection: Connection = {
                    close: () => socket.close(),
                    once: (opcode, handler) => {
                        const listener = { opcode, handler } as Listener<unknown>

                        listener.handler = (...params) => {
                            handler(...(params as Parameters<typeof handler>));
                            listeners.splice(listeners.indexOf(listener), 1);
                        }

                        listeners.push(listener);
                    },
                    on: (opcode, handler) => {
                        const listener = { opcode, handler } as Listener<unknown>

                        listeners.push(listener)
                    },
                    off: (opcode, handler) => {
                        const listener = { opcode, handler } as Listener<unknown>
                        listeners.splice(listeners.indexOf(listener), 1);
                    },
                    addListener: (opcode, handler) => {
                        const listener = { opcode, handler } as Listener<unknown>;

                        listeners.push(listener);

                        return () => listeners.splice(listeners.indexOf(listener), 1);
                    },
                    authUser: null,
                    user,
                    send: api2send,
                }

                resolve(connection);
            } else {

                listeners
                    .filter(({ opcode }) => opcode == message.t)
                    .forEach(it =>
                        it.handler(message.d)
                    )
            }
        })


        socket.addEventListener("open", () => {
            const id = setInterval(() => {
                if (socket.readyState === socket.CLOSED) {
                    clearInterval(id);
                } else {
                    let sentAt = Date.now();
                    socket.send(JSON.stringify({ op: 1 })); // HEARTBEAT
                    let onMessage = (m) => {
                        if (JSON.parse(m.data).op !== 11) return;
                        console.log(`Heartbeat ack from gateway, latency: ${Date.now() - sentAt}ms`)
                        socket.removeEventListener('message', onMessage)
                    };
                    socket.addEventListener('message', onMessage)
                }
            }, heartbeatInterval);
        });
    })
}