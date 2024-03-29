import { MessageContext } from '@/contexts/MessageContext';
import { useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PaperPlaneRight } from '@phosphor-icons/react';
import '../styles/Scrollbar.css';

function Preview(): JSX.Element {
  const { message } = useContext(MessageContext);
  return (
    <div className="w-[288px] flex flex-col gap-4 border rounded-md shadow-lg bg-white px-2 py-8">
      <div className="w-full h-full rounded-md flex flex-col justify-between">
        <div className="w-full rounded-t-md flex items-center h-14 bg-[#F0F2F5] gap-4 py-2 px-3">
          <Avatar>
            <AvatarImage src="/user.svg" />
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
          <div>{message.phone}</div>
        </div>
        <div
          className="bg-[#EFEAE2] w-[270px] h-[336px] flex flex-col items-end overflow-y-auto overflow-x-hidden scrollbar-whatsapp"
          style={{ backgroundImage: 'url(/bg-whatsapp.png)' }}
        >
          <div className=" bg-[#D9FDD3] w-fit min-w-24 min-h-8 h-fit my-2 mr-2 ml-8 rounded-sm px-2 py-1 max-w-[230px] break-words">
            {message.text}
          </div>
        </div>
        <div className="w-full bg-[#F0F2F5] h-12 justify-center items-center flex gap-2 p-2">
          <div className="bg-white w-full h-8 rounded-md"></div>
          <PaperPlaneRight size={28} className="text-[#54656f]" />
        </div>
      </div>
    </div>
  );
}

export default Preview;
