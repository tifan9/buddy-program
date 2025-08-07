import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import Link from "next/link"

interface FloatingActionButtonProps {
  href: string
  children?: React.ReactNode
}

export function FloatingActionButton({ href, children }: FloatingActionButtonProps) {
  return (
    <Link href={href}>
      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full shadow-lg h-14 w-14 p-0 z-50"
      >
        {children || <Plus className="h-6 w-6" />}
      </Button>
    </Link>
  )
}
