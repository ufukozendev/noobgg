import { Shield, Medal, Award, Star, Diamond } from "lucide-react"

// Helper function to get rank icon based on index
export const getRankIcon = (index: number) => {
  // Using Lucide icons as placeholders for rank icons
  const icons = [
    <Shield key="iron" className="h-5 w-5 text-slate-400" />,
    <Shield key="bronze" className="h-5 w-5 text-amber-700" />,
    <Medal key="silver" className="h-5 w-5 text-slate-300" />,
    <Medal key="gold" className="h-5 w-5 text-yellow-400" />,
    <Star key="platinum" className="h-5 w-5 text-teal-400" />,
    <Diamond key="diamond" className="h-5 w-5 text-blue-400" />,
  ]

  return icons[index] || <Award className="h-5 w-5 text-slate-400" />
}

export const formatTimeAgo = (date: Date): string => {
  const hours = Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60))
  return `${hours}h ago`
}
