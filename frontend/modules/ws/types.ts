

export type Opcode = string;
export type ListenerHandler<Data = unknown> = (
    data: Data,
) => void;
export type Listener<Data = unknown> = {
    opcode: Opcode;
    handler: ListenerHandler<Data>;
};

export type User = {
    username: string;
    id: string;
    displayName: string;
    bio: string | null;
    avatar: string;
    created: number;
    friends: any[];
    badges: any[];
    communities: any[];
    status: any;
};


export type Connection = {
    close: () => void;
    once: <Data = unknown>(
        opcode: Opcode,
        handler: ListenerHandler<Data>
    ) => void;
    on: <Data = unknown>(
        opcode: Opcode,
        handler: ListenerHandler<Data>
    ) => void;
    off: <Data = unknown>(
        opcode: Opcode,
        handler: ListenerHandler<Data>
    ) => void;
    addListener: <Data = unknown>(
        opcode: Opcode,
        handler: ListenerHandler<Data>
    ) => () => void;
    user: User;
    authUser: any;
    initialCurrentRoomId?: string;
    send: (opcode: Opcode, data: unknown, fetchId?: string) => void;
};