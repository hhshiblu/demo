"use client"

import { useEffect, useState } from "react"

export function ProgressRing({ progress, size = 60, strokeWidth = 4, color = "#4A90E2" }) {
  const [offset, setOffset] = useState(0)

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference
    setOffset(progressOffset)
  }, [progress, circumference])

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
      {/* Background circle */}
      <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="#e6e6e6" strokeWidth={strokeWidth} />

      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />

      {/* Text in the middle */}
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill={color}
        className="transform rotate-90"
      >
        {`${progress}%`}
      </text>
    </svg>
  )
}
