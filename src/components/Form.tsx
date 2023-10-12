import { useContext, useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import '../styles/EmojiPicker.css';
import { MessageContext } from '@/contexts/MessageContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Clipboard, ClipboardText, Eye, Smiley } from '@phosphor-icons/react';

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
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useRef<null | HTMLDivElement>(null);
  const [textContend, setTextContend] = useState(String);
  const [phoneNumber, setPhoneNumber] = useState(String);
  const [phonePreview, setPhonePreview] = useState(String);
  const isValid = isPhoneValid(`+${phoneNumber}`);
  const [urlCopied, setUrlCopied] = useState(false);

  const url = encodeURI(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${textContend}`);

  const toggleEmojiPicker = (): void => {
    setOpenEmojiPicker(!openEmojiPicker);
  };

  const handleEmojiPicker = (emojiData: string): void => {
    setTextContend(`${textContend} ${emojiData}`);
    setOpenEmojiPicker(false);
    console.log('open');
  };

  const handlePageClick = (e: MouseEvent): void => {
    if (
      emojiPickerRef.current !== null &&
      !emojiPickerRef.current.contains(e.target as Node) &&
      emojiButtonRef.current !== null &&
      !emojiButtonRef.current?.contains(e.target as Node)
    ) {
      setOpenEmojiPicker(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handlePageClick);

    return () => {
      document.removeEventListener('click', handlePageClick);
    };
  }, [openEmojiPicker]);

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
    <div className="w-full flex flex-col gap-8 lg:w-1/2 p-7 border rounded-md shadow-lg">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="font-medium">Type your WhatsApp phone number</div>
          <div>
            <PhoneInput
              defaultCountry="us"
              inputClassName={`w-full ${isValid ? '' : 'border-red-500'}`}
              onChange={(e) => {
                handlePhoneNumber(e);
              }}
            />
            {!isValid && <div className="text-red-500 text-sm">Invalid phone number</div>}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-medium">Custom Message</div>
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleEmojiPicker}
              className="absolute bottom-2 right-2 hidden lg:inline-flex"
              ref={emojiButtonRef}
            >
              <Smiley size={24} />
            </Button>
            {openEmojiPicker && (
              <div ref={emojiPickerRef}>
                <EmojiPicker
                  previewConfig={{ showPreview: false }}
                  emojiStyle={EmojiStyle.TWITTER}
                  onEmojiClick={(data) => {
                    handleEmojiPicker(data.emoji);
                  }}
                />
              </div>
            )}
            <Textarea
              placeholder="Add a custom message that users will send to you"
              className=" h-52"
              onChange={(e) => {
                setTextContend(e.target.value);
              }}
              value={textContend}
            ></Textarea>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
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
    </div>
  );
}

export default Form;
