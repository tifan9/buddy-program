"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, UserPlus, Download, Search, Filter, MoreHorizontal, Shield, Calendar, Target, CheckCircle, XCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    goalCategory: "Health & Fitness",
    timezone: "UTC-05:00",
    matched: true,
    buddyId: 2,
    joinDate: "2024-01-15",
    lastActive: "2024-01-21",
    status: "active"
  },
  {
    id: 2,
    name: "Sarah Martinez",
    email: "sarah.m@example.com",
    goalCategory: "Health & Fitness",
    timezone: "UTC-05:00",
    matched: true,
    buddyId: 1,
    joinDate: "2024-01-14",
    lastActive: "2024-01-21",
    status: "active"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@example.com",
    goalCategory: "Productivity",
    timezone: "UTC-08:00",
    matched: false,
    buddyId: null,
    joinDate: "2024-01-20",
    lastActive: "2024-01-21",
    status: "active"
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.c@example.com",
    goalCategory: "Learning",
    timezone: "UTC+08:00",
    matched: false,
    buddyId: null,
    joinDate: "2024-01-19",
    lastActive: "2024-01-20",
    status: "active"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    goalCategory: "Productivity",
    timezone: "UTC-08:00",
    matched: false,
    buddyId: null,
    joinDate: "2024-01-18",
    lastActive: "2024-01-19",
    status: "inactive"
  }
]

const mockMatches = [
  {
    id: 1,
    buddy1: "John Doe",
    buddy2: "Sarah Martinez",
    matchedDate: "2024-01-16",
    status: "active",
    goalCategory: "Health & Fitness"
  },
  {
    id: 2,
    buddy1: "Alex Thompson",
    buddy2: "Lisa Brown",
    matchedDate: "2024-01-10",
    status: "inactive",
    goalCategory: "Learning"
  }
]

export default function AdminPage() {
  const [users, setUsers] = useState(mockUsers)
  const [matches, setMatches] = useState(mockMatches)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMatched, setFilterMatched] = useState("all")
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const { toast } = useToast()

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    const matchesMatched = filterMatched === "all" || 
                          (filterMatched === "matched" && user.matched) ||
                          (filterMatched === "unmatched" && !user.matched)
    
    return matchesSearch && matchesStatus && matchesMatched
  })

  const unmatchedUsers = users.filter(user => !user.matched)

  const handleCreateMatch = () => {
    if (selectedUsers.length !== 2) {
      toast({
        title: "Error",
        description: "Please select exactly 2 users to create a match.",
        variant: "destructive"
      })
      return
    }

    const [user1Id, user2Id] = selectedUsers
    const user1 = users.find(u => u.id === user1Id)
    const user2 = users.find(u => u.id === user2Id)

    if (!user1 || !user2) return

    // Update users to be matched
    setUsers(users.map(user => 
      user.id === user1Id ? { ...user, matched: true, buddyId: user2Id } :
      user.id === user2Id ? { ...user, matched: true, buddyId: user1Id } :
      user
    ))

    // Add new match
    const newMatch = {
      id: matches.length + 1,
      buddy1: user1.name,
      buddy2: user2.name,
      matchedDate: new Date().toISOString().split('T')[0],
      status: "active",
      goalCategory: user1.goalCategory
    }
    setMatches([...matches, newMatch])

    setSelectedUsers([])
    setIsMatchModalOpen(false)
    
    toast({
      title: "Match created!",
      description: `${user1.name} and ${user2.name} have been matched as accountability buddies.`,
    })
  }

  const handleExportUsers = () => {
    const csvContent = [
      ["Name", "Email", "Goal Category", "Timezone", "Matched", "Join Date", "Status"],
      ...users.map(user => [
        user.name,
        user.email,
        user.goalCategory,
        user.timezone,
        user.matched ? "Yes" : "No",
        user.joinDate,
        user.status
      ])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users-export.csv"
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export successful",
      description: "User data has been exported to CSV.",
    })
  }

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === "active").length
  const matchedUsers = users.filter(u => u.matched).length
  const totalMatches = matches.filter(m => m.status === "active").length

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span>Admin Panel</span>
            </h1>
            <p className="text-muted-foreground">Manage users and accountability matches</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportUsers}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={isMatchModalOpen} onOpenChange={setIsMatchModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Create Match
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Match</DialogTitle>
                <DialogDescription>
                  Select two unmatched users to pair as accountability buddies.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="text-sm text-muted-foreground">
                  Available unmatched users: {unmatchedUsers.length}
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {unmatchedUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedUsers.includes(user.id)
                          ? "border-primary bg-primary/10"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => {
                        if (selectedUsers.includes(user.id)) {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                        } else if (selectedUsers.length < 2) {
                          setSelectedUsers([...selectedUsers, user.id])
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{user.goalCategory}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{user.timezone}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedUsers.length}/2 users
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreateMatch}
                  disabled={selectedUsers.length !== 2}
                >
                  Create Match
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{matchedUsers}</p>
                  <p className="text-sm text-muted-foreground">Matched Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">{totalMatches}</p>
                  <p className="text-sm text-muted-foreground">Active Matches</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View and manage all registered users
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterMatched} onValueChange={setFilterMatched}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Match Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="matched">Matched</SelectItem>
                  <SelectItem value="unmatched">Unmatched</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Goal Category</TableHead>
                  <TableHead>Timezone</TableHead>
                  <TableHead>Matched</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.goalCategory}</Badge>
                    </TableCell>
                    <TableCell>{user.timezone}</TableCell>
                    <TableCell>
                      {user.matched ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">Yes</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-red-500">No</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          {user.matched && (
                            <DropdownMenuItem>View Buddy</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            Deactivate User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Matches Management */}
        <Card>
          <CardHeader>
            <CardTitle>Active Matches</CardTitle>
            <CardDescription>
              View and manage accountability buddy pairs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buddy 1</TableHead>
                  <TableHead>Buddy 2</TableHead>
                  <TableHead>Goal Category</TableHead>
                  <TableHead>Matched Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell className="font-medium">{match.buddy1}</TableCell>
                    <TableCell className="font-medium">{match.buddy2}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{match.goalCategory}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(match.matchedDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={match.status === "active" ? "default" : "secondary"}>
                        {match.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Check-in History</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Dissolve Match
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
