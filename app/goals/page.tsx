"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Target, Plus, MoreHorizontal, Edit, Archive, CheckCircle, Calendar } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

const mockGoals = [
  {
    id: 1,
    title: "Daily Exercise",
    frequency: "Daily",
    motivation: "Stay healthy and energetic",
    createdAt: "2024-01-15",
    completedToday: true,
    isActive: true
  },
  {
    id: 2,
    title: "Read 30 minutes",
    frequency: "Daily",
    motivation: "Expand knowledge and improve focus",
    createdAt: "2024-01-10",
    completedToday: false,
    isActive: true
  },
  {
    id: 3,
    title: "Learn Spanish",
    frequency: "5x per week",
    motivation: "Prepare for upcoming trip to Spain",
    createdAt: "2024-01-08",
    completedToday: false,
    isActive: true
  },
  {
    id: 4,
    title: "Meditation",
    frequency: "Daily",
    motivation: "Reduce stress and improve mental clarity",
    createdAt: "2024-01-05",
    completedToday: false,
    isActive: false
  }
]

export default function GoalsPage() {
  const [goals, setGoals] = useState(mockGoals)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    frequency: "",
    motivation: ""
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingGoal) {
      setGoals(goals.map(goal => 
        goal.id === editingGoal.id 
          ? { ...goal, ...formData }
          : goal
      ))
      toast({
        title: "Goal updated!",
        description: `"${formData.title}" has been updated successfully.`,
      })
    } else {
      const newGoal = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        completedToday: false,
        isActive: true
      }
      setGoals([...goals, newGoal])
      toast({
        title: "Goal created! 🎯",
        description: `"${formData.title}" has been added to your goals.`,
      })
    }
    
    setFormData({ title: "", frequency: "", motivation: "" })
    setEditingGoal(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (goal: any) => {
    setEditingGoal(goal)
    setFormData({
      title: goal.title,
      frequency: goal.frequency,
      motivation: goal.motivation
    })
    setIsDialogOpen(true)
  }

  const handleArchive = (goalId: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, isActive: false }
        : goal
    ))
    const goal = goals.find(g => g.id === goalId)
    toast({
      title: "Goal archived",
      description: `"${goal?.title}" has been archived.`,
    })
  }

  const handleMarkComplete = (goalId: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completedToday: !goal.completedToday }
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

  const activeGoals = goals.filter(goal => goal.isActive)
  const archivedGoals = goals.filter(goal => !goal.isActive)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <Target className="h-6 w-6" />
              <span>My Goals</span>
            </h1>
            <p className="text-muted-foreground">Create and manage your accountability goals</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingGoal(null)
              setFormData({ title: "", frequency: "", motivation: "" })
            }}>
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingGoal ? "Edit Goal" : "Create New Goal"}
              </DialogTitle>
              <DialogDescription>
                {editingGoal 
                  ? "Update your goal details below."
                  : "Set up a new goal to track with your accountability buddy."
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Daily Exercise"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Weekly Commitment</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3x per week">3x per week</SelectItem>
                      <SelectItem value="5x per week">5x per week</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motivation">Motivation Note (Optional)</Label>
                  <Textarea
                    id="motivation"
                    placeholder="Why is this goal important to you?"
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editingGoal ? "Update Goal" : "Create Goal"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Active Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Active Goals ({activeGoals.length})</CardTitle>
            <CardDescription>
              Goals you're currently working on with your accountability buddy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Goal</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Today</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeGoals.map((goal) => (
                  <TableRow key={goal.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{goal.title}</div>
                        {goal.motivation && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {goal.motivation}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{goal.frequency}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={goal.completedToday ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleMarkComplete(goal.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {goal.completedToday ? "Done" : "Mark Done"}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(goal)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleArchive(goal.id)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {activeGoals.length === 0 && (
              <div className="text-center py-8">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No active goals yet</p>
                <p className="text-muted-foreground mb-4">
                  Create your first goal to start your accountability journey
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Goal
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Archived Goals */}
        {archivedGoals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Archived Goals ({archivedGoals.length})</CardTitle>
              <CardDescription>
                Goals you've completed or are no longer actively pursuing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Goal</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archivedGoals.map((goal) => (
                    <TableRow key={goal.id} className="opacity-60">
                      <TableCell>
                        <div>
                          <div className="font-medium">{goal.title}</div>
                          {goal.motivation && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {goal.motivation}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{goal.frequency}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGoals(goals.map(g => 
                            g.id === goal.id ? {...g, isActive: true} : g
                          ))}
                        >
                          Restore
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
