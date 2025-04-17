import { ArrowDown, ArrowUp, Minus } from "lucide-react"

export function TrendIndicator({ direction, percentage }) {
  if (direction === "up") {
    return (
      <div className="flex items-center text-green-500 text-xs">
        <ArrowUp className="h-3 w-3 mr-1" />
        <span>{percentage}%</span>
      </div>
    )
  } else if (direction === "down") {
    return (
      <div className="flex items-center text-red-500 text-xs">
        <ArrowDown className="h-3 w-3 mr-1" />
        <span>{percentage}%</span>
      </div>
    )
  } else {
    return (
      <div className="flex items-center text-gray-500 text-xs">
        <Minus className="h-3 w-3 mr-1" />
        <span>0%</span>
      </div>
    )
  }
}
