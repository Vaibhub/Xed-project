import { Card } from "@/components/ui/card"
import { BarChart3, Users, FileText, Calendar } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { label: "University Logos", value: "12", icon: FileText, color: "bg-blue-100 text-blue-600" },
    { label: "Testimonials", value: "8", icon: Users, color: "bg-green-100 text-green-600" },
    { label: "Events", value: "5", icon: Calendar, color: "bg-purple-100 text-purple-600" },
    { label: "Webinars", value: "15", icon: BarChart3, color: "bg-orange-100 text-orange-600" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back! Here's an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
        <div className="text-slate-600">
          <p className="text-sm">No recent activities yet. Start managing your content!</p>
        </div>
      </Card>
    </div>
  )
}
