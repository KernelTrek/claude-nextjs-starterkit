import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Activity, Clock } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      icon: Users,
      title: "Total Users",
      value: "12,345",
      change: "+2.5%",
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      color: "text-green-500",
    },
    {
      icon: Activity,
      title: "Active Sessions",
      value: "1,234",
      change: "-4.3%",
      color: "text-purple-500",
    },
    {
      icon: Clock,
      title: "Avg. Session Time",
      value: "2m 45s",
      change: "+5.2%",
      color: "text-orange-500",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a summary of your account performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest activities and updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Activity {i}</p>
                    <p className="text-xs text-muted-foreground">
                      2 hours ago
                    </p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Navigate to key sections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/dashboard/users"
              className="block text-sm text-primary hover:underline"
            >
              → View Users
            </a>
            <a
              href="/dashboard/analytics"
              className="block text-sm text-primary hover:underline"
            >
              → View Analytics
            </a>
            <a
              href="/dashboard/settings"
              className="block text-sm text-primary hover:underline"
            >
              → View Settings
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
