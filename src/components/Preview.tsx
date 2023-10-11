import { MessageContext } from '@/contexts/MessageContext';
import { useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function Preview(): JSX.Element {
  const { message } = useContext(MessageContext);
  return (
    <div className="w-full flex flex-col gap-4 md:w-1/2  border rounded-sm shadow-lg justify-between">
      <div className="w-full flex items-center h-12 bg-slate-200 gap-5 p-1">
        <Avatar>
          <AvatarImage src="/src/assets/user.svg" />
          <AvatarFallback>SL</AvatarFallback>
        </Avatar>
        <p className=" text-sm">{message.phone}</p>
      </div>
      <div className=" bg-[#e0fec5] w-3/4 h-fit rounded-sm self-end mb-10 mr-5 p-2">{message.text}</div>
    </div>
  );
}

export default Preview;
