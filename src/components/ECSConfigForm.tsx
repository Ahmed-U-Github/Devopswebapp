import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Container, Plus, X } from "lucide-react";

export function ECSConfigForm() {
  const [securityGroups, setSecurityGroups] = useState<string[]>([]);
  const [tags, setTags] = useState<{ key: string; value: string }[]>([]);
  const [containerPorts, setContainerPorts] = useState<{ port: string; protocol: string }[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Container className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2>ECS Service Configuration</h2>
          <p className="text-gray-600">Configure your Elastic Container Service deployment</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="task">Task Definition</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="loadbalancer">Load Balancer</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cluster-name">ECS Cluster Name *</Label>
              <Input id="cluster-name" placeholder="my-ecs-cluster" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-name">Service Name *</Label>
              <Input id="service-name" placeholder="my-ecs-service" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="launch-type">Launch Type *</Label>
              <Select defaultValue="fargate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fargate">Fargate (Serverless)</SelectItem>
                  <SelectItem value="ec2">EC2</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Fargate is recommended for most use cases</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">AWS Region *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                  <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                  <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform-version">Platform Version</Label>
              <Select defaultValue="latest">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">LATEST</SelectItem>
                  <SelectItem value="1.4.0">1.4.0</SelectItem>
                  <SelectItem value="1.3.0">1.3.0</SelectItem>
                  <SelectItem value="1.2.0">1.2.0</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="task" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="mb-4">Task Definition</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="task-family">Task Definition Family *</Label>
                  <Input id="task-family" placeholder="my-app" />
                  <p className="text-xs text-gray-500">Name for your task definition</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="container-name">Container Name *</Label>
                  <Input id="container-name" placeholder="my-app-container" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="container-image">Container Image *</Label>
                  <Input id="container-image" placeholder="nginx:latest or account-id.dkr.ecr.us-east-1.amazonaws.com/repo:tag" />
                  <p className="text-xs text-gray-500">Docker image URI from ECR or Docker Hub</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpu">CPU (vCPU) *</Label>
                    <Select defaultValue="256">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="256">0.25 vCPU</SelectItem>
                        <SelectItem value="512">0.5 vCPU</SelectItem>
                        <SelectItem value="1024">1 vCPU</SelectItem>
                        <SelectItem value="2048">2 vCPU</SelectItem>
                        <SelectItem value="4096">4 vCPU</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="memory">Memory (MB) *</Label>
                    <Select defaultValue="512">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512">512 MB</SelectItem>
                        <SelectItem value="1024">1 GB</SelectItem>
                        <SelectItem value="2048">2 GB</SelectItem>
                        <SelectItem value="4096">4 GB</SelectItem>
                        <SelectItem value="8192">8 GB</SelectItem>
                        <SelectItem value="16384">16 GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="container-port">Container Port</Label>
                  <div className="flex gap-2 mb-2">
                    <div className="flex-1 space-y-2">
                      <Input id="container-port" type="number" placeholder="8080" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Select defaultValue="tcp">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tcp">TCP</SelectItem>
                          <SelectItem value="udp">UDP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => setContainerPorts([...containerPorts, { port: '', protocol: 'tcp' }])}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {containerPorts.length > 0 && (
                    <div className="space-y-2">
                      {containerPorts.map((cp, index) => (
                        <div key={index} className="flex gap-2">
                          <Input 
                            type="number" 
                            placeholder="Port" 
                            value={cp.port}
                            onChange={(e) => {
                              const newPorts = [...containerPorts];
                              newPorts[index].port = e.target.value;
                              setContainerPorts(newPorts);
                            }}
                          />
                          <Select 
                            defaultValue={cp.protocol}
                            onValueChange={(value) => {
                              const newPorts = [...containerPorts];
                              newPorts[index].protocol = value;
                              setContainerPorts(newPorts);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tcp">TCP</SelectItem>
                              <SelectItem value="udp">UDP</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setContainerPorts(containerPorts.filter((_, i) => i !== index))}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="environment-vars">Environment Variables</Label>
                  <Textarea 
                    id="environment-vars" 
                    placeholder="KEY1=value1&#10;KEY2=value2"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500">One per line in KEY=VALUE format</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="log-group">CloudWatch Log Group</Label>
                  <Input id="log-group" placeholder="/ecs/my-service" />
                </div>

                <div className="space-y-2">
                  <Label>Execution Role ARN</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select or create role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="create">Create new role</SelectItem>
                      <SelectItem value="role-1">ecsTaskExecutionRole</SelectItem>
                      <SelectItem value="role-2">custom-ecs-execution-role</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vpc">VPC *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select VPC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default VPC</SelectItem>
                  <SelectItem value="vpc-1">Production VPC (vpc-0abc123)</SelectItem>
                  <SelectItem value="vpc-2">Development VPC (vpc-0def456)</SelectItem>
                  <SelectItem value="vpc-3">Staging VPC (vpc-0ghi789)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subnets *</Label>
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="subnet-1" className="rounded" />
                  <label htmlFor="subnet-1" className="text-sm flex-1">Public Subnet 1 (subnet-0abc123 | us-east-1a)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="subnet-2" className="rounded" />
                  <label htmlFor="subnet-2" className="text-sm flex-1">Public Subnet 2 (subnet-0def456 | us-east-1b)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="subnet-3" className="rounded" />
                  <label htmlFor="subnet-3" className="text-sm flex-1">Private Subnet 1 (subnet-0ghi789 | us-east-1a)</label>
                </div>
              </div>
              <p className="text-xs text-gray-500">Select at least 2 subnets across different AZs</p>
            </div>

            <div className="space-y-2">
              <Label>Security Groups *</Label>
              <div className="flex gap-2 mb-2">
                <Select onValueChange={(value) => {
                  if (!securityGroups.includes(value)) {
                    setSecurityGroups([...securityGroups, value]);
                  }
                }}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select security groups" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sg-default">default</SelectItem>
                    <SelectItem value="sg-web">web-server-sg</SelectItem>
                    <SelectItem value="sg-app">app-server-sg</SelectItem>
                    <SelectItem value="sg-alb">alb-sg</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {securityGroups.map((sg) => (
                  <Badge key={sg} variant="secondary" className="gap-1">
                    {sg}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => setSecurityGroups(securityGroups.filter(s => s !== sg))}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Public IP Assignment</Label>
              <Select defaultValue="disabled">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enabled">Enabled</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="loadbalancer" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Use Load Balancer</Label>
              <div className="flex items-center gap-2">
                <Switch id="use-lb" />
                <span className="text-sm text-gray-600">Enable Application Load Balancer</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="load-balancer">Load Balancer *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select or create load balancer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create">Create new ALB</SelectItem>
                  <SelectItem value="alb-1">my-app-alb</SelectItem>
                  <SelectItem value="alb-2">production-alb</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-group">Target Group *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select or create target group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create">Create new target group</SelectItem>
                  <SelectItem value="tg-1">my-app-tg</SelectItem>
                  <SelectItem value="tg-2">api-tg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-port">Target Port</Label>
              <Input id="target-port" type="number" defaultValue="8080" />
            </div>

            <div className="space-y-2">
              <Label>Health Check Configuration</Label>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="health-path">Path</Label>
                  <Input id="health-path" defaultValue="/" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="health-interval">Interval (seconds)</Label>
                    <Input id="health-interval" type="number" defaultValue="30" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="health-timeout">Timeout (seconds)</Label>
                    <Input id="health-timeout" type="number" defaultValue="5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="health-threshold">Healthy Threshold</Label>
                    <Input id="health-threshold" type="number" defaultValue="2" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unhealthy-threshold">Unhealthy Threshold</Label>
                    <Input id="unhealthy-threshold" type="number" defaultValue="3" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="mb-4">Service Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="desired-count">Desired Task Count</Label>
                  <Input id="desired-count" type="number" defaultValue="1" min="1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deployment-type">Deployment Type</Label>
                  <Select defaultValue="rolling">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rolling">Rolling Update</SelectItem>
                      <SelectItem value="blue-green">Blue/Green</SelectItem>
                      <SelectItem value="canary">Canary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Min/Max Healthy Percent</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-healthy">Minimum (%)</Label>
                      <Input id="min-healthy" type="number" defaultValue="100" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-healthy">Maximum (%)</Label>
                      <Input id="max-healthy" type="number" defaultValue="200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Auto Scaling</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Switch id="autoscaling" />
                  <span className="text-sm text-gray-600">Enable Auto Scaling</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-tasks">Minimum Tasks</Label>
                  <Input id="min-tasks" type="number" defaultValue="1" min="1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-tasks">Maximum Tasks</Label>
                  <Input id="max-tasks" type="number" defaultValue="10" min="1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-cpu">Target CPU Utilization (%)</Label>
                  <Input id="target-cpu" type="number" defaultValue="70" min="1" max="100" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-memory">Target Memory Utilization (%)</Label>
                  <Input id="target-memory" type="number" defaultValue="80" min="1" max="100" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Monitoring & Logging</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch id="enable-monitoring" defaultChecked />
                  <span className="text-sm text-gray-600">Enable CloudWatch monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="enable-logging" defaultChecked />
                  <span className="text-sm text-gray-600">Enable container logs</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Label>Tags</Label>
              <div className="space-y-2 mt-2">
                {tags.map((tag, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      placeholder="Key" 
                      value={tag.key}
                      onChange={(e) => {
                        const newTags = [...tags];
                        newTags[index].key = e.target.value;
                        setTags(newTags);
                      }}
                    />
                    <Input 
                      placeholder="Value" 
                      value={tag.value}
                      onChange={(e) => {
                        const newTags = [...tags];
                        newTags[index].value = e.target.value;
                        setTags(newTags);
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setTags([...tags, { key: '', value: '' }])}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tag
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button variant="outline">Cancel</Button>
        <Button>Create ECS Service</Button>
      </div>
    </div>
  );
}
