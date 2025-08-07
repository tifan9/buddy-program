"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Award, Flame, Target, Users, Calendar, Trophy, Star, Zap, Crown, Heart } from 'lucide-react'

const mockBadges = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first goal",
    icon: Target,
    earned: true,
    earnedDate: "2024-01-16",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    requirement: "Complete 1 goal"
  },
  {
    id: 2,
    name: "3-Day Streak",
    description: "Maintain a 3-day streak",
    icon: Flame,
    earned: true,
    earnedDate: "2024-01-18",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    requirement: "3 consecutive days"
  },
  {
    id: 3,
    name: "Team Player",
    description: "Complete first check-in with buddy",
    icon: Users,
    earned: true,
    earnedDate: "2024-01-20",
    color: "text-green-600",
    bgColor: "bg-green-100",
    requirement: "1 buddy check-in"
  },
  {
    id: 4,
    name: "Week Warrior",
    description: "Complete all goals for a full week",
    icon: Calendar,
    earned: false,
    earnedDate: null,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    requirement: "7 consecutive days"
  },
  {
    id: 5,
    name: "Consistency Champion",
    description: "Maintain a 14-day streak",
    icon: Trophy,
    earned: false,
    earnedDate: null,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    requirement: "14 consecutive days"
  },
  {
    id: 6,
    name: "Goal Getter",
    description: "Create 5 different goals",
    icon: Star,
    earned: false,
    earnedDate: null,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    requirement: "Create 5 goals"
  },
  {
    id: 7,
    name: "Lightning Fast",
    description: "Complete a goal within 1 hour of creation",
    icon: Zap,
    earned: false,
    earnedDate: null,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    requirement: "Complete goal within 1 hour"
  },
  {
    id: 8,
    name: "Monthly Master",
    description: "Complete goals for 30 consecutive days",
    icon: Crown,
    earned: false,
    earnedDate: null,
    color: "text-red-600",
    bgColor: "bg-red-100",
    requirement: "30 consecutive days"
  },
  {
    id: 9,
    name: "Supportive Buddy",
    description: "Help your buddy achieve their goals",
    icon: Heart,
    earned: false,
    earnedDate: null,
    color: "text-rose-600",
    bgColor: "bg-rose-100",
    requirement: "Support buddy for 1 week"
  }
]

export default function BadgesPage() {
  const [showConfetti, setShowConfetti] = useState(false)
  
  const earnedBadges = mockBadges.filter(badge => badge.earned)
  const lockedBadges = mockBadges.filter(badge => !badge.earned)

  const handleBadgeClick = (badge: any) => {
    if (badge.earned) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                >
                  🎉
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold flex items-center space-x-2">
                <Award className="h-6 w-6" />
                <span>Badges</span>
              </h1>
              <p className="text-muted-foreground">Your achievements and milestones</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{earnedBadges.length}/{mockBadges.length}</p>
            <p className="text-sm text-muted-foreground">Badges earned</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Achievement Progress</CardTitle>
              <CardDescription>
                Keep completing goals to unlock more badges!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{earnedBadges.length}</div>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{lockedBadges.length}</div>
                  <p className="text-sm text-muted-foreground">Still to Unlock</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round((earnedBadges.length / mockBadges.length) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earned Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span>Earned Badges ({earnedBadges.length})</span>
              </CardTitle>
              <CardDescription>
                Congratulations on these achievements!
              </CardDescription>
            </CardHeader>
            <CardContent>
              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadges.map((badge) => {
                    const Icon = badge.icon
                    return (
                      <Tooltip key={badge.id}>
                        <TooltipTrigger asChild>
                          <div
                            className="p-6 border rounded-lg cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50"
                            onClick={() => handleBadgeClick(badge)}
                          >
                            <div className="flex flex-col items-center text-center space-y-3">
                              <div className={`w-16 h-16 rounded-full ${badge.bgColor} flex items-center justify-center`}>
                                <Icon className={`h-8 w-8 ${badge.color}`} />
                              </div>
                              <div>
                                <h3 className="font-semibold">{badge.name}</h3>
                                <p className="text-sm text-muted-foreground">{badge.description}</p>
                              </div>
                              <Badge variant="default" className="bg-green-600">
                                Earned
                              </Badge>
                              {badge.earnedDate && (
                                <p className="text-xs text-muted-foreground">
                                  {new Date(badge.earnedDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to celebrate! 🎉</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">No badges earned yet</p>
                  <p className="text-muted-foreground">
                    Start completing goals to earn your first badge!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Locked Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-muted-foreground" />
                <span>Locked Badges ({lockedBadges.length})</span>
              </CardTitle>
              <CardDescription>
                Keep working towards these achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedBadges.map((badge) => {
                  const Icon = badge.icon
                  return (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <div className="p-6 border rounded-lg opacity-60 hover:opacity-80 transition-opacity">
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                              <Icon className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-600">{badge.name}</h3>
                              <p className="text-sm text-muted-foreground">{badge.description}</p>
                            </div>
                            <Badge variant="outline">
                              Locked
                            </Badge>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p><strong>Requirement:</strong> {badge.requirement}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Badge Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Badge Categories</CardTitle>
              <CardDescription>
                Different types of achievements you can unlock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <Flame className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h3 className="font-medium">Streak Badges</h3>
                  <p className="text-sm text-muted-foreground">For consistency</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium">Goal Badges</h3>
                  <p className="text-sm text-muted-foreground">For achievements</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-medium">Social Badges</h3>
                  <p className="text-sm text-muted-foreground">For buddy activities</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Crown className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-medium">Elite Badges</h3>
                  <p className="text-sm text-muted-foreground">For mastery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </TooltipProvider>
  )
}
