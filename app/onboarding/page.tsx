"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, User, Clock, Target, Eye } from 'lucide-react'
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const TOTAL_STEPS = 4

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: "",
    timezone: "",
    
    // Step 2: Preferences
    availability: [] as string[],
    communicationMethod: "",
    
    // Step 3: Goal Focus
    goalCategory: "",
    anonymousPairing: false,
    
    // Step 4: Profile Preview (computed)
  })

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      toast({
        title: "Welcome to Accountability Buddy!",
        description: "Your profile is complete. Let's find you a buddy!",
      })
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        availability: [...formData.availability, day]
      })
    } else {
      setFormData({
        ...formData,
        availability: formData.availability.filter(d => d !== day)
      })
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.timezone
      case 2:
        return formData.availability.length > 0 && formData.communicationMethod
      case 3:
        return formData.goalCategory
      case 4:
        return true
      default:
        return false
    }
  }

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <p className="text-muted-foreground">Tell us a bit about yourself</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Select value={formData.timezone} onValueChange={(value) => setFormData({...formData, timezone: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-08:00">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="UTC-07:00">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="UTC-06:00">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="UTC-05:00">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="UTC+00:00">GMT (UTC+0)</SelectItem>
                    <SelectItem value="UTC+01:00">Central European Time (UTC+1)</SelectItem>
                    <SelectItem value="UTC+08:00">China Standard Time (UTC+8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold">Your Preferences</h2>
              <p className="text-muted-foreground">When and how would you like to connect?</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Weekly Availability (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={day}
                        checked={formData.availability.includes(day)}
                        onChange={(e) => handleAvailabilityChange(day, e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={day}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Preferred Communication Method</Label>
                <RadioGroup
                  value={formData.communicationMethod}
                  onValueChange={(value) => setFormData({...formData, communicationMethod: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">Text Messages</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="call" id="call" />
                    <Label htmlFor="call">Voice Calls</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video">Video Calls</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold">Goal Focus</h2>
              <p className="text-muted-foreground">What area would you like to focus on?</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Main Goal Category</Label>
                <Select value={formData.goalCategory} onValueChange={(value) => setFormData({...formData, goalCategory: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your main focus area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="health">Health & Fitness</SelectItem>
                    <SelectItem value="learning">Learning & Education</SelectItem>
                    <SelectItem value="creative">Creative Projects</SelectItem>
                    <SelectItem value="career">Career Development</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <Label>Anonymous Pairing</Label>
                  <p className="text-sm text-muted-foreground">
                    Keep your identity private and use only first name
                  </p>
                </div>
                <Switch
                  checked={formData.anonymousPairing}
                  onCheckedChange={(checked) => setFormData({...formData, anonymousPairing: checked})}
                />
              </div>
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Eye className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold">Profile Preview</h2>
              <p className="text-muted-foreground">Review your information before finishing</p>
            </div>
            
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>
                      {formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {formData.anonymousPairing 
                        ? formData.fullName.split(' ')[0] + " " + formData.fullName.split(' ')[1]?.[0] + "."
                        : formData.fullName
                      }
                    </h3>
                    <p className="text-muted-foreground">{formData.timezone}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Goal Focus</h4>
                    <Badge variant="secondary" className="capitalize">
                      {formData.goalCategory}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Communication</h4>
                    <Badge variant="outline" className="capitalize">
                      {formData.communicationMethod}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Availability</h4>
                    <div className="flex flex-wrap gap-1">
                      {formData.availability.map((day) => (
                        <Badge key={day} variant="outline" className="text-xs">
                          {day.slice(0, 3)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Privacy</h4>
                    <Badge variant={formData.anonymousPairing ? "default" : "outline"}>
                      {formData.anonymousPairing ? "Anonymous" : "Public"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <CardTitle>Welcome to Accountability Buddy</CardTitle>
            </div>
            <Badge variant="outline">
              Step {currentStep} of {TOTAL_STEPS}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </CardHeader>
        
        <CardContent className="p-6">
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {currentStep === TOTAL_STEPS ? "Complete Setup" : "Next"}
              {currentStep !== TOTAL_STEPS && <ChevronRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
