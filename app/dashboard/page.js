"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Activity, Flame, Clock, Heart, Plus, ChevronDown, ChevronRight, Edit, BarChart2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { mockUserData } from "@/lib/utils"
import { getCurrentUser } from "@/action/auth"

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  // State for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    summary: false,
    steps: false,
    calories: false,
    activity: false,
  })

  // State for edit mode
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          setUserData(user)

          // Fetch user goals
          // const goalsResult = await getUserGoals()
          // if (goalsResult.success) {
          //   setUserGoals(goalsResult.goals)
          // }

          // Fetch user risk scores
          // const riskScoresResult = await getUserRiskScores()
          // if (riskScoresResult.success) {
          //   setUserRiskScores(riskScoresResult.riskScores)
          // }
        } else {
          // If no user is found, redirect to login
          router.push("/login")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router])


  const handleNewAssessment = () => {
    router.push("/assessment")
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleProfileClick = () => {
    router.push("/profile")
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  if (isLoading) {
    return (
      <div className="app-container flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading your fitness data...</p>
      </div>
    )
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">Hello,{userData?.name?userData?.name:"israt shifa"}</h1>
            <p className="text-sm text-muted-foreground">Let's check your progress</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleEditMode}
              className={`${editMode ? "bg-primary text-primary-foreground" : ""}`}
            >
              <Edit className="h-4 w-4 mr-1" />
              {editMode ? "Done" : "Edit"}
            </Button>
            <Avatar className="border-2 border-primary cursor-pointer" onClick={handleProfileClick}>
              <AvatarImage src={"/israt.jpg"} alt={userData?.name} />
              <AvatarFallback>
              {userData?.name?userData?.name:"israt shifa"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <></>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-content">
        {/* Summary Section - Collapsible */}
        <Card className="shadow-sm mb-4">
          <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("summary")}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-medium flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Today's Summary
              </CardTitle>
              {expandedSections.summary ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </CardHeader>

          {!expandedSections.summary && (
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                  <Activity className="h-6 w-6 text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Steps</p>
                  <p className="text-xl font-bold">1200</p>
                  {editMode && (
                    <Button variant="ghost" size="sm" className="mt-1 h-7 text-xs">
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  )}
                </div>

                <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                  <Flame className="h-6 w-6 text-orange-500 mb-1" />
                  <p className="text-xs text-muted-foreground">Calories</p>
                  <p className="text-xl font-bold">1200</p>
                  {editMode && (
                    <Button variant="ghost" size="sm" className="mt-1 h-7 text-xs">
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  )}
                </div>

                <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                  <Clock className="h-6 w-6 text-green-500 mb-1" />
                  <p className="text-xs text-muted-foreground">Active Minutes</p>
                  <p className="text-xl font-bold">150</p>
                  {editMode && (
                    <Button variant="ghost" size="sm" className="mt-1 h-7 text-xs">
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  )}
                </div>

                <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                  <Heart className="h-6 w-6 text-red-500 mb-1" />
                  <p className="text-xs text-muted-foreground">Heart Rate</p>
                  <p className="text-xl font-bold">70 bpm</p>
                  {editMode && (
                    <Button variant="ghost" size="sm" className="mt-1 h-7 text-xs">
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Steps Section - Collapsible */}
        <Card className="shadow-sm mb-4">
          <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("steps")}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-medium flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Steps Tracking
              </CardTitle>
              {expandedSections.steps ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </CardHeader>

          {expandedSections.steps && (
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Daily Goal</p>
                    <p className="text-sm text-muted-foreground">10,000 steps</p>
                  </div>
                  {editMode && (
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit Goal
                    </Button>
                  )}
                </div>

                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${Math.min(1200 * 100, 100)}%` }}
                  ></div>
                </div>

                <p className="text-sm text-center">
                  1200/ 10,000 steps
                  <span className="text-primary ml-2">({Math.round((1200 / 10000) * 100)}%)</span>
                </p>

                <div className="pt-2">
                  <p className="font-medium mb-2">Weekly Overview</p>
                  <div className="flex justify-between items-end h-32 pt-4">
                    {userData?.history?.steps?.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-8 bg-primary rounded-t-md ${index === 6 ? "bg-primary" : "bg-primary/60"}`}
                          style={{ height: `${(day.steps / 12000) * 100}px` }}
                        ></div>
                        <p className="text-xs mt-1">{day.day}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Calories Section - Collapsible */}
        <Card className="shadow-sm mb-4">
          <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("calories")}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-medium flex items-center">
                <Flame className="h-5 w-5 mr-2 text-orange-500" />
                Calories Burned
              </CardTitle>
              {expandedSections.calories ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </CardHeader>

          {expandedSections.calories && (
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Daily Goal</p>
                    <p className="text-sm text-muted-foreground">500 calories</p>
                  </div>
                  {editMode && (
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit Goal
                    </Button>
                  )}
                </div>

                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-orange-500 h-2.5 rounded-full"
                    style={{ width: `${Math.min((userData?.stats?.calories / 500) * 100, 100)}900%` }}
                  ></div>
                </div>

                <p className="text-sm text-center">
                  {userData?.stats?.calories} / 500 calories
                  <span className="text-orange-500 ml-2">({Math.round((userData?.stats?.calories / 500) * 100)}%)</span>
                </p>

                <div className="pt-2">
                  <p className="font-medium mb-2">Weekly Overview</p>
                  <div className="flex justify-between items-end h-32 pt-4">
                    {userData?.history?.calories.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-8 bg-orange-500 rounded-t-md ${index === 6 ? "bg-orange-500" : "bg-orange-500/60"}`}
                          style={{ height: `${(day.calories / 600) * 100}px` }}
                        ></div>
                        <p className="text-xs mt-1">{day.day}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Activity Section - Collapsible */}
        <Card className="shadow-sm mb-4">
          <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("activity")}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-medium flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-green-500" />
                Activity Breakdown
              </CardTitle>
              {expandedSections.activity ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </CardHeader>

          {expandedSections.activity && (
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Recent Activities</p>
                  {editMode && (
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Activity
                    </Button>
                  )}
                </div>

                {/* Activity List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary p-2 rounded-full mr-3">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Running</p>
                        <p className="text-xs text-muted-foreground">Today, 8:30 AM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">45 min</p>
                      <p className="text-xs text-muted-foreground">320 cal</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-green-500 p-2 rounded-full mr-3">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Walking</p>
                        <p className="text-xs text-muted-foreground">Yesterday, 6:15 PM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">30 min</p>
                      <p className="text-xs text-muted-foreground">120 cal</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-500 p-2 rounded-full mr-3">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Yoga</p>
                        <p className="text-xs text-muted-foreground">2 days ago, 7:00 AM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">60 min</p>
                      <p className="text-xs text-muted-foreground">180 cal</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </main>

      {/* Floating Action Button */}
      <Button
        onClick={handleNewAssessment}
        className="rounded-full w-14 h-14 fixed bottom-20 right-4 shadow-lg bg-primary hover:bg-primary/90 z-10 flex items-center justify-center"
        style={{ maxWidth: "430px", transform: "translateX(-50%)", left: "calc(50% + 180px)" }}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
