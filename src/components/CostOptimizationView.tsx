import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  PieChart,
  Calendar
} from "lucide-react";

export function CostOptimizationView() {
  const costBreakdown = [
    { service: "EC2", cost: 1845, percentage: 43, trend: "up", change: 5 },
    { service: "S3", cost: 892, percentage: 21, trend: "down", change: -3 },
    { service: "RDS", cost: 756, percentage: 18, trend: "up", change: 2 },
    { service: "Lambda", cost: 420, percentage: 10, trend: "down", change: -8 },
    { service: "CloudFront", cost: 370, percentage: 8, trend: "up", change: 12 }
  ];

  const recommendations = [
    {
      id: "1",
      title: "Upgrade to Reserved Instances",
      description: "Switch 5 EC2 instances to Reserved Instances for 1 year commitment",
      savings: "$2,340/year",
      impact: "high",
      effort: "low"
    },
    {
      id: "2",
      title: "Enable S3 Intelligent-Tiering",
      description: "Automatically move objects to cost-effective access tiers",
      savings: "$450/month",
      impact: "medium",
      effort: "low"
    },
    {
      id: "3",
      title: "Right-size EC2 Instances",
      description: "3 instances are underutilized and can be downsized",
      savings: "$320/month",
      impact: "medium",
      effort: "medium"
    },
    {
      id: "4",
      title: "Delete Unattached EBS Volumes",
      description: "8 EBS volumes are not attached to any instance",
      savings: "$180/month",
      impact: "low",
      effort: "low"
    },
    {
      id: "5",
      title: "Use Spot Instances for Dev/Test",
      description: "Migrate non-critical workloads to Spot instances",
      savings: "$890/month",
      impact: "high",
      effort: "high"
    }
  ];

  const budgetAlerts = [
    { name: "Production Environment", used: 3200, budget: 4000, percentage: 80 },
    { name: "Development Environment", used: 750, budget: 1000, percentage: 75 },
    { name: "Data Storage", used: 1100, budget: 1500, percentage: 73 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Cost Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-sm">Current Month</h3>
          </div>
          <div className="text-3xl mb-2">$4,283</div>
          <div className="flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">-8% vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-sm">Projected Month</h3>
          </div>
          <div className="text-3xl mb-2">$5,120</div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-600">+19% estimated</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingDown className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-sm">Potential Savings</h3>
          </div>
          <div className="text-3xl mb-2">$1,240</div>
          <div className="text-sm text-gray-600">per month available</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-sm">Budget Status</h3>
          </div>
          <div className="text-3xl mb-2">80%</div>
          <div className="text-sm text-gray-600">of monthly budget</div>
        </Card>
      </div>

      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="budgets">Budget Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Service Cost Breakdown</h3>
            <div className="space-y-4">
              {costBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span>{item.service}</span>
                      <div className="flex items-center gap-1">
                        {item.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-orange-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-green-600" />
                        )}
                        <span className={`text-xs ${item.trend === "up" ? "text-orange-600" : "text-green-600"}`}>
                          {item.change > 0 ? "+" : ""}{item.change}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div>${item.cost.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">{item.percentage}% of total</div>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Top Cost Drivers</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">EC2 m5.xlarge instances</span>
                  <span className="text-sm">$890/mo</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">S3 Standard Storage</span>
                  <span className="text-sm">$560/mo</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">RDS db.r5.large</span>
                  <span className="text-sm">$445/mo</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Cost by Environment</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm">Production</div>
                    <div className="text-xs text-gray-600">65% of total</div>
                  </div>
                  <span className="text-sm">$2,784</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm">Staging</div>
                    <div className="text-xs text-gray-600">25% of total</div>
                  </div>
                  <span className="text-sm">$1,071</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm">Development</div>
                    <div className="text-xs text-gray-600">10% of total</div>
                  </div>
                  <span className="text-sm">$428</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg mt-1">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="mb-1">{rec.title}</h3>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600">{rec.savings}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <Badge variant={rec.impact === "high" ? "default" : rec.impact === "medium" ? "secondary" : "outline"}>
                      {rec.impact} impact
                    </Badge>
                    <Badge variant="outline">
                      {rec.effort} effort
                    </Badge>
                    <div className="flex-1"></div>
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="budgets" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Budget Alerts</h3>
            <div className="space-y-6">
              {budgetAlerts.map((budget, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span>{budget.name}</span>
                    <div className="text-right">
                      <div className="text-sm">${budget.used} / ${budget.budget}</div>
                      <div className="text-xs text-gray-600">{budget.percentage}% used</div>
                    </div>
                  </div>
                  <Progress value={budget.percentage} className="h-2" />
                  {budget.percentage >= 80 && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>Approaching budget limit</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3>Cost Anomalies</h3>
              <Button variant="outline" size="sm">Configure Alerts</Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm mb-1">Unusual EC2 usage detected</div>
                  <div className="text-xs text-gray-600">2 new t3.large instances running in us-west-2</div>
                  <div className="text-xs text-gray-600 mt-1">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm mb-1">Cost optimization applied</div>
                  <div className="text-xs text-gray-600">S3 lifecycle policy saved $120 this week</div>
                  <div className="text-xs text-gray-600 mt-1">1 day ago</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
