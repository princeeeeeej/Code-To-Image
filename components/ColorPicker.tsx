import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker({color, setColor}: {color:string, setColor: (color:string) => void}) {
    // const [color, setColor] = useState("#000000")
    return (
        <div className="flex gap-2">
            <Popover>
                <PopoverTrigger >
                    <div className="w-[20px] h-[20px] rounded-[7px] cursor-pointer" style={{ backgroundColor: color }} />
                </PopoverTrigger>
                <PopoverContent className="w-[235px] bg-[#262626] border-none mb-8">
                    <HexColorPicker color={color} onChange={setColor} className="" />
                </PopoverContent>
            </Popover>
            <div className="flex justify-center gap-2 border-1 border-[#776E6E] px-1 px-3 rounded-[7px] items-center bg-[#181818]">
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="w-[80px] ouline-none" />
            </div>
        </div>
    )
}