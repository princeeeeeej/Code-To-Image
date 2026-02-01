"use client"

import { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { cn, Language } from "@/lib/utils";
import ColorPicker from "./ColorPicker";
import MainSection from "./MainSection";
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { saveAs } from 'file-saver';


export default function Controls() {
    const widths = [400, 500, 600, 700, 800, 900, 1000, 1100, 1200]
    const formats = ["PNG", "JPG", "SVG"]
    const paddings = [30, 50, 70, 90, 110]
    const fonts = ["Source Code", "JetBrains Mono", "Sono", "Space Mono", "Poppins", "Fira Mono", "Ubuntu", "Roboto Condensed", "Montserrat", "Oswald"]
    const codeThemes = [
        { label: "GitHub Dark", value: "github" },
        { label: "Dracula", value: "dracula" },
        { label: "Monokai", value: "monokai" },
        { label: "One Dark", value: "oneDark" },
        { label: "One Light", value: "oneLight" },
        { label: "Night Owl", value: "nightOwl" },
        { label: "Nord", value: "nord" },
        { label: "Shades of Purple", value: "shadesOfPurple" },
        { label: "Gruvbox Dark", value: "gruvboxDark" },
        { label: "Solarized Dark", value: "solarizedDark" },
        { label: "VS Light", value: "vs" },
    ];

    const languages = ["javascript", "python", "java", "cpp", "c", "ruby", "go", "rust", "typescript", "php", "swift", "kotlin"] as const;



    const [gradient, setGradient] = useState(true)
    const [linear, setLinear] = useState(true)
    const [dark, setDark] = useState(true)
    const [solidColor, setSolidColor] = useState("#6B5ED9")
    const [gradientStartColor, setGradientStartColor] = useState("#6cbca4")
    const [gradientEndColor, setGradientEndColor] = useState("#1a4175")
    const [angle, setAngle] = useState(50)
    const [width, setWidth] = useState(800)
    const [padding, setPadding] = useState(30)
    const [format, setFormat] = useState("PNG")
    const [font, setFont] = useState("JetBrains Mono")
    const [codeTheme, setCodeTheme] = useState("github");
    const [hide, setHide] = useState(false)

    const [language, setLanguage] = useState<Language>("javascript");

    const mainSectionRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!mainSectionRef.current) return;

        setIsExporting(true);

        try {
            const element = mainSectionRef.current;
            await new Promise(resolve => setTimeout(resolve, 500));

            const options = {
                cacheBust: true,
                pixelRatio: 2,
            };

            let dataUrl: string;

            if (format === "PNG") {
                dataUrl = await toPng(element, options);
                saveAs(dataUrl, 'code-snippet.png');
            } else if (format === "JPG") {
                dataUrl = await toJpeg(element, {
                    ...options,
                    quality: 2,
                    backgroundColor: '#ffffff',
                });
                saveAs(dataUrl, 'code-snippet.jpg');
            } else if (format === "SVG") {
                dataUrl = await toSvg(element, {
                    cacheBust: true,
                });
                saveAs(dataUrl, 'code-snippet.svg');
            }
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export image. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };


    return (
        <div className="flex flex-col w-full items-center">
            <MainSection
                ref={mainSectionRef}
                solidColor={solidColor}
                setSolidColor={setSolidColor}
                gradientStartColor={gradientStartColor}
                gradientEndColor={gradientEndColor}
                setGradientStartColor={setGradientStartColor}
                setGradientEndColor={setGradientEndColor}
                width={width}
                setWidth={setWidth}
                format={format}
                setFormat={setFormat}
                gradient={gradient}
                linear={linear}
                angle={angle}
                setAngle={setAngle}
                padding={padding}
                setPadding={setPadding}
                font={font}
                setFont={setFont}
                dark={dark}
                setDark={setDark}
                codeTheme={codeTheme}
                setCodeTheme={setCodeTheme}
                language={language}
                setLanguage={setLanguage}
            />
            <div>

                {!hide && (
                    <div className="bg-[#262626] p-2 rounded-[10px] text-[#BFBEBE] fixed right-91 bottom-10 w-[800px] border border-[#776E6E]">
                        <div className="flex gap-2 mb-2" >
                            <div className="flex gap-3 border border-[#776E6E] py-2 px-3 rounded-[10px] items-center bg-[#181818]">
                                <h1 >Font</h1>
                                <Select value={font} onValueChange={(value) => setFont(value)}>
                                    <SelectTrigger className="gap-10 w-[180px] bg-[#181818] text-[#BFBEBE]">
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent className="w-[180px] mt-1">
                                        {fonts.map((font) => (
                                            <SelectItem value={font}>{font}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-3 border-1 border-[#776E6E] px-3 rounded-[10px] items-center bg-[#181818]">
                                <h1 >Padding</h1>
                                <Select value={padding.toString()} onValueChange={(value) => setPadding(Number(value))}>
                                    <SelectTrigger className=" w-[100px] bg-[#181818]">
                                        <SelectValue defaultValue="30" placeholder="30" />
                                    </SelectTrigger>
                                    <SelectContent className="w-[80px] mt-1">
                                        {paddings.map((padding) => (
                                            <SelectItem value={padding.toString()}>{padding}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-3 border-1 border-[#776E6E]  px-3 rounded-[10px] items-center bg-[#181818]">
                                <h1 >Language</h1>
                                <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                                    <SelectTrigger className="gap-5 w-[130px] bg-[#181818]" >
                                        <SelectValue defaultValue="javascript" placeholder="javascript" />
                                    </SelectTrigger>
                                    <SelectContent className="w-[150px] mt-1" >
                                        {languages.map((language) => (
                                            <SelectItem value={language}>{language}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-3 border-1 border-[#776E6E] px-3 rounded-[10px] items-center bg-[#181818]">
                                <Label htmlFor="dark-mode">Dark </Label>
                                <Switch id="dark-mode" className="bg-blue-500" defaultChecked={dark} onCheckedChange={(value) => setDark(value)} />
                            </div>
                        </div>

                        <div className="flex gap-2 mb-2">
                            <div className="flex  gap-3 border-1 border-[#776E6E] py-2 px-3 rounded-[10px] items-center bg-[#181818] w-[70%]">
                                <h1>Background</h1>
                                <div className="flex gap-3 border-1 border-[#776E6E] py-2 px-3 rounded-[10px] items-center bg-[#181818] w-full">
                                    <div className={cn("flex justify-center border-1 border-[#776E6E] py-2 px-3 rounded-[10px] items-center bg-[#181818] w-[50%] cursor-pointer", gradient ? "bg-[#181818]" : "bg-[#262626]")}
                                        onClick={() => setGradient(false)}>
                                        <h1>Solid</h1>
                                    </div>
                                    <div className={cn("flex justify-center border-1 border-[#776E6E] py-2 px-3 rounded-[10px] items-center bg-[#181818] w-[50%] cursor-pointer", gradient ? "bg-[#262626]" : "bg-[#181818]")}
                                        onClick={() => setGradient(true)}>
                                        <h1>Gradient</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between gap-3 border-1 border-[#776E6E] py-2 px-3 rounded-[10px] items-center bg-[#181818] w-[30%]">
                                <h1>Theme UI</h1>
                                <Select value={codeTheme} onValueChange={(value) => setCodeTheme(value)}>
                                    <SelectTrigger className="w-[130px] ">
                                        <SelectValue defaultValue="github" placeholder="GitHub Dark" />
                                    </SelectTrigger>
                                    <SelectContent className="mt-[2px]">
                                        {codeThemes.map((theme) => (
                                            <SelectItem key={theme.value} value={theme.value}>
                                                {theme.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex gap-2 border-1 border-[#776E6E] py-2 px-3 rounded-[10px] bg-[#181818] w-[70%]">
                                {!gradient && (
                                    <div className="flex gap-2 h-[33%] w-full ">
                                        <div className="flex flex-col justify-center border border-[#776E6E] py-2 px-10 rounded-[10px] items-center bg-[#181818] w-[34%]">
                                            <h1>Backgound</h1>
                                            <h1>color</h1>
                                        </div>
                                        <div className="flex justify-center gap-2 border-1 border-[#776E6E] py-3 px-3 rounded-[10px] items-center bg-[#181818] w-[32%]">
                                            <ColorPicker color={solidColor} setColor={setSolidColor} />
                                        </div>
                                    </div>
                                )}

                                {gradient && (
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="flex gap-2 w-full">
                                            <div className="flex justify-center gap-3 border-1 border-[#776E6E] py-2 px-3 rounded-[10px] items-center bg-[#181818] w-[34%]">
                                                <h1>Gradient type</h1>
                                            </div>
                                            <div className="flex justify-center gap-2 border-1 border-[#776E6E] py-2 px-3 rounded-[10px] bg-[#181818] w-[66%]">
                                                <div className={cn("flex justify-center gap-3 border-1 border-[#776E6E] py-2 px-8 rounded-[10px] items-center bg-[#181818] w-[50%] cursor-pointer", linear ? "bg-[#262626]" : "bg-[#181818]")}
                                                    onClick={() => setLinear(true)}>
                                                    <h1>Linear</h1>
                                                </div>
                                                <div className={cn("flex justify-center gap-3 border-1 border-[#776E6E] py-2 px-8 rounded-[10px] items-center bg-[#181818] w-[50%] cursor-pointer", linear ? "bg-[#181818]" : "bg-[#262626]")}
                                                    onClick={() => setLinear(false)}>
                                                    <h1>Radial</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full">
                                            <div className="flex justify-center gap-2 border-1 border-[#776E6E] py-3 px-3 rounded-[10px] items-center bg-[#181818] w-[34%]">
                                                <h1>Gradient Start</h1>
                                            </div>
                                            <div className="flex justify-center gap-2 border-1 border-[#776E6E] py-3 px-3 rounded-[10px] items-center bg-[#181818] w-[32%]">
                                                <ColorPicker color={gradientStartColor} setColor={setGradientStartColor} />
                                            </div>
                                            {linear && (
                                                <div className="flex gap-2 w-[30%] ">
                                                    <div className="flex justify-center border-1 border-[#776E6E] py-3 px-3  rounded-[10px] items-center bg-[#181818]">
                                                        <h1>Angle</h1>
                                                    </div>
                                                    <div className="flex justify-center border-1 border-[#776E6E] py-3 px-3 rounded-[10px] items-center bg-[#181818]">
                                                        <input
                                                            type="text"
                                                            inputMode="text"
                                                            className="w-[30px] text-center bg-transparent outline-none"
                                                            value={angle}
                                                            onChange={(e) => setAngle(Number(e.target.value))}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-2 w-full">
                                            <div className="flex justify-center gap-2 border-1 border-[#776E6E] py-3 px-3 rounded-[10px] items-center bg-[#181818] w-[34%]">
                                                <h1>Gradient End</h1>
                                            </div>
                                            <div className="flex justify-center gap-2 border-1 border-[#776E6E] py-3 px-3 rounded-[10px] items-center bg-[#181818] w-[32%]">
                                                <ColorPicker color={gradientEndColor} setColor={setGradientEndColor} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 w-[30%]">
                                <div className="flex justify-between gap-3 border-1 border-[#776E6E] py-3 px-3 rounded-[10px] items-center bg-[#181818] w-full">
                                    <h1>Width</h1>
                                    <Select value={width.toString()} onValueChange={(value) => setWidth(Number(value))}>
                                        <SelectTrigger className="w-[150px] ">
                                            <SelectValue defaultValue="700" placeholder="700" />
                                        </SelectTrigger>
                                        <SelectContent className="mt-[2px]">
                                            {widths.map((width) => (
                                                <SelectItem value={width.toString()} key={width}>{width}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex justify-between gap-3 border-1 border-[#776E6E] py-3 px-3 rounded-[10px] items-center bg-[#181818] w-full">
                                    <h1>Format</h1>
                                    <Select value={format}
                                        onValueChange={setFormat}>
                                        <SelectTrigger className="w-[140px] ">
                                            <SelectValue defaultValue="PNG" placeholder="PNG" />
                                        </SelectTrigger>
                                        <SelectContent className="mt-[2px]">
                                            {formats.map((format) => (
                                                <SelectItem value={format} key={format}>{format}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <button
                                    onClick={handleExport}
                                    disabled={isExporting}
                                    className="flex justify-center gap-3 border-1 border-[#776E6E] py-4 px-3 rounded-[10px] items-center bg-[#181818] w-full cursor-pointer hover:bg-[#262626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <h1>{isExporting ? 'Exporting...' : 'Export'}</h1>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="fixed bottom-5 right-7 bg-[#262626] rounded-[10px] w-[45px] h-[45px] flex items-center justify-center border border-[#776E6E] cursor-pointer" onClick={() => setHide(!hide)}>
                <div className="relative">
                    <img src="eye.png" alt="eye" />
                    {hide && <img src="eye-off.png" alt="eye-slash" className="absolute top-0 left-0" />}
                </div>
            </div>
        </div>
    )
}
