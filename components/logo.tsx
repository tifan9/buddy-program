import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  showText?: boolean
  variant?: "full" | "icon"
}

export function Logo({ className, size = "md", showText = true, variant = "full" }: LogoProps) {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl"
  }

  if (variant === "icon") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <Image
          src="/logo.png"
          alt="Accountability Buddy Logo"
          width={64}
          height={64}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    )
  }

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <Image
          src="/logo.png"
          alt="Accountability Buddy Logo"
          width={64}
          height={64}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={cn("font-bold text-primary", textSizeClasses[size])}>
          Accountability Buddy
        </span>
      )}
    </div>
  )
}

// SVG version for better scalability and customization
export function LogoSVG({ className, size = "md", showText = true, variant = "full" }: LogoProps) {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl"
  }

  const iconSvg = (
    <div className={cn("relative", sizeClasses[size])}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#1E88E6">
          {/* Left figure head */}
          <circle cx="30" cy="25" r="12" />
          {/* Left figure body */}
          <path d="M10 45 C10 38, 18 32, 30 32 C42 32, 50 38, 50 45 L50 85 C50 92, 42 98, 35 98 L25 98 C18 98, 10 92, 10 85 Z" />
          
          {/* Right figure head */}
          <circle cx="70" cy="25" r="12" />
          {/* Right figure body */}
          <path d="M50 45 C50 38, 58 32, 70 32 C82 32, 90 38, 90 45 L90 85 C90 92, 82 98, 75 98 L65 98 C58 98, 50 92, 50 85 Z" />
        </g>
      </svg>
    </div>
  )

  if (variant === "icon") {
    return <div className={className}>{iconSvg}</div>
  }

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {iconSvg}
      {showText && (
        <span className={cn("font-bold text-primary", textSizeClasses[size])}>
          Accountability Buddy
        </span>
      )}
    </div>
  )
}
