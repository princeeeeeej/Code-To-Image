"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect, CSSProperties } from "react";

interface Props {
    value: string;
    onChange: (v: string) => void;
    dark: boolean;
    textStyles: CSSProperties;
}

export default function AutoGrowTextarea({
    value,
    onChange,
    dark,
    textStyles,
}: Props) {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = ref.current.scrollHeight + "px";
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <textarea
            ref={ref}
            value={value}
            onChange={handleChange}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className={cn(
                "relative z-10 w-full resize-none overflow-hidden outline-none bg-transparent border-none m-0 p-0",
                "text-transparent caret-current selection:bg-blue-500/30"
            )}
            style={{
                ...textStyles,
                caretColor: dark ? '#fff' : '#000',
                margin: 0,
                padding: 0,
            }}
        />
    );
}