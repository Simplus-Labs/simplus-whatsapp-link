import { Dispatch, SetStateAction, createContext, useState, ReactNode } from "react";

export type Message = {
    text: string,
    phone: string
}

export interface MessageContextInterface {
    message: Message,
    setMessage: Dispatch<SetStateAction<Message>>
}

const defaultState = {
    message: {
        text: "",
        phone: "",
    },
    setMessage: (_message: Message) => { }
} as MessageContextInterface

export const MessageContext = createContext(defaultState)

type MessageProvideProps = {
    children: ReactNode
}

export default function MessageProvider({ children }: MessageProvideProps) {
    const [message, setMessage] = useState<Message>({
        text: "",
        phone: "",
    });
    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    )
}