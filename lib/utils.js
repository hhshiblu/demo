import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Mock fitness data for the app
export const mockUserData = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg",
  stats: {
    steps: 8439,
    calories: 437,
    activeMinutes: 67,
    heartRate: 72,
  },
  goals: {
    steps: 10000,
    calories: 500,
    activeMinutes: 60,
    weight: 75,
  },
  history: {
    steps: [
      { day: "Mon", steps: 7500 },
      { day: "Tue", steps: 9200 },
      { day: "Wed", steps: 6800 },
      { day: "Thu", steps: 8400 },
      { day: "Fri", steps: 10200 },
      { day: "Sat", steps: 11500 },
      { day: "Sun", steps: 8439 },
    ],
    calories: [
      { day: "Mon", calories: 320 },
      { day: "Tue", calories: 400 },
      { day: "Wed", calories: 290 },
      { day: "Thu", calories: 380 },
      { day: "Fri", calories: 450 },
      { day: "Sat", calories: 520 },
      { day: "Sun", calories: 437 },
    ],
    activeMinutes: [
      { day: "Mon", minutes: 45 },
      { day: "Tue", minutes: 60 },
      { day: "Wed", minutes: 40 },
      { day: "Thu", minutes: 55 },
      { day: "Fri", minutes: 70 },
      { day: "Sat", minutes: 85 },
      { day: "Sun", minutes: 67 },
    ],
    workoutTypes: [
      { name: "Running", value: 35 },
      { name: "Walking", value: 25 },
      { name: "Cycling", value: 20 },
      { name: "Strength", value: 15 },
      { name: "Yoga", value: 5 },
    ],
  },
}

// Helper function to format numbers with commas
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Helper function to calculate progress percentage
export function calculateProgress(current, goal) {
  return Math.min(Math.round((current / goal) * 100), 100)
}

// Helper function to get trend indicator
export function getTrend(current, previous) {
  if (current > previous) return { direction: "up", percentage: Math.round(((current - previous) / previous) * 100) }
  if (current < previous) return { direction: "down", percentage: Math.round(((previous - current) / previous) * 100) }
  return { direction: "same", percentage: 0 }
}
