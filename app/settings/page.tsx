"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Settings, User, Bell, Shield, Trash2, Save } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // Profile Settings
    fullName: "John Doe",
    email: "john.doe@example.com",
    timezone: "UTC-05:00",
    bio: "Focused on building healthy habits and staying productive.",
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    buddyReminders: true,
    
    // Privacy Settings
    profileVisibility: "buddies", // public, buddies, private
    showProgress: true,
    anonymousMode: false,
    
    // Communication Settings
    communicationMethod: "video",
    availability: ["Monday", "Wednesday", "Friday"],
    preferredTime: "19:00"
  })

  const handleSave = () => {
    // Save settings logic here
    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated successfully.",
    })
  }

  const handleDeleteAccount = () => {
    // Delete account logic here
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account deletion requested",
        description: "Your account will be deleted within 24 hours.",
        variant: "destructive"
      })
    }
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
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
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
              Update your personal information and profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
                <p className="text-sm text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={settings.fullName}
                  onChange={(e) => setSettings({...settings, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-08:00">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-07:00">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="UTC-06:00">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="UTC-05:00">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC+00:00">GMT (UTC+0)</SelectItem>
                  <SelectItem value="UTC+01:00">Central European Time (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell your accountability buddy about yourself..."
                value={settings.bio}
                onChange={(e) => setSettings({...settings, bio: e.target.value})}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about your goals and buddy activities
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get browser notifications for important updates
                </p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly progress summaries
                </p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => setSettings({...settings, weeklyReports: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Buddy Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminded about check-ins with your accountability buddy
                </p>
              </div>
              <Switch
                checked={settings.buddyReminders}
                onCheckedChange={(checked) => setSettings({...settings, buddyReminders: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy & Security</span>
            </CardTitle>
            <CardDescription>
              Control your privacy and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Visibility</Label>
              <Select value={settings.profileVisibility} onValueChange={(value) => setSettings({...settings, profileVisibility: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                  <SelectItem value="buddies">Buddies Only - Only your accountability partners</SelectItem>
                  <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Show Progress to Buddies</Label>
                <p className="text-sm text-muted-foreground">
                  Allow your accountability partners to see your goal progress
                </p>
              </div>
              <Switch
                checked={settings.showProgress}
                onCheckedChange={(checked) => setSettings({...settings, showProgress: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Anonymous Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Hide your full name and show only first name + initial
                </p>
              </div>
              <Switch
                checked={settings.anonymousMode}
                onCheckedChange={(checked) => setSettings({...settings, anonymousMode: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Communication Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Communication Preferences</CardTitle>
            <CardDescription>
              Update how you prefer to communicate with your accountability buddy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Preferred Communication Method</Label>
              <Select value={settings.communicationMethod} onValueChange={(value) => setSettings({...settings, communicationMethod: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Messages</SelectItem>
                  <SelectItem value="call">Voice Calls</SelectItem>
                  <SelectItem value="video">Video Calls</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Preferred Check-in Time</Label>
              <Input
                type="time"
                value={settings.preferredTime}
                onChange={(e) => setSettings({...settings, preferredTime: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-destructive rounded-lg">
              <div>
                <h3 className="font-medium">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
