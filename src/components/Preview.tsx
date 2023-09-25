import { MessageContext } from "@/contexts/MessageContext"
import { useContext } from "react"
function Preview() {
    const { message } = useContext(MessageContext)
    return (
        <div className="flex flex-col gap-4 w-1/2 border rounded-sm shadow-lg justify-between">
            <div className="w-full flex items-center h-12 bg-slate-200 gap-5 p-1">
                <img className=" w-10 h-10 rounded-full p-1" src="https://avatars.githubusercontent.com/u/70488358?v=4" alt="image placeholder" />
                <p className=" text-sm">+1 03840328038</p>
            </div>
            <div className=" bg-[#e0fec5] w-3/4 h-fit rounded-sm self-end mb-10 mr-5 p-2">{message.text}</div>
        </div>
    )
}

export default Preview