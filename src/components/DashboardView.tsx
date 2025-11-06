import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Server, 
  Database, 
  DollarSign, 
  AlertTriangle,
  CheckCircle2,
  Activity,
  Clock,
  Cpu,
  HardDrive,
  Network
} from "lucide-react";

export function DashboardView() {
  const metrics = [
    {
      label: "Total Resources",
      value: "142",
      change: "+12%",
      trend: "up",
      icon: Server,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      label: "Monthly Cost",
      value: "$4,283",
      change: "-8%",
      trend: "down",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      label: "Active Pipelines",
      value: "23",
      change: "+5",
      trend: "up",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      label: "Security Alerts",
      value: "3",
      change: "-2",
      trend: "down",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const recentDeployments = [
    {
      id: "1",
      name: "web-app-prod",
      status: "success",
      time: "2 mins ago",
      env: "Production"
    },
    {
      id: "2",
      name: "api-service-staging",
      status: "running",
      time: "5 mins ago",
      env: "Staging"
    },
    {
      id: "3",
      name: "microservice-dev",
      status: "success",
      time: "15 mins ago",
      env: "Development"
    }
  ];

  const resourceUsage = [
    { name: "EC2 Instances", used: 45, total: 50, percentage: 90 },
    { name: "S3 Storage", used: 2.3, total: 5, percentage: 46, unit: "TB" },
    { name: "RDS Databases", used: 8, total: 10, percentage: 80 },
    { name: "Lambda Functions", used: 127, total: 200, percentage: 64 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <h3 className="text-3xl mb-2">{metric.value}</h3>
                  <div className="flex items-center gap-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-sm text-green-600">{metric.change}</span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 ${metric.bgColor} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Usage */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="mb-6">Resource Usage</h3>
          <div className="space-y-6">
            {resourceUsage.map((resource, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{resource.name}</span>
                  <span className="text-sm text-gray-600">
                    {resource.used}{resource.unit || ""} / {resource.total}{resource.unit || ""}
                  </span>
                </div>
                <Progress value={resource.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Deployments */}
        <Card className="p-6">
          <h3 className="mb-4">Recent Deployments</h3>
          <div className="space-y-4">
            {recentDeployments.map((deployment) => (
              <div key={deployment.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className={`mt-1 p-1.5 rounded-full ${
                  deployment.status === "success" 
                    ? "bg-green-100" 
                    : "bg-blue-100"
                }`}>
                  {deployment.status === "success" ? (
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                  ) : (
                    <Clock className="w-3 h-3 text-blue-600 animate-spin" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{deployment.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {deployment.env}
                    </Badge>
                    <span className="text-xs text-gray-500">{deployment.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" size="sm">
            View All Deployments
          </Button>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Cpu className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-sm">CPU Utilization</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">64%</span>
              <Badge variant="secondary">Normal</Badge>
            </div>
            <Progress value={64} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HardDrive className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-sm">Memory Usage</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">52%</span>
              <Badge variant="secondary">Normal</Badge>
            </div>
            <Progress value={52} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Network className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-sm">Network Traffic</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">1.2 GB/s</span>
              <Badge variant="secondary">Normal</Badge>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        </Card>
      </div>
    </div>
  );
}
