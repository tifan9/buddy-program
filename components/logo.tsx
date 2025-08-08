import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
}

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-32 h-32'
}

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-2xl'
}

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        <Image
          src="/logo.png"
          alt="Accountability Buddy Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={cn('font-bold text-brand-blue', textSizeClasses[size])}>
          Accountability Buddy
        </span>
      )}
    </div>
  )
}

// SVG version for better scalability
export function LogoSVG({ size = 'md', showText = true, className }: LogoProps) {
  const sizeValue = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 128
  }[size]

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <svg
        width={sizeValue}
        height={sizeValue}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Left person head */}
        <circle cx="65" cy="45" r="25" fill="#1E88E6" />
        
        {/* Right person head */}
        <circle cx="135" cy="45" r="25" fill="#1E88E6" />
        
        {/* Left person body */}
        <path
          d="M40 80 C40 75, 45 70, 50 70 L80 70 C85 70, 90 75, 90 80 L90 160 C90 165, 85 170, 80 170 L50 170 C45 170, 40 165, 40 160 Z"
          fill="#1E88E6"
        />
        
        {/* Right person body */}
        <path
          d="M110 80 C110 75, 115 70, 120 70 L150 70 C155 70, 160 75, 160 80 L160 160 C160 165, 155 170, 150 170 L120 170 C115 170, 110 165, 110 160 Z"
          fill="#1E88E6"
        />
        
        {/* Connection/partnership element (white space between) */}
        <rect x="85" y="85" width="30" height="80" fill="white" />
      </svg>
      
      {showText && (
        <span className={cn('font-bold text-brand-blue', textSizeClasses[size])}>
          Accountability Buddy
        </span>
      )}
    </div>
  )
}
