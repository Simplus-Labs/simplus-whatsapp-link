import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import EmojiPicker from 'emoji-picker-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Form() {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [textContend, setTextContend] = useState(String);

  const handleEmojiPicker = (emojiData: string) => {
    setEmojiOpen(false)
    setTextContend(`${textContend} ${emojiData}`)
  }
  return (
    <div className="flex flex-col gap-4 w-1/2 p-7 border rounded-sm shadow-lg">
      <div>
        <Label>Type your WhatsApp phone number</Label>
        <PhoneInput
          defaultCountry="us"
          inputClassName="w-full"
        />
      </div>
      <div>
        <Label htmlFor="">Custom Message</Label>
        <div>
          <Popover open={emojiOpen}>
            <PopoverTrigger onClick={() => setEmojiOpen(!emojiOpen)}>
              <div className="w-10 h-10 p-2 border flex items-center justify-center rounded-full mb-3 cursor-pointer hover:bg-slate-200">🙂
              </div>
            </PopoverTrigger>
            <PopoverContent hideWhenDetached={true}>
              <EmojiPicker onEmojiClick={(data) => handleEmojiPicker(data.emoji)} />
            </PopoverContent>
          </Popover>
          <Textarea className=" h-52" onChange={(e) => setTextContend(e.target.value)} value={textContend}></Textarea>
        </div>
      </div>

      <Button>Generate</Button>
    </div>
  )
}

export default Form