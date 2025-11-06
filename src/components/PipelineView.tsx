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
import { GitBranch, Plus, Play, Settings, Trash2, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface Pipeline {
  id: string;
  name: string;
  status: "success" | "failed" | "running" | "pending";
  lastRun: string;
  branch: string;
}

const mockPipelines: Pipeline[] = [
  {
    id: "1",
    name: "Production Deploy",
    status: "success",
    lastRun: "2 hours ago",
    branch: "main"
  },
  {
    id: "2",
    name: "Staging Pipeline",
    status: "running",
    lastRun: "Running now",
    branch: "staging"
  },
  {
    id: "3",
    name: "Development Build",
    status: "failed",
    lastRun: "5 hours ago",
    branch: "develop"
  }
];

export function PipelineView() {
  const [pipelines, setPipelines] = useState<Pipeline[]>(mockPipelines);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getStatusIcon = (status: Pipeline["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "running":
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: Pipeline["status"]) => {
    const variants = {
      success: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      running: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800"
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <GitBranch className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2>Create New Pipeline</h2>
              <p className="text-gray-600">Configure your CI/CD pipeline</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setShowCreateForm(false)}>
            Cancel
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="source">Source</TabsTrigger>
            <TabsTrigger value="stages">Build & Deploy</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pipeline-name">Pipeline Name *</Label>
                <Input id="pipeline-name" placeholder="my-pipeline" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your pipeline..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="environment">Environment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="prod">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Auto-run Pipeline</Label>
                <div className="flex items-center gap-2">
                  <Switch id="auto-run" defaultChecked />
                  <span className="text-sm text-gray-600">Automatically run pipeline on code push</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="source" className="space-y-4">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-provider">Source Provider *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="gitlab">GitLab</SelectItem>
                    <SelectItem value="bitbucket">Bitbucket</SelectItem>
                    <SelectItem value="codecommit">AWS CodeCommit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repository">Repository *</Label>
                <Input id="repository" placeholder="username/repository" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch *</Label>
                <Input id="branch" placeholder="main" defaultValue="main" />
              </div>

              <div className="space-y-2">
                <Label>Trigger Configuration</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch id="push-trigger" defaultChecked />
                    <span className="text-sm text-gray-600">Trigger on push</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="pr-trigger" />
                    <span className="text-sm text-gray-600">Trigger on pull request</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="schedule-trigger" />
                    <span className="text-sm text-gray-600">Scheduled trigger</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-secret">Webhook Secret</Label>
                <Input id="webhook-secret" type="password" placeholder="Enter webhook secret" />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="stages" className="space-y-4">
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="mb-4">Build Stage</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="build-provider">Build Provider</Label>
                    <Select defaultValue="codebuild">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="codebuild">AWS CodeBuild</SelectItem>
                        <SelectItem value="jenkins">Jenkins</SelectItem>
                        <SelectItem value="github-actions">GitHub Actions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="build-image">Build Image</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select build image" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="node-18">Node.js 18</SelectItem>
                        <SelectItem value="node-20">Node.js 20</SelectItem>
                        <SelectItem value="python-3.11">Python 3.11</SelectItem>
                        <SelectItem value="java-17">Java 17</SelectItem>
                        <SelectItem value="docker">Docker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="build-commands">Build Commands</Label>
                    <Textarea 
                      id="build-commands" 
                      placeholder="npm install&#10;npm run build&#10;npm test"
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="artifacts">Build Artifacts Path</Label>
                    <Input id="artifacts" placeholder="dist/" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="mb-4">Deploy Stage</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deploy-provider">Deploy Provider</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select deploy provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s3">Amazon S3</SelectItem>
                        <SelectItem value="ecs">Amazon ECS</SelectItem>
                        <SelectItem value="ec2">Amazon EC2</SelectItem>
                        <SelectItem value="lambda">AWS Lambda</SelectItem>
                        <SelectItem value="beanstalk">Elastic Beanstalk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deploy-target">Deploy Target</Label>
                    <Input id="deploy-target" placeholder="my-app-bucket" />
                  </div>

                  <div className="space-y-2">
                    <Label>Environment Variables</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Variable
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="mb-4">Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch id="notify-success" />
                    <span className="text-sm text-gray-600">Notify on successful deployment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="notify-failure" defaultChecked />
                    <span className="text-sm text-gray-600">Notify on failed deployment</span>
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
          <Button onClick={() => setShowCreateForm(false)}>Create Pipeline</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">CI/CD Pipelines</h2>
          <p className="text-gray-600">Manage your continuous integration and deployment pipelines</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Pipeline
        </Button>
      </div>

      <div className="grid gap-4">
        {pipelines.map((pipeline) => (
          <Card key={pipeline.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-blue-100 rounded-lg">
                  {getStatusIcon(pipeline.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{pipeline.name}</h3>
                    {getStatusBadge(pipeline.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-4 h-4" />
                      {pipeline.branch}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {pipeline.lastRun}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Play className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Pipeline Stages Visualization */}
            <div className="mt-6 flex items-center gap-2">
              <div className="flex-1 bg-green-100 h-2 rounded-full relative">
                <div className="absolute inset-0 bg-green-500 rounded-full" style={{ width: "100%" }}></div>
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">Source</span>
              
              <div className="flex-1 bg-green-100 h-2 rounded-full relative">
                <div className="absolute inset-0 bg-green-500 rounded-full" style={{ width: pipeline.status === "running" ? "50%" : "100%" }}></div>
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">Build</span>
              
              <div className={`flex-1 ${pipeline.status === "failed" ? "bg-red-100" : "bg-green-100"} h-2 rounded-full relative`}>
                <div 
                  className={`absolute inset-0 ${pipeline.status === "failed" ? "bg-red-500" : "bg-green-500"} rounded-full`} 
                  style={{ width: pipeline.status === "running" ? "0%" : "100%" }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">Deploy</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
