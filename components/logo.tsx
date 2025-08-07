import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl"
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <Image
          src="/logo.png"
          alt="Accountability Buddy Logo"
          width={48}
          height={48}
          className="w-full h-full object-contain"
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

// SVG version for better scalability
export function LogoSVG({ className, size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl"
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Two buddy figures */}
          <g fill="#1E88E6">
            {/* Left figure */}
            <circle cx="25" cy="20" r="8" />
            <path d="M10 35 C10 30, 15 25, 25 25 C35 25, 40 30, 40 35 L40 70 C40 75, 35 80, 30 80 L20 80 C15 80, 10 75, 10 70 Z" />
            
            {/* Right figure */}
            <circle cx="75" cy="20" r="8" />
            <path d="M60 35 C60 30, 65 25, 75 25 C85 25, 90 30, 90 35 L90 70 C90 75, 85 80, 80 80 L70 80 C65 80, 60 75, 60 70 Z" />
            
            {/* Connection between figures */}
            <path d="M40 50 L60 50" stroke="#1E88E6" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      </div>
      {showText && (
        <span className={cn("font-bold text-primary", textSizeClasses[size])}>
          Accountability Buddy
        </span>
      )}
    </div>
  )
}
