"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, User, Settings, Target, Eye } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Preferences", icon: Settings },
  { id: 3, title: "Goal Focus", icon: Target },
  { id: 4, title: "Preview", icon: Eye }
]

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
  "UTC-03:00 (Argentina)",
  "UTC-02:00 (South Georgia)",
  "UTC-01:00 (Azores)",
  "UTC+00:00 (London)",
  "UTC+01:00 (Central Europe)",
  "UTC+02:00 (Eastern Europe)",
  "UTC+03:00 (Moscow)",
  "UTC+04:00 (Dubai)",
  "UTC+05:00 (Pakistan)",
  "UTC+05:30 (India)",
  "UTC+06:00 (Bangladesh)",
  "UTC+07:00 (Thailand)",
  "UTC+08:00 (Singapore)",
  "UTC+09:00 (Japan)",
  "UTC+10:00 (Australia East)",
  "UTC+11:00 (Solomon Islands)",
  "UTC+12:00 (New Zealand)"
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

const GOAL_CATEGORIES = [
  "Productivity",
  "Health & Fitness",
  "Learning & Education",
  "Creative Projects",
  "Career Development",
  "Personal Development",
  "Relationships",
  "Financial Goals",
  "Other"
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    timezone: "",
    availability: [] as string[],
    communicationMethod: "",
    goalCategory: "",
    anonymousPairing: false
  })
  const router = useRouter()
  const { toast } = useToast()

  const progress = (currentStep / STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAvailabilityToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter(item => item !== option)
        : [...prev.availability, option]
    }))
  }

  const handleFinish = () => {
    toast({
      title: "Profile completed!",
      description: "Welcome to your accountability journey. Let's find you a buddy!",
    })
    router.push("/dashboard")
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
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
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Weekly Availability (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABILITY_OPTIONS.map((option) => (
                  <Button
                    key={option}
                    variant={formData.availability.includes(option) ? "default" : "outline"}
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
                value={formData.communicationMethod}
                onValueChange={(value) => setFormData({...formData, communicationMethod: value})}
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
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="goalCategory">Main Goal Category</Label>
              <Select value={formData.goalCategory} onValueChange={(value) => setFormData({...formData, goalCategory: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your main goal focus" />
                </SelectTrigger>
                <SelectContent>
                  {GOAL_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                checked={formData.anonymousPairing}
                onCheckedChange={(checked) => setFormData({...formData, anonymousPairing: checked})}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Profile Preview</h3>
              <p className="text-muted-foreground">Review your information before finishing</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Name:</span>
                <span>{formData.fullName}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Timezone:</span>
                <span>{formData.timezone}</span>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium mb-2">Availability:</div>
                <div className="flex flex-wrap gap-1">
                  {formData.availability.map((time) => (
                    <Badge key={time} variant="secondary" className="text-xs">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Communication:</span>
                <span className="capitalize">{formData.communicationMethod}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Goal Focus:</span>
                <span>{formData.goalCategory}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Anonymous:</span>
                <span>{formData.anonymousPairing ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
              <CardDescription>
                Step {currentStep} of {STEPS.length}
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </div>
          </div>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-4">
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center space-y-2 ${
                    step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.id <= currentStep
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{step.title}</span>
                </div>
              )
            })}
          </div>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            {currentStep === STEPS.length ? (
              <Button onClick={handleFinish} disabled={!isStepValid()}>
                Finish Setup
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!isStepValid()}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
