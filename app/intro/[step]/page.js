"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BarChart2, Target } from "lucide-react"

export default function IntroPage({ params }) {
  const router = useRouter()
  const step = Number.parseInt(params.step)

  const handleNext = () => {
    if (step < 3) {
      router.push(`/intro/${step + 1}`)
    } else {
      // After the last intro screen, go to login
      router.push("/login")
    }
  }

  const handleSkip = () => {
    // Skip directly to login
    router.push("/login")
  }

  const introContent = {
    1: {
      title: "Welcome to FitTrack — Your Personal Fitness Companion",
      description: "Track your fitness journey with our comprehensive tools and insights.",
      icon: <Activity className="w-24 h-24 text-primary mx-auto mb-6" />,
      buttonText: "Next",
    },
    2: {
      title: "Track Your Progress with Real-Time Data",
      description: "Monitor your steps, calories, heart rate and more in real-time.",
      icon: <BarChart2 className="w-24 h-24 text-primary mx-auto mb-6" />,
      buttonText: "Next",
    },
    3: {
      title: "Achieve Your Goals Faster",
      description: "Set personalized goals and track your progress to achieve results faster.",
      icon: <Target className="w-24 h-24 text-primary mx-auto mb-6" />,
      buttonText: "Get Started",
    },
  }

  const content = introContent[step]

  return (
    <div className="app-container flex items-center justify-center p-4">
      <Card className="w-full">
        <CardHeader className="pt-10">
          {content.icon}
          <CardTitle className="text-2xl font-bold text-center">{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{content.description}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-center pb-6 gap-3">
          <Button onClick={handleNext} className="w-full max-w-xs bg-primary hover:bg-primary/90">
            {content.buttonText}
          </Button>

          {/* Skip button on all intro screens */}
          <Button variant="ghost" onClick={handleSkip} className="text-sm text-muted-foreground hover:text-primary">
            Skip right now
          </Button>
        </CardFooter>
        <div className="flex justify-center pb-6 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      </Card>
    </div>
  )
}
