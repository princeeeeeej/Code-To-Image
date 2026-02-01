import { clsx, type ClassValue } from "clsx"
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge"
const languages = ["javascript", "python", "java", "cpp"] as const;
export type Language = (typeof languages)[number];


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
