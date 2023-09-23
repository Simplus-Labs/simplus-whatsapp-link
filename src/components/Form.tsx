import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const inputStyle = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

function Form() {
  return (
    <div className="flex flex-col gap-4 w-1/2 p-7 border rounded-sm shadow-lg">
      <Label>Type your WhatsApp phone number</Label>
      <PhoneInput
        defaultCountry="us"
        inputClassName={inputStyle}
      />

      <Label htmlFor="">Custom Message</Label>
      <Textarea></Textarea>

      <Button>Generate</Button>
    </div>
  )
}

export default Form