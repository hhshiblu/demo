"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { mockUserData } from "@/lib/utils"

// Colors for charts
const COLORS = ["#4A90E2", "#FF8042", "#00C49F", "#FFBB28", "#FF6B6B"]

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm text-xs">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-[#4A90E2]">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

export function StepsChart() {
  const data = mockUserData.history.steps

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="steps"
          name="Steps"
          stroke="#4A90E2"
          strokeWidth={2}
          dot={{ r: 3, fill: "#4A90E2" }}
          activeDot={{ r: 5, fill: "#4A90E2" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function CaloriesChart() {
  const data = mockUserData.history.calories

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="calories"
          name="Calories"
          fill="#FF8042"
          radius={[4, 4, 0, 0]}
          barSize={20}
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function ActiveMinutesChart() {
  const data = mockUserData.history.activeMinutes

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="minutes"
          name="Minutes"
          stroke="#00C49F"
          fill="#00C49F"
          fillOpacity={0.3}
          activeDot={{ r: 5, fill: "#00C49F" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function WorkoutTypesChart() {
  const data = mockUserData.history.workoutTypes

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={70}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
