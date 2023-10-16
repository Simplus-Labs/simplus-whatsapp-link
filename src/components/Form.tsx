import { useContext, useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { MessageContext } from '@/contexts/MessageContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Clipboard, ClipboardText, Eye, Smiley, Link, DownloadSimple } from '@phosphor-icons/react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import '../styles/Scrollbar.css';

function Form(): JSX.Element {
  const { setMessage } = useContext(MessageContext);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [textContend, setTextContend] = useState(String);
  const phoneUtil = PhoneNumberUtil.getInstance();
  const [phoneNumber, setPhoneNumber] = useState(String);
  const [phonePreview, setPhonePreview] = useState(String);
  const [isValid, setIsValid] = useState(true);
  const [urlCopied, setUrlCopied] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const url = encodeURI(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${textContend}`);

  const isPhoneValid = (phone: string): boolean => {
    try {
      setIsValid(phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone)));
      return isValid;
    } catch (error) {
      return false;
    }
  };

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

  const getCanvas = async (): Promise<HTMLCanvasElement | undefined> => {
    if (qrCodeRef.current === null) return;
    return await html2canvas(qrCodeRef.current, {
      onclone: (snapshot) => {
        const qrElement = snapshot.getElementById('qrCard');
        if (qrElement === null) {
          throw new Error('Element not found in the snapshot');
        }
      },
    });
  };

  const handleDownloadQRCode = (): void => {
    getCanvas()
      .then((canvas) => {
        if (qrCodeRef.current !== null && canvas !== undefined) {
          const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = 'Whatsapp-Link-QRCode.png';
          downloadLink.click();
        }
      })
      .catch((error) => {
        console.error('Error in handleDownloadQRCode:', error);
      });
  };

  return (
    <div className="w-full flex flex-col gap-8 md:w-96 p-7 border rounded-md shadow-lg">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="font-medium">Type your WhatsApp phone number</div>
          <div>
            <PhoneInput
              countrySelectorStyleProps={{ buttonClassName: 'px-2' }}
              defaultCountry="us"
              inputClassName={`w-full ${isValid ? '' : 'border-red-500'}`}
              onChange={(e) => {
                handlePhoneNumber(e);
              }}
              inputProps={{
                onBlur: () => {
                  isPhoneValid(`+${phoneNumber}`);
                },
              }}
            />
            {!isValid && <div className="text-red-500 text-sm">Invalid phone number</div>}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="font-medium">Custom Message</div>
            <Popover open={emojiOpen}>
              <PopoverTrigger
                onClick={() => {
                  setEmojiOpen(!emojiOpen);
                }}
              >
                <Button variant="outline" size="icon" className="hidden lg:inline-flex">
                  <Smiley size={24} />
                </Button>
              </PopoverTrigger>
              <PopoverContent hideWhenDetached={true} className="w-auto p-0 border-none">
                <EmojiPicker
                  previewConfig={{ showPreview: false }}
                  lazyLoadEmojis={true}
                  emojiStyle={EmojiStyle.TWITTER}
                  onEmojiClick={(data) => {
                    handleEmojiPicker(data.emoji);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Textarea
            placeholder="Add a custom message that users will send to you"
            className="h-52 scrollbar-y resize-none"
            maxLength={500}
            onChange={(e) => {
              setTextContend(e.target.value);
            }}
            value={textContend}
          ></Textarea>
          <div className="flex justify-between text-sm">
            <div>Characters left</div>
            <div>{textContend.length}/500</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="secondary" onClick={() => window.open(url)} disabled={!isValid}>
          <Eye className="mr-2" size={20} />
          Preview
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button className="w-full" disabled={!isValid}>
              <Link className="mr-2" size={20} />
              Generate link
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col justify-center items-center">
            <DialogHeader>
              <DialogTitle>This is your WhatsApp link</DialogTitle>
              <DialogDescription>
                Copy and share it on your social media, website, emails or anywhere you want to be contacted instantly
                by your customers.
              </DialogDescription>
            </DialogHeader>
            <div className="border w-full rounded-md p-2 flex justify-between items-center gap-2">
              <div className="overflow-x-auto scrollbar-x p-2 text-sm">{url}</div>
              <div>
                <CopyToClipboard text={url} onCopy={handleCopy}>
                  {urlCopied ? (
                    <Button variant="ghost" size="icon">
                      <ClipboardText size={20} />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon">
                      <Clipboard size={20} />
                    </Button>
                  )}
                </CopyToClipboard>
              </div>
            </div>
            <div
              className="grid w-fit justify-center rounded-md border-2 p-4 place-items-center"
              ref={qrCodeRef}
              id="qrCard"
            >
              <QRCodeCanvas
                value={url}
                size={256}
                level="H"
                fgColor="#123033"
                imageSettings={{
                  src: '',
                  x: undefined,
                  y: undefined,
                  height: 56,
                  width: 56,
                  excavate: true,
                }}
                className="col-start-1 row-start-1"
              />
              <img
                src="/whatsapp-logo.svg"
                alt="whatsapp-logo"
                width={56}
                height={56}
                className="col-start-1 row-start-1"
              />
            </div>
            <Button
              onClick={() => {
                handleDownloadQRCode();
              }}
            >
              <DownloadSimple className="mr-2" size={20} />
              Download QR
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Form;
