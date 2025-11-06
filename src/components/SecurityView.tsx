import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Lock,
  Key,
  Eye,
  FileCheck,
  ShieldAlert,
  Activity
} from "lucide-react";

export function SecurityView() {
  const securityScore = 87;

  const securityMetrics = [
    {
      label: "Critical Issues",
      value: "3",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      label: "High Priority",
      value: "8",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      label: "Medium Priority",
      value: "15",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      label: "Compliant Resources",
      value: "89%",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const vulnerabilities = [
    {
      id: "1",
      title: "S3 Bucket Publicly Accessible",
      severity: "critical",
      resource: "production-data-bucket",
      description: "S3 bucket has public read access enabled",
      remediation: "Disable public access and configure bucket policy"
    },
    {
      id: "2",
      title: "Security Group Allows 0.0.0.0/0 SSH Access",
      severity: "critical",
      resource: "sg-prod-web-servers",
      description: "Security group allows SSH from any IP address",
      remediation: "Restrict SSH access to specific IP ranges"
    },
    {
      id: "3",
      title: "RDS Instance Not Encrypted",
      severity: "high",
      resource: "production-db-1",
      description: "Database instance does not have encryption enabled",
      remediation: "Enable encryption at rest using AWS KMS"
    },
    {
      id: "4",
      title: "IAM User with Root Access",
      severity: "critical",
      resource: "admin-user-1",
      description: "IAM user has AdministratorAccess policy attached",
      remediation: "Apply principle of least privilege"
    },
    {
      id: "5",
      title: "CloudTrail Logging Disabled",
      severity: "high",
      resource: "us-east-1 region",
      description: "CloudTrail is not enabled for audit logging",
      remediation: "Enable CloudTrail for all regions"
    }
  ];

  const complianceStatus = [
    { name: "PCI DSS", score: 92, status: "compliant" },
    { name: "HIPAA", score: 88, status: "compliant" },
    { name: "SOC 2", score: 85, status: "compliant" },
    { name: "GDPR", score: 78, status: "needs-attention" },
    { name: "ISO 27001", score: 90, status: "compliant" }
  ];

  const recentActivity = [
    {
      action: "MFA enabled for IAM user",
      user: "john.doe@company.com",
      time: "5 mins ago",
      type: "success"
    },
    {
      action: "Failed login attempt detected",
      user: "Unknown (192.168.1.100)",
      time: "12 mins ago",
      type: "warning"
    },
    {
      action: "Security group rule modified",
      user: "admin@company.com",
      time: "1 hour ago",
      type: "info"
    },
    {
      action: "Encryption enabled on S3 bucket",
      user: "system",
      time: "2 hours ago",
      type: "success"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Security Score */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2>Security Posture Score</h2>
                <p className="text-sm text-gray-600">Overall security health of your infrastructure</p>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <div className="text-6xl">{securityScore}</div>
              <div className="mb-2">
                <Badge className="bg-green-100 text-green-800">Good</Badge>
              </div>
            </div>
            <Progress value={securityScore} className="h-3 mt-4" />
          </div>
        </div>
      </Card>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <h3 className="text-3xl mb-2">{metric.value}</h3>
                </div>
                <div className={`p-3 ${metric.bgColor} rounded-lg`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="vulnerabilities" className="w-full">
        <TabsList>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="activity">Security Activity</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3>Active Security Issues</h3>
              <Button variant="outline" size="sm">Scan All Resources</Button>
            </div>
            <div className="space-y-4">
              {vulnerabilities.map((vuln) => (
                <div key={vuln.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4>{vuln.title}</h4>
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{vuln.description}</p>
                      <p className="text-sm text-blue-600">Resource: {vuln.resource}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t">
                    <div className="flex items-center gap-2 flex-1">
                      <FileCheck className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{vuln.remediation}</span>
                    </div>
                    <Button size="sm" variant="outline">Remediate</Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Compliance Standards</h3>
            <div className="space-y-6">
              {complianceStatus.map((compliance, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span>{compliance.name}</span>
                      <Badge variant={compliance.status === "compliant" ? "default" : "secondary"}>
                        {compliance.status === "compliant" ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Compliant
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Needs Attention
                          </div>
                        )}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{compliance.score}%</div>
                    </div>
                  </div>
                  <Progress value={compliance.score} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Compliance Controls</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Data Encryption at Rest</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Multi-Factor Authentication</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">Access Logging</span>
                  </div>
                  <Badge variant="outline" className="text-orange-600">Partial</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Audit Reports</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  <span>PCI DSS Audit Report</span>
                  <span className="text-xs text-gray-600">Q4 2025</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>HIPAA Assessment</span>
                  <span className="text-xs text-gray-600">Nov 2025</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>SOC 2 Type II Report</span>
                  <span className="text-xs text-gray-600">Oct 2025</span>
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Recent Security Events</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                  <div className={`p-2 rounded-lg ${
                    activity.type === "success" ? "bg-green-100" :
                    activity.type === "warning" ? "bg-orange-100" :
                    "bg-blue-100"
                  }`}>
                    <Activity className={`w-4 h-4 ${
                      activity.type === "success" ? "text-green-600" :
                      activity.type === "warning" ? "text-orange-600" :
                      "text-blue-600"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1">{activity.action}</div>
                    <div className="text-xs text-gray-600">By: {activity.user}</div>
                    <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3>IAM Policies</h3>
              <Button size="sm">Create Policy</Button>
            </div>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Key className="w-4 h-4 text-gray-400" />
                    <span>Admin Access Policy</span>
                  </div>
                  <Badge variant="secondary">5 users</Badge>
                </div>
                <p className="text-sm text-gray-600">Full administrative access to all resources</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span>Read-Only Policy</span>
                  </div>
                  <Badge variant="secondary">23 users</Badge>
                </div>
                <p className="text-sm text-gray-600">Read-only access to all resources</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span>Developer Policy</span>
                  </div>
                  <Badge variant="secondary">15 users</Badge>
                </div>
                <p className="text-sm text-gray-600">Access to development resources only</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6">Security Best Practices</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm mb-1">MFA enabled for all users</div>
                  <div className="text-xs text-gray-600">All IAM users have multi-factor authentication</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm mb-1">Password rotation policy needed</div>
                  <div className="text-xs text-gray-600">Configure automatic password rotation every 90 days</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm mb-1">Encryption enabled by default</div>
                  <div className="text-xs text-gray-600">All new resources are encrypted at creation</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
