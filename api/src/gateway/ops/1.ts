// HEARTBEAT

export default async (ws: any) => {
    ws.send(JSON.stringify({ op: 11 })) // HEARTBEAT_ACK
} 