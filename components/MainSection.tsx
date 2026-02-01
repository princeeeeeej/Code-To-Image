import { cn, Language } from "@/lib/utils";
import AutoGrowTextarea from "./AutoGrowTextarea";
import { useState, forwardRef } from "react";
import CodePreview from "./CodePreview";

interface Props {
    solidColor: string;
    setSolidColor: (color: string) => void;
    gradientStartColor: string;
    setGradientStartColor: (color: string) => void;
    gradientEndColor: string;
    setGradientEndColor: (color: string) => void;
    width: number;
    setWidth: (width: number) => void;
    format: string;
    setFormat: (format: string) => void;
    gradient: boolean;
    linear: boolean;
    angle: number;
    setAngle: (angle: number) => void;
    padding: number;
    setPadding: (padding: number) => void;
    font: string;
    setFont: (font: string) => void;
    dark: boolean;
    setDark: (dark: boolean) => void;
    codeTheme: string;
    setCodeTheme: (codeTheme: string) => void;
    language: Language;
    setLanguage: (language: Language) => void;
}

const MainSection = forwardRef<HTMLDivElement, Props>(({
    solidColor,
    gradientStartColor,
    gradientEndColor,
    width,
    gradient,
    linear,
    angle,
    padding,
    font,
    dark,
    codeTheme,
    language,
}, ref) => {
    const innerWidth = 
        width === 400 ? 240 : 
        width === 500 ? 320 : 
        width === 600 ? 400 : 
        width === 700 ? 460 : 
        width === 800 ? 520 : 
        width === 900 ? 580 : 
        width === 1000 ? 640 : 
        width === 1100 ? 700 : 
        width === 1200 ? 790 : 520;
    
    const [code, setCode] = useState<string>("function add(a, b) {\n    return a + b;\n}");

    const commonTextStyles: React.CSSProperties = {
        fontFamily: `"${font}", monospace`,
        fontSize: '14px',
        lineHeight: '1.6',
        letterSpacing: '0px',
        wordSpacing: '0px',
        tabSize: 4,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    };

    return (
        <div className="mt-20 flex justify-center w-full">
            <div
                ref={ref}
                style={{
                    padding: padding,
                    width: width,
                    backgroundColor: gradient ? undefined : solidColor,
                    backgroundImage: gradient
                        ? linear
                            ? `linear-gradient(${angle}deg, ${gradientStartColor}, ${gradientEndColor})`
                            : `radial-gradient(circle, ${gradientStartColor}, ${gradientEndColor})`
                        : undefined,
                    display: 'inline-flex',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    className={cn(
                        "rounded-[10px] flex flex-col border-[0.5px] border-[#776E6E]",
                        dark ? "bg-gradient-to-r from-[#16222B] to-[#0B1621]" : "bg-[#C3CED2]"
                    )}
                    style={{ width: innerWidth }}
                >
                    <div className="flex relative h-[40px] items-center">
                        <div className="flex gap-2 px-4">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2">
                            <input
                                type="text"
                                defaultValue="Untitled-1"
                                className={cn(
                                    "bg-transparent border-none outline-none text-sm text-center w-[120px]",
                                    dark ? "text-[#BFBEBE]" : "text-[#555]"
                                )}
                            />
                        </div>
                    </div>

                    <div className="relative" style={{ padding: '20px' }}>
                        <div
                            className="absolute top-0 left-0 pointer-events-none overflow-hidden"
                            style={{ padding: '20px' }}
                            aria-hidden="true"
                        >
                            <CodePreview
                                code={code}
                                language={language}
                                codeTheme={codeTheme}
                                textStyles={commonTextStyles}
                            />
                        </div>

                        <AutoGrowTextarea
                            value={code}
                            onChange={setCode}
                            dark={dark}
                            textStyles={commonTextStyles}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

MainSection.displayName = 'MainSection';

export default MainSection;