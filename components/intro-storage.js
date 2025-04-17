"use client"

// Helper functions to manage intro screen state
export const hasSeenIntro = () => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("hasSeenIntro") === "true"
}

export const markIntroAsSeen = () => {
  if (typeof window === "undefined") return
  localStorage.setItem("hasSeenIntro", "true")
}
