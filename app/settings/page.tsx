"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, User, Bell, Shield, Trash2, Upload } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

const TIMEZONES = [
  "UTC-12:00 (Baker Island)",
  "UTC-11:00 (American Samoa)",
  "UTC-10:00 (Hawaii)",
  "UTC-09:00 (Alaska)",
  "UTC-08:00 (Pacific Time)",
  "UTC-07:00 (Mountain Time)",
  "UTC-06:00 (Central Time)",
  "UTC-05:00 (Eastern Time)",
  "UTC-04:00 (Atlantic Time)",
  "UTC+00:00 (London)",
  "UTC+01:00 (Central Europe)",
  "UTC+08:00 (Singapore)",
  "UTC+09:00 (Japan)",
]

const AVAILABILITY_OPTIONS = [
  "Monday Morning", "Monday Evening",
  "Tuesday Morning", "Tuesday Evening",
  "Wednesday Morning", "Wednesday Evening",
  "Thursday Morning", "Thursday Evening",
  "Friday Morning", "Friday Evening",
  "Saturday Morning", "Saturday Evening",
  "Sunday Morning", "Sunday Evening"
]

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate about fitness and personal development. Looking to build consistent habits with an accountability partner.",
    timezone: "UTC-05:00 (Eastern Time)",
    availability: ["Monday Evening", "Wednesday Evening", "Friday Evening"],
    communicationMethod: "video",
    anonymousPairing: false
  })

  const [notifications, setNotifications] = useState({
    goalReminders: true,
    buddyMessages: true,
    checkInReminders: true,
    weeklyReports: true,
    badgeEarned: true,
    emailNotifications: true
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "buddy",
    shareProgress: true,
    allowMatching: true
  })

  const { toast } = useToast()

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated!",
      description: "Your profile settings have been saved successfully.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated!",
      description: "Your notification settings have been saved.",
    })
  }

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy settings updated!",
      description: "Your privacy preferences have been saved.",
    })
  }

  const handleAvailabilityToggle = (option: string) => {
    setProfileData(prev => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter(item => item !== option)
        : [...prev.availability, option]
    }))
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "This feature would be implemented with proper confirmation flow.",
      variant: "destructive"
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <Settings className="h-6 w-6" />
              <span>Settings</span>
            </h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Settings</span>
            </CardTitle>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell your buddy a bit about yourself and your goals..."
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={profileData.timezone} onValueChange={(value) => setProfileData({...profileData, timezone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Weekly Availability</Label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABILITY_OPTIONS.map((option) => (
                  <Button
                    key={option}
                    variant={profileData.availability.includes(option) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAvailabilityToggle(option)}
                    className="justify-start"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Preferred Communication Method</Label>
              <RadioGroup
                value={profileData.communicationMethod}
                onValueChange={(value) => setProfileData({...profileData, communicationMethod: value})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="text" />
                  <Label htmlFor="text">Text Messages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="call" id="call" />
                  <Label htmlFor="call">Phone Calls</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video">Video Calls</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="anonymous">Anonymous Pairing</Label>
                <p className="text-sm text-muted-foreground">
                  Your buddy will only see your first name and goals
                </p>
              </div>
              <Switch
                id="anonymous"
                checked={profileData.anonymousPairing}
                onCheckedChange={(checked) => setProfileData({...profileData, anonymousPairing: checked})}
              />
            </div>

            <Button onClick={handleSaveProfile}>
              Save Profile Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
            <CardDescription>
              Choose what notifications you'd like to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Goal Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily reminders to complete your goals
                  </p>
                </div>
                <Switch
                  checked={notifications.goalReminders}
                  onCheckedChange={(checked) => setNotifications({...notifications, goalReminders: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Buddy Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Messages from your accountability buddy
                  </p>
                </div>
                <Switch
                  checked={notifications.buddyMessages}
                  onCheckedChange={(checked) => setNotifications({...notifications, buddyMessages: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Check-in Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Reminders for scheduled buddy check-ins
                  </p>
                </div>
                <Switch
                  checked={notifications.checkInReminders}
                  onCheckedChange={(checked) => setNotifications({...notifications, checkInReminders: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly progress summaries
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Badge Earned</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications when you earn new badges
                  </p>
                </div>
                <Switch
                  checked={notifications.badgeEarned}
                  onCheckedChange={(checked) => setNotifications({...notifications, badgeEarned: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                />
              </div>
            </div>

            <Button onClick={handleSaveNotifications}>
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy Settings</span>
            </CardTitle>
            <CardDescription>
              Control your privacy and data sharing preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select value={privacy.profileVisibility} onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can see</SelectItem>
                    <SelectItem value="buddy">Buddy Only - Only your accountability buddy</SelectItem>
                    <SelectItem value="private">Private - No one can see</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Share Progress Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow your buddy to see your detailed progress
                  </p>
                </div>
                <Switch
                  checked={privacy.shareProgress}
                  onCheckedChange={(checked) => setPrivacy({...privacy, shareProgress: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow New Matches</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow the system to match you with new buddies
                  </p>
                </div>
                <Switch
                  checked={privacy.allowMatching}
                  onCheckedChange={(checked) => setPrivacy({...privacy, allowMatching: checked})}
                />
              </div>
            </div>

            <Button onClick={handleSavePrivacy}>
              Save Privacy Settings
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              <span>Danger Zone</span>
            </CardTitle>
            <CardDescription>
              Irreversible actions that will affect your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-medium text-red-800 mb-2">Delete Account</h3>
              <p className="text-sm text-red-700 mb-4">
                Once you delete your account, there is no going back. This will permanently delete your profile, goals, progress data, and remove you from any buddy matches.
              </p>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete My Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
