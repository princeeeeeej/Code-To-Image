"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
    atomDark,
    dracula,
    gruvboxDark,
    nightOwl,
    nord,
    oneDark,
    oneLight,
    shadesOfPurple,
    solarizedDarkAtom,
    vs,
    vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CSSProperties } from 'react';

interface Props {
    code: string;
    language: string;
    codeTheme: string;
    textStyles: CSSProperties;
}

const themeMap: Record<string, any> = {
    'github': vscDarkPlus,
    'dracula': dracula,
    'nord': nord,
    'monokai': atomDark,
    'atomOneDark': oneDark,
    'atomOneLight': oneLight,
    'nightOwl': nightOwl,
    'shadesOfPurple': shadesOfPurple,
    'gruvboxDark': gruvboxDark,
    'solarizedDark': solarizedDarkAtom,
    'vs': vs,
};

export default function CodePreview({ code, language, codeTheme, textStyles }: Props) {
    const baseTheme = themeMap[codeTheme] || vscDarkPlus;
    
    // Create a transparent version of the theme by removing all backgrounds
    const transparentTheme = Object.keys(baseTheme).reduce((acc, key) => {
        const style = baseTheme[key];
        if (typeof style === 'object') {
            acc[key] = {
                ...style,
                background: undefined,
                backgroundColor: undefined,
            };
        } else {
            acc[key] = style;
        }
        return acc;
    }, {} as any);

    return (
        <SyntaxHighlighter
            language={language}
            style={transparentTheme}
            customStyle={{
                margin: 0,
                padding: 0,
                background: 'transparent',
                backgroundColor: 'transparent',
                ...textStyles,
            }}
            codeTagProps={{
                style: {
                    background: 'transparent',
                    backgroundColor: 'transparent',
                    ...textStyles,
                }
            }}
            PreTag="div"
            className="code-highlighter"
        >
            {code}
        </SyntaxHighlighter>
    );
}