"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar, TrendingUp, Flame, MessageSquare, Target } from 'lucide-react'

// Mock data for calendar heatmap
const generateHeatmapData = () => {
  const data = []
  const today = new Date()
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Random completion level (0-4)
    const level = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0
    
    data.push({
      date: date.toISOString().split('T')[0],
      level,
      goals: level > 0 ? Math.floor(Math.random() * 3) + 1 : 0
    })
  }
  
  return data
}

const mockGoals = [
  { id: 1, title: "Daily Exercise", color: "bg-blue-500" },
  { id: 2, title: "Read 30 minutes", color: "bg-green-500" },
  { id: 3, title: "Learn Spanish", color: "bg-purple-500" }
]

const mockWeeklySummary = {
  goalsAttempted: 3,
  daysCompleted: 5,
  commentsAdded: 12,
  currentStreak: 8
}

export default function ProgressPage() {
  const [selectedGoal, setSelectedGoal] = useState("all")
  const [heatmapData] = useState(generateHeatmapData())

  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const labels = []
    const today = new Date()
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      labels.push(months[date.getMonth()])
    }
    
    return labels
  }

  const getDayLabels = () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getWeeksInYear = () => {
    const weeks = []
    let currentWeek = []
    
    heatmapData.forEach((day, index) => {
      currentWeek.push(day)
      
      if (currentWeek.length === 7 || index === heatmapData.length - 1) {
        weeks.push([...currentWeek])
        currentWeek = []
      }
    })
    
    return weeks
  }

  const filteredData = selectedGoal === "all" 
    ? heatmapData 
    : heatmapData.map(day => ({
        ...day,
        level: day.level > 0 ? Math.floor(Math.random() * 5) : 0
      }))

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <TrendingUp className="h-6 w-6" />
              <span>Progress Log</span>
            </h1>
            <p className="text-muted-foreground">Track your daily progress and streaks</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedGoal} onValueChange={setSelectedGoal}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Goals</SelectItem>
              {mockGoals.map((goal) => (
                <SelectItem key={goal.id} value={goal.id.toString()}>
                  {goal.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Weekly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{mockWeeklySummary.goalsAttempted}</p>
                  <p className="text-sm text-muted-foreground">Goals Attempted</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{mockWeeklySummary.daysCompleted}</p>
                  <p className="text-sm text-muted-foreground">Days Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{mockWeeklySummary.commentsAdded}</p>
                  <p className="text-sm text-muted-foreground">Comments Added</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-orange-500">{mockWeeklySummary.currentStreak}</p>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Calendar</CardTitle>
            <CardDescription>
              Your daily progress over the past year. Darker colors indicate more goals completed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Month labels */}
              <div className="flex justify-between text-xs text-muted-foreground pl-8">
                {getMonthLabels().map((month, index) => (
                  <span key={index}>{month}</span>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="flex">
                {/* Day labels */}
                <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2 py-1">
                  {getDayLabels().map((day, index) => (
                    <span key={index} className={index % 2 === 0 ? "opacity-100" : "opacity-0"}>
                      {day}
                    </span>
                  ))}
                </div>
                
                {/* Heatmap */}
                <div className="flex space-x-1">
                  {getWeeksInYear().map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col space-y-1">
                      {week.map((day, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`heatmap-day heatmap-day-${day.level} cursor-pointer hover:ring-2 hover:ring-primary/50`}
                          title={`${day.date}: ${day.goals} goals completed`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Less</span>
                  <div className="flex space-x-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div key={level} className={`heatmap-day heatmap-day-${level}`} />
                    ))}
                  </div>
                  <span>More</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {filteredData.filter(d => d.level > 0).length} days with activity
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goal Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Goal Categories</CardTitle>
            <CardDescription>
              Color coding for your different goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockGoals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${goal.color}`} />
                  <span className="font-medium">{goal.title}</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Streak Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span>Streak Details</span>
            </CardTitle>
            <CardDescription>
              Your consistency streaks and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Current Streak</p>
                  <p className="text-sm text-muted-foreground">Days with at least one goal completed</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-500">{mockWeeklySummary.currentStreak}</p>
                  <p className="text-sm text-muted-foreground">days</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Longest Streak</p>
                  <p className="text-sm text-muted-foreground">Your personal best</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">23</p>
                  <p className="text-sm text-muted-foreground">days</p>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Tip:</strong> Streaks reset when you miss a day completely. 
                  Try to complete at least one goal daily to maintain your streak!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
