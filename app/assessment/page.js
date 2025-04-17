"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowLeft, Save } from "lucide-react"

export default function AssessmentPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("assessment")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    weight: "",
    mood: "",
    workout: "",
    duration: "",
    notes: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Show success message
      alert("Assessment saved successfully!")
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">New Assessment</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-content">
        <Card className="shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Today's Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="75.5"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">How are you feeling today?</Label>
                <Select value={formData.mood} onValueChange={(value) => handleChange("mood", value)}>
                  <SelectTrigger id="mood">
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="great">Great</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="okay">Okay</SelectItem>
                    <SelectItem value="tired">Tired</SelectItem>
                    <SelectItem value="stressed">Stressed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workout">Workout Completed</Label>
                <Select value={formData.workout} onValueChange={(value) => handleChange("workout", value)}>
                  <SelectTrigger id="workout">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="walking">Walking</SelectItem>
                    <SelectItem value="cycling">Cycling</SelectItem>
                    <SelectItem value="swimming">Swimming</SelectItem>
                    <SelectItem value="strength">Strength Training</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="none">No Workout Today</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={formData.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="How did your workout feel? Any challenges?"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Assessment
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <p className="font-medium">Yesterday</p>
                  <p className="text-sm text-muted-foreground">76.2 kg</p>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-muted-foreground">Running • 45 min</p>
                  <p className="text-sm text-green-500">Good</p>
                </div>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <p className="font-medium">2 days ago</p>
                  <p className="text-sm text-muted-foreground">76.5 kg</p>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-muted-foreground">Strength • 60 min</p>
                  <p className="text-sm text-amber-500">Tired</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="font-medium">3 days ago</p>
                  <p className="text-sm text-muted-foreground">76.8 kg</p>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-muted-foreground">Yoga • 30 min</p>
                  <p className="text-sm text-blue-500">Great</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
