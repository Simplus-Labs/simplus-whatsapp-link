import { createContext, useState } from 'react';
import type { Dispatch, SetStateAction, ReactNode } from 'react';

export interface Message {
  text: string;
  phone: string;
}

export interface MessageContextInterface {
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
}

const defaultState: MessageContextInterface = {
  message: {
    text: '',
    phone: '',
  },
  setMessage: (_message: SetStateAction<Message>) => {},
};

export const MessageContext = createContext(defaultState);

interface MessageProvideProps {
  children: ReactNode;
}

export default function MessageProvider({ children }: MessageProvideProps): JSX.Element {
  const [message, setMessage] = useState<Message>({
    text: '',
    phone: '',
  });
  return <MessageContext.Provider value={{ message, setMessage }}>{children}</MessageContext.Provider>;
}
