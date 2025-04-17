"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowLeft, Target, Flame, Clock, Weight, Save } from "lucide-react"
import { mockUserData } from "@/lib/utils"

export default function GoalsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("goals")
  const [isLoading, setIsLoading] = useState(false)
  const [goals, setGoals] = useState({
    steps: 10000,
    calories: 500,
    activeMinutes: 60,
    weight: "",
  })

  useEffect(() => {
    // Load initial goals from mock data
    setGoals({
      steps: mockUserData.goals.steps,
      calories: mockUserData.goals.calories,
      activeMinutes: mockUserData.goals.activeMinutes,
      weight: mockUserData.goals.weight.toString(),
    })
  }, [])

  const handleChange = (field, value) => {
    setGoals((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Show success message
      alert("Goals saved successfully!")
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
          <h1 className="text-lg font-semibold">My Fitness Goals</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-content">
        <form onSubmit={handleSubmit}>
          <Card className="shadow-sm mb-6">
            <CardHeader className="flex flex-row items-center">
              <Target className="h-5 w-5 text-primary mr-2" />
              <CardTitle className="text-lg">Daily Steps Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="steps">Target Steps</Label>
                  <span className="font-medium">{goals.steps.toLocaleString()}</span>
                </div>
                <Slider
                  id="steps"
                  min={1000}
                  max={20000}
                  step={500}
                  value={[goals.steps]}
                  onValueChange={(value) => handleChange("steps", value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1,000</span>
                  <span>20,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm mb-6">
            <CardHeader className="flex flex-row items-center">
              <Flame className="h-5 w-5 text-orange-500 mr-2" />
              <CardTitle className="text-lg">Daily Calories Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="calories">Target Calories</Label>
                  <span className="font-medium">{goals.calories}</span>
                </div>
                <Slider
                  id="calories"
                  min={100}
                  max={1000}
                  step={50}
                  value={[goals.calories]}
                  onValueChange={(value) => handleChange("calories", value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>100</span>
                  <span>1,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm mb-6">
            <CardHeader className="flex flex-row items-center">
              <Clock className="h-5 w-5 text-green-500 mr-2" />
              <CardTitle className="text-lg">Active Minutes Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="activeMinutes">Target Minutes</Label>
                  <span className="font-medium">{goals.activeMinutes}</span>
                </div>
                <Slider
                  id="activeMinutes"
                  min={15}
                  max={120}
                  step={5}
                  value={[goals.activeMinutes]}
                  onValueChange={(value) => handleChange("activeMinutes", value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>15 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm mb-6">
            <CardHeader className="flex flex-row items-center">
              <Weight className="h-5 w-5 text-purple-500 mr-2" />
              <CardTitle className="text-lg">Target Weight</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="weight">Target Weight (kg)</Label>
                </div>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="Enter your target weight"
                  value={goals.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

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
                Save Goals
              </>
            )}
          </Button>
        </form>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
