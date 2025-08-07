"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Users, MessageCircle, Phone, Video, Clock, Calendar, Target, Mail, ExternalLink, CheckCircle, XCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

const mockBuddy = {
  name: "Sarah Martinez",
  alias: "Sarah M.",
  avatar: "/placeholder.svg?height=80&width=80",
  goalCategory: "Health & Fitness",
  communicationMethod: "video",
  preferredTime: "7:00 PM EST",
  preferredDay: "Daily",
  timezone: "UTC-05:00 (Eastern Time)",
  isAnonymous: false,
  matchedDate: "2024-01-15",
  email: "sarah.m@example.com",
  whatsapp: "+1234567890"
}

const mockCheckIns = [
  {
    id: 1,
    date: "2024-01-20",
    type: "video",
    duration: "15 min",
    status: "completed",
    notes: "Great progress on morning workouts! Both completed 5/7 days this week."
  },
  {
    id: 2,
    date: "2024-01-13",
    type: "video",
    duration: "12 min",
    status: "completed",
    notes: "Discussed strategies for staying motivated during busy work days."
  },
  {
    id: 3,
    date: "2024-01-06",
    type: "text",
    duration: "5 min",
    status: "missed",
    notes: "Sarah was traveling, rescheduled to next day."
  }
]

export default function BuddyPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const { toast } = useToast()

  const getCommunicationIcon = (method: string) => {
    switch (method) {
      case 'text': return MessageCircle
      case 'call': return Phone
      case 'video': return Video
      default: return MessageCircle
    }
  }

  const handleContact = (method: 'email' | 'whatsapp') => {
    if (method === 'email') {
      window.open(`mailto:${mockBuddy.email}`)
    } else {
      window.open(`https://wa.me/${mockBuddy.whatsapp}`)
    }
    setIsContactModalOpen(false)
    toast({
      title: "Opening contact method",
      description: `Redirecting to ${method === 'email' ? 'email client' : 'WhatsApp'}...`,
    })
  }

  const getNextCheckIn = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getTimeUntilCheckIn = () => {
    const now = new Date()
    const checkInTime = new Date()
    checkInTime.setHours(19, 0, 0, 0) // 7:00 PM
    
    if (checkInTime < now) {
      checkInTime.setDate(checkInTime.getDate() + 1)
    }
    
    const diff = checkInTime.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hours}h ${minutes}m`
  }

  const CommunicationIcon = getCommunicationIcon(mockBuddy.communicationMethod)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <Users className="h-6 w-6" />
              <span>Buddy Info</span>
            </h1>
            <p className="text-muted-foreground">Your accountability partner details</p>
          </div>
        </div>
        <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <CommunicationIcon className="h-4 w-4 mr-2" />
              Contact Buddy
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact {mockBuddy.name}</DialogTitle>
              <DialogDescription>
                Choose how you'd like to reach out to your accountability buddy.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleContact('email')}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
                <ExternalLink className="h-4 w-4 ml-auto" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleContact('whatsapp')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Message
                <ExternalLink className="h-4 w-4 ml-auto" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Buddy Profile */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Buddy Profile</CardTitle>
                <CardDescription>
                  Information about your accountability partner
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={mockBuddy.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {mockBuddy.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {mockBuddy.isAnonymous ? mockBuddy.alias : mockBuddy.name}
                    </h3>
                    <p className="text-muted-foreground">Accountability Partner</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary">{mockBuddy.goalCategory}</Badge>
                      {mockBuddy.isAnonymous && (
                        <Badge variant="outline">Anonymous</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Communication Preferences</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Method:</span>
                          <div className="flex items-center space-x-2">
                            <CommunicationIcon className="h-4 w-4" />
                            <span className="capitalize">{mockBuddy.communicationMethod} calls</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Preferred time:</span>
                          <span>{mockBuddy.preferredTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Frequency:</span>
                          <span>{mockBuddy.preferredDay}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Partnership Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Matched on:</span>
                          <span>{new Date(mockBuddy.matchedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Timezone:</span>
                          <span>{mockBuddy.timezone.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Shared focus:</span>
                          <span>{mockBuddy.goalCategory}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Check-in */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Next Check-in</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="font-medium">{getNextCheckIn()}</p>
                  <p className="text-sm text-muted-foreground">at {mockBuddy.preferredTime}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{getTimeUntilCheckIn()}</p>
                  <p className="text-sm text-muted-foreground">until next check-in</p>
                </div>

                <Button className="w-full" onClick={() => setIsContactModalOpen(true)}>
                  <CommunicationIcon className="h-4 w-4 mr-2" />
                  Start Check-in
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Don't forget to prepare your weekly progress update!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Check-in History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Check-ins</CardTitle>
            <CardDescription>
              History of your accountability sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCheckIns.map((checkIn) => (
                <div key={checkIn.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {checkIn.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {new Date(checkIn.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <Badge variant={checkIn.status === 'completed' ? 'default' : 'destructive'}>
                          {checkIn.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {checkIn.type === 'video' && <Video className="h-4 w-4" />}
                        {checkIn.type === 'call' && <Phone className="h-4 w-4" />}
                        {checkIn.type === 'text' && <MessageCircle className="h-4 w-4" />}
                        <span>{checkIn.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{checkIn.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
