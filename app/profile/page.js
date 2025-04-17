"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { BottomNav } from "@/components/bottom-nav"
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  LogOut,
  Bell,
  Moon,
  Ruler,
  Camera,
  Settings,
  Shield,
  HelpCircle,
} from "lucide-react"
import { mockUserData } from "@/lib/utils"
import { getCurrentUser } from "../../action/auth"

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    metricUnits: true,
  })

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


  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/login")
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const toggleSetting = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  if (isLoading) {
    return (
      <div className="app-container flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">My Profile</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleEditMode}
            className={`${editMode ? "bg-primary text-primary-foreground" : ""}`}
          >
            {editMode ? "Done" : "Edit"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-content">
        {/* Profile Card */}
        <Card className="shadow-sm mb-6">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary">
                <AvatarImage src={userData.avatar || "/israt.jpg"} alt={userData.name} />
                <AvatarFallback className="text-2xl">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {editMode && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <h2 className="text-xl font-bold mt-4">{userData.name}</h2>
            <p className="text-muted-foreground">{userData.email}</p>

            {editMode && (
              <Button variant="outline" className="mt-4">
                Change Profile Picture
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="name" defaultValue={userData.name} className="pl-10" readOnly={!editMode} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" defaultValue={userData.email} className="pl-10" readOnly={!editMode} />
              </div>
            </div>
           
            {editMode && <Button className="w-full bg-primary hover:bg-primary/90">Save Changes</Button>}
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-3 text-muted-foreground" />
                <Label htmlFor="notifications">Push Notifications</Label>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={() => toggleSetting("notifications")}
                disabled={!editMode}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Moon className="h-5 w-5 mr-3 text-muted-foreground" />
                <Label htmlFor="darkMode">Dark Mode</Label>
              </div>
              <Switch
                id="darkMode"
                checked={settings.darkMode}
                onCheckedChange={() => toggleSetting("darkMode")}
                disabled={!editMode}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Ruler className="h-5 w-5 mr-3 text-muted-foreground" />
                <Label htmlFor="units">Use Metric Units</Label>
              </div>
              <Switch
                id="units"
                checked={settings.metricUnits}
                onCheckedChange={() => toggleSetting("metricUnits")}
                disabled={!editMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Options */}
        <Card className="shadow-sm mb-6">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto rounded-none border-b"
              onClick={() => router.push("/privacy")}
            >
              <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
              Privacy & Security
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto rounded-none border-b"
              onClick={() => router.push("/help")}
            >
              <HelpCircle className="h-5 w-5 mr-3 text-muted-foreground" />
              Help & Support
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto rounded-none text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mb-4">Version 1.0.0</p>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
