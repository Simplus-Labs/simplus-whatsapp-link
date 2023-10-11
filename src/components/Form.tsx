import { useContext, useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import EmojiPicker from 'emoji-picker-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageContext } from '@/contexts/MessageContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Clipboard, ClipboardText, Eye } from '@phosphor-icons/react';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string): boolean => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

function Form(): JSX.Element {
  const { setMessage } = useContext(MessageContext);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [textContend, setTextContend] = useState(String);
  const [phoneNumber, setPhoneNumber] = useState(String);
  const [phonePreview, setPhonePreview] = useState(String);
  const isValid = isPhoneValid(`+${phoneNumber}`);
  const [urlCopied, setUrlCopied] = useState(false);

  const url = encodeURI(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${textContend}`);

  const handleEmojiPicker = (emojiData: string): void => {
    setEmojiOpen(false);
    setTextContend(`${textContend} ${emojiData}`);
  };

  useEffect(() => {
    setMessage({
      text: textContend,
      phone: phonePreview,
    });
  }, [textContend, phonePreview, setMessage]);

  const handlePhoneNumber = (phone: string): void => {
    const phoneFormated = phone.replace(/\s+/g, '').replace('+', '');
    setPhoneNumber(phoneFormated);
    setPhonePreview(phone);
  };

  const handleCopy = (): void => {
    setUrlCopied(true);

    setTimeout(() => {
      setUrlCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col gap-4 lg:w-1/2 p-7 border rounded-sm shadow-lg">
      <div>
        <Label>Type your WhatsApp phone number</Label>
        <PhoneInput
          defaultCountry="us"
          inputClassName={`w-full ${isValid ? '' : 'border-red-500'}`}
          onChange={(e) => {
            handlePhoneNumber(e);
          }}
        />
        {!isValid && <div style={{ color: 'red' }}>Invalid phone number</div>}
      </div>
      <div>
        <Label htmlFor="">Custom Message</Label>
        <div>
          <Popover open={emojiOpen}>
            <PopoverTrigger
              onClick={() => {
                setEmojiOpen(!emojiOpen);
              }}
            >
              <div className="w-10 h-10 p-2 border flex items-center justify-center rounded-full mb-3 cursor-pointer hover:bg-slate-200">
                🙂
              </div>
            </PopoverTrigger>
            <PopoverContent hideWhenDetached={true}>
              <EmojiPicker
                onEmojiClick={(data) => {
                  handleEmojiPicker(data.emoji);
                }}
              />
            </PopoverContent>
          </Popover>
          <Textarea
            className=" h-52"
            onChange={(e) => {
              setTextContend(e.target.value);
            }}
            value={textContend}
          ></Textarea>
        </div>
      </div>
      <Button variant="secondary" onClick={() => window.open(url)} disabled={!isValid}>
        <Eye className="mr-2" size={20} />
        Preview
      </Button>
      <CopyToClipboard text={url} onCopy={handleCopy}>
        <Button disabled={!isValid}>
          {urlCopied ? (
            <>
              <ClipboardText className="mr-2" size={20} />
              Copied!
            </>
          ) : (
            <>
              <Clipboard className="mr-2" size={20} />
              Copy to Clipboard
            </>
          )}
        </Button>
      </CopyToClipboard>
    </div>
  );
}

export default Form;
