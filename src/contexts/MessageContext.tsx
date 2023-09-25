import { Dispatch, SetStateAction, createContext, useState, ReactNode } from "react";

export type Message = {
    text: string
}

export interface MessageContextInterface {
    message: Message,
    setMessage: Dispatch<SetStateAction<Message>>
}

const defaultState = {
    message: {
        text: ""
    },
    setMessage: (_message: Message) => { }
} as MessageContextInterface

export const MessageContext = createContext(defaultState)

type MessageProvideProps = {
    children: ReactNode
}

export default function MessageProvider({ children }: MessageProvideProps) {
    const [message, setMessage] = useState<Message>({
        text: ""
    });
    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    )
}