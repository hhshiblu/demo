"use client"

import { useRouter } from "next/navigation"
import { LayoutDashboard, ClipboardCheck, Target, User } from "lucide-react"

export function BottomNav({ activeTab, setActiveTab }) {
  const router = useRouter()

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    router.push(`/${tab === "dashboard" ? "dashboard" : tab}`)
  }

  return (
    <div className="app-bottom-nav">
      <button
        onClick={() => handleTabChange("dashboard")}
        className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
      >
        <LayoutDashboard className="h-5 w-5" />
        <span className="nav-item-label">Dashboard</span>
      </button>

      <button
        onClick={() => handleTabChange("assessment")}
        className={`nav-item ${activeTab === "assessment" ? "active" : ""}`}
      >
        <ClipboardCheck className="h-5 w-5" />
        <span className="nav-item-label">Assessment</span>
      </button>

      <button onClick={() => handleTabChange("goals")} className={`nav-item ${activeTab === "goals" ? "active" : ""}`}>
        <Target className="h-5 w-5" />
        <span className="nav-item-label">Goals</span>
      </button>

      <button
        onClick={() => handleTabChange("profile")}
        className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
      >
        <User className="h-5 w-5" />
        <span className="nav-item-label">Profile</span>
      </button>
    </div>
  )
}
