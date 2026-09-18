import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Register the custom type scale so text-h2 etc. aren't mistaken for colours and dropped.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["micro", "lead", "hero", "display", "statement", "title"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
