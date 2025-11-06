import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Zap, Plus, Settings, Trash2, Play, Pause, Calendar, Bell } from "lucide-react";

interface Automation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  lastRun: string;
  executions: number;
}

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Auto-Scale EC2 on High CPU",
    trigger: "CPU > 80%",
    action: "Scale up EC2 instances",
    enabled: true,
    lastRun: "1 hour ago",
    executions: 234
  },
  {
    id: "2",
    name: "Backup Database Daily",
    trigger: "Daily at 2:00 AM",
    action: "Create RDS snapshot",
    enabled: true,
    lastRun: "6 hours ago",
    executions: 89
  },
  {
    id: "3",
    name: "Clean Old S3 Objects",
    trigger: "Weekly on Sunday",
    action: "Delete objects older than 90 days",
    enabled: false,
    lastRun: "7 days ago",
    executions: 12
  }
];

export function AutomationView() {
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleAutomation = (id: string) => {
    setAutomations(automations.map(auto => 
      auto.id === id ? { ...auto, enabled: !auto.enabled } : auto
    ));
  };

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2>Create Automation Rule</h2>
              <p className="text-gray-600">Automate your infrastructure management</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setShowCreateForm(false)}>
            Cancel
          </Button>
        </div>

        <Tabs defaultValue="trigger" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trigger">Trigger</TabsTrigger>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="trigger" className="space-y-4">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="automation-name">Automation Name *</Label>
                <Input id="automation-name" placeholder="My Automation Rule" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what this automation does..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trigger-type">Trigger Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="metric">CloudWatch Metric</SelectItem>
                    <SelectItem value="event">AWS Event</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule Expression</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Every hour</SelectItem>
                    <SelectItem value="daily">Daily at midnight</SelectItem>
                    <SelectItem value="weekly">Weekly on Monday</SelectItem>
                    <SelectItem value="monthly">Monthly on 1st</SelectItem>
                    <SelectItem value="custom">Custom (cron expression)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cron">Cron Expression</Label>
                <Input id="cron" placeholder="0 0 * * *" />
                <p className="text-xs text-gray-500">Use cron syntax for custom schedules</p>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                    <SelectItem value="gmt">GMT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="conditions" className="space-y-4">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resource-type">Resource Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ec2">EC2 Instance</SelectItem>
                    <SelectItem value="rds">RDS Database</SelectItem>
                    <SelectItem value="s3">S3 Bucket</SelectItem>
                    <SelectItem value="lambda">Lambda Function</SelectItem>
                    <SelectItem value="ecs">ECS Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource-filter">Resource Filter</Label>
                <Input id="resource-filter" placeholder="e.g., tag:environment=production" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <Label>Conditions</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Condition
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Select defaultValue="cpu">
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cpu">CPU Utilization</SelectItem>
                        <SelectItem value="memory">Memory Utilization</SelectItem>
                        <SelectItem value="disk">Disk Usage</SelectItem>
                        <SelectItem value="network">Network Traffic</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="gt">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gt">Greater than</SelectItem>
                        <SelectItem value="lt">Less than</SelectItem>
                        <SelectItem value="eq">Equal to</SelectItem>
                        <SelectItem value="gte">Greater or equal</SelectItem>
                        <SelectItem value="lte">Less or equal</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input type="number" placeholder="80" className="w-24" />
                    <span className="flex items-center text-sm text-gray-600">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition-duration">Condition Duration</Label>
                <div className="flex gap-2">
                  <Input id="condition-duration" type="number" defaultValue="5" className="w-24" />
                  <Select defaultValue="minutes">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seconds">Seconds</SelectItem>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-gray-500">How long the condition must be true before triggering</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="action-type">Action Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ec2-start">Start EC2 Instance</SelectItem>
                    <SelectItem value="ec2-stop">Stop EC2 Instance</SelectItem>
                    <SelectItem value="ec2-scale">Scale EC2 Auto Scaling Group</SelectItem>
                    <SelectItem value="rds-snapshot">Create RDS Snapshot</SelectItem>
                    <SelectItem value="lambda-invoke">Invoke Lambda Function</SelectItem>
                    <SelectItem value="sns-notify">Send SNS Notification</SelectItem>
                    <SelectItem value="email">Send Email</SelectItem>
                    <SelectItem value="webhook">Call Webhook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-resource">Target Resource</Label>
                <Input id="target-resource" placeholder="Select or enter resource ID" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="action-params">Action Parameters</Label>
                <Textarea 
                  id="action-params" 
                  placeholder='{"desiredCapacity": 5, "minSize": 2, "maxSize": 10}'
                  rows={4}
                />
                <p className="text-xs text-gray-500">JSON format for action-specific parameters</p>
              </div>

              <div className="pt-4 border-t">
                <Label className="mb-4 block">Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch id="notify-start" defaultChecked />
                    <span className="text-sm text-gray-600">Notify when automation starts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="notify-success" defaultChecked />
                    <span className="text-sm text-gray-600">Notify on success</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="notify-failure" defaultChecked />
                    <span className="text-sm text-gray-600">Notify on failure</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input id="notification-email" type="email" placeholder="admin@example.com" />
              </div>

              <div className="pt-4 border-t">
                <Label className="mb-4 block">Error Handling</Label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-retries">Maximum Retries</Label>
                    <Input id="max-retries" type="number" defaultValue="3" min="0" max="10" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retry-delay">Retry Delay (seconds)</Label>
                    <Input id="retry-delay" type="number" defaultValue="60" />
                  </div>

                  <div className="space-y-2">
                    <Label>Rollback on Failure</Label>
                    <div className="flex items-center gap-2">
                      <Switch id="rollback" />
                      <span className="text-sm text-gray-600">Automatically rollback changes on failure</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => setShowCreateForm(false)}>
            Cancel
          </Button>
          <Button onClick={() => setShowCreateForm(false)}>Create Automation</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">Automation Rules</h2>
          <p className="text-gray-600">Automate infrastructure management and operations</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      <div className="grid gap-4">
        {automations.map((automation) => (
          <Card key={automation.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{automation.name}</h3>
                    <Badge variant={automation.enabled ? "default" : "secondary"}>
                      {automation.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-6 text-sm">
                      <div>
                        <span className="text-gray-500">Trigger:</span>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{automation.trigger}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Action:</span>
                        <div className="flex items-center gap-1 mt-1">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span>{automation.action}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Last run: {automation.lastRun}</span>
                      <span>•</span>
                      <span>{automation.executions} executions</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => toggleAutomation(automation.id)}
                >
                  {automation.enabled ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="mb-4">Suggested Automations</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-auto p-4 justify-start">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4" />
                <span>Cost Alert</span>
              </div>
              <p className="text-xs text-gray-600">Get notified when spending exceeds threshold</p>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 justify-start">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" />
                <span>Scheduled Backups</span>
              </div>
              <p className="text-xs text-gray-600">Automatically backup resources daily</p>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 justify-start">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4" />
                <span>Auto-Scaling</span>
              </div>
              <p className="text-xs text-gray-600">Scale resources based on metrics</p>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 justify-start">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-4 h-4" />
                <span>Resource Cleanup</span>
              </div>
              <p className="text-xs text-gray-600">Remove unused resources automatically</p>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
}
