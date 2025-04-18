"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggleEnhanced({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors duration-300",
        isDark 
          ? "bg-blue-600 hover:bg-blue-700" 
          : "bg-gray-800 hover:bg-gray-900",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-white" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5 text-white" strokeWidth={2} />
      )}
    </div>
  )
} 