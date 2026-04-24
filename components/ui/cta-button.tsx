"use client"

import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type CTASize = "sm" | "md" | "lg"

interface CTAButtonProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  size?: CTASize
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const sizeStyles: Record<CTASize, { button: string; icon: string; iconPx: number }> = {
  sm: {
    button: "h-10 text-xs ps-5 pe-11 hover:ps-11 hover:pe-5",
    icon: "w-8 h-8 group-hover:right-[calc(100%-36px)]",
    iconPx: 14,
  },
  md: {
    button: "h-12 text-sm ps-6 pe-14 hover:ps-14 hover:pe-6",
    icon: "w-10 h-10 group-hover:right-[calc(100%-44px)]",
    iconPx: 16,
  },
  lg: {
    button: "h-14 text-base ps-8 pe-16 hover:ps-16 hover:pe-8",
    icon: "w-11 h-11 group-hover:right-[calc(100%-48px)]",
    iconPx: 18,
  },
}

export function CTAButton({
  onClick,
  children,
  className,
  fullWidth,
  size = "md",
  type = "button",
  disabled = false,
}: CTAButtonProps) {
  const s = sizeStyles[size]

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center font-medium rounded-full p-1",
        "bg-[#AABB6A] text-white overflow-hidden",
        "transition-all duration-500 group",
        "shadow-md",
        !disabled && "cursor-pointer hover:shadow-[0_4px_20px_rgba(170,187,106,0.45)]",
        disabled && "opacity-60 cursor-not-allowed",
        s.button,
        fullWidth && "w-full justify-center",
        className
      )}
    >
      <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
        {children}
      </span>
      <div
        className={cn(
          "absolute right-1 bg-white text-[#AABB6A] rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0",
          !disabled && "group-hover:rotate-45",
          s.icon
        )}
      >
        <ArrowUpRight size={s.iconPx} strokeWidth={2.5} />
      </div>
    </button>
  )
}
