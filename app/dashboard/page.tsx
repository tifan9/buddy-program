"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Target, CheckCircle, Clock, Flame, Plus, MessageCircle, Phone, Video, Calendar, TrendingUp, Users, Bell, LogOut } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Mock data
const mockGoals = [
  {
    id: 1,
    title: "Daily Exercise",
    frequency: "Daily",
    progress: 85,
    completedToday: true,
    streak: 12
  },
  {
    id: 2,
    title: "Read 30 minutes",
    frequency: "Daily",
    progress: 60,
    completedToday: false,
    streak: 8
  },
  {
    id: 3,
    title: "Learn Spanish",
    frequency: "5x per week",
    progress: 40,
    completedToday: false,
    streak: 3
  }
]

const mockBuddy = {
  name: "Sarah M.",
  avatar: "/placeholder.svg?height=40&width=40",
  preferredTime: "7:00 PM EST",
  communicationMethod: "video",
  nextCheckin: "Tomorrow at 7:00 PM",
  isMatched: true
}

export default function DashboardPage() {
  const [goals, setGoals] = useState(mockGoals)
  const { toast } = useToast()

  const handleMarkComplete = (goalId: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completedToday: !goal.completedToday, progress: goal.completedToday ? goal.progress - 10 : goal.progress + 10 }
        : goal
    ))
    
    const goal = goals.find(g => g.id === goalId)
    toast({
      title: goal?.completedToday ? "Goal unmarked" : "Great job! 🎉",
      description: goal?.completedToday 
        ? `${goal.title} unmarked for today`
        : `You've completed "${goal?.title}" for today!`,
    })
  }

  const weeklyProgress = Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)
  const currentStreak = Math.max(...goals.map(g => g.streak))
  const completedToday = goals.filter(g => g.completedToday).length

  const getCommunicationIcon = (method: string) => {
    switch (method) {
      case 'text': return MessageCircle
      case 'call': return Phone
      case 'video': return Video
      default: return MessageCircle
    }
  }

  const CommunicationIcon = getCommunicationIcon(mockBuddy.communicationMethod)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Good morning, John! 👋</h1>
            <p className="text-muted-foreground">Ready to crush your goals today?</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Weekly Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Weekly Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{weeklyProgress}%</div>
                <p className="text-sm text-muted-foreground">Week Complete</p>
                <Progress value={weeklyProgress} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Flame className="h-6 w-6 text-orange-500" />
                  <span className="text-3xl font-bold">{currentStreak}</span>
                </div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{completedToday}/{goals.length}</div>
                <p className="text-sm text-muted-foreground">Goals Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Goals */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Active Goals</span>
                </CardTitle>
                <Link href="/goals">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium">{goal.title}</h3>
                        <Badge variant="secondary">{goal.frequency}</Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span>{goal.streak} days</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                          <span>Weekly Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </div>
                    <Button
                      variant={goal.completedToday ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleMarkComplete(goal.id)}
                      className="ml-4"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {goal.completedToday ? "Done" : "Mark Done"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Buddy Status */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Buddy Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockBuddy.isMatched ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={mockBuddy.avatar || "/placeholder.svg"} />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{mockBuddy.name}</p>
                        <p className="text-sm text-muted-foreground">Your accountability buddy</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Preferred time:</span>
                        <span>{mockBuddy.preferredTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Next check-in:</span>
                        <span className="font-medium">{mockBuddy.nextCheckin}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <CommunicationIcon className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Link href="/buddy" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Next check-in in 18 hours</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="font-medium mb-2">Finding your buddy...</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      We're matching you with someone who shares your goals and schedule.
                    </p>
                    <Button variant="outline" size="sm">
                      Update Preferences
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <Link href="/goals">
        <Button
          size="lg"
          className="fixed bottom-6 right-6 rounded-full shadow-lg h-14 w-14 p-0"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  )
}
