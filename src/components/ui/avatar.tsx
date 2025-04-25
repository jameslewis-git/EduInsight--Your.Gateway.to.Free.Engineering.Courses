"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full transition-all duration-300",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16"
      },
      variant: {
        default: "",
        outline: "ring-2 ring-border ring-offset-1 ring-offset-background",
        glow: "ring-2 ring-primary/40 ring-offset-1 ring-offset-background shadow-sm shadow-primary/20",
        futuristic: "ring-2 ring-primary/50 ring-offset-2 ring-offset-background shadow-[0_0_15px_rgba(var(--primary)/0.15)] after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_6px_rgba(var(--primary)/0.2)]"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
)

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    variant?: "default" | "outline" | "glow" | "futuristic";
  }
>(({ className, size, variant, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      avatarVariants({ size, variant }),
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    gradient?: boolean;
    glowing?: boolean;
  }
>(({ className, gradient, glowing, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full",
      gradient ? "bg-gradient-to-br from-primary/70 to-primary text-primary-foreground" : "bg-muted",
      glowing && "after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_6px_rgba(var(--primary)/0.3)]",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
