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
import { Server, Plus, X } from "lucide-react";

export function EC2ConfigForm() {
  const [securityGroups, setSecurityGroups] = useState<string[]>([]);
  const [tags, setTags] = useState<{ key: string; value: string }[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-3 bg-orange-100 rounded-lg">
          <Server className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2>EC2 Instance Configuration</h2>
          <p className="text-gray-600">Configure your Elastic Compute Cloud instance</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="instance">Instance Details</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="network">Network & Security</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instance-name">Instance Name *</Label>
              <Input id="instance-name" placeholder="my-ec2-instance" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ami">Amazon Machine Image (AMI) *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select AMI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ami-1">Amazon Linux 2023 AMI</SelectItem>
                  <SelectItem value="ami-2">Ubuntu Server 22.04 LTS</SelectItem>
                  <SelectItem value="ami-3">Red Hat Enterprise Linux 9</SelectItem>
                  <SelectItem value="ami-4">Windows Server 2022</SelectItem>
                  <SelectItem value="ami-5">SUSE Linux Enterprise Server</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instance-type">Instance Type *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select instance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t2.micro">t2.micro (1 vCPU, 1 GiB RAM) - Free tier eligible</SelectItem>
                  <SelectItem value="t2.small">t2.small (1 vCPU, 2 GiB RAM)</SelectItem>
                  <SelectItem value="t2.medium">t2.medium (2 vCPU, 4 GiB RAM)</SelectItem>
                  <SelectItem value="t3.large">t3.large (2 vCPU, 8 GiB RAM)</SelectItem>
                  <SelectItem value="m5.xlarge">m5.xlarge (4 vCPU, 16 GiB RAM)</SelectItem>
                  <SelectItem value="c5.2xlarge">c5.2xlarge (8 vCPU, 16 GiB RAM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="key-pair">Key Pair *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select or create key pair" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Create new key pair</SelectItem>
                  <SelectItem value="key-1">my-key-pair-1</SelectItem>
                  <SelectItem value="key-2">production-key</SelectItem>
                  <SelectItem value="key-3">development-key</SelectItem>
                </SelectContent>
              </Select>
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
          </Card>
        </TabsContent>

        <TabsContent value="instance" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instance-count">Number of Instances</Label>
              <Input id="instance-count" type="number" defaultValue="1" min="1" max="20" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability-zone">Availability Zone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="No preference (default)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">No preference</SelectItem>
                  <SelectItem value="us-east-1a">us-east-1a</SelectItem>
                  <SelectItem value="us-east-1b">us-east-1b</SelectItem>
                  <SelectItem value="us-east-1c">us-east-1c</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenancy">Tenancy</Label>
              <Select defaultValue="default">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Shared (default)</SelectItem>
                  <SelectItem value="dedicated">Dedicated instance</SelectItem>
                  <SelectItem value="host">Dedicated host</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iam-role">IAM Instance Profile</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select IAM role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="role-1">EC2-S3-Access-Role</SelectItem>
                  <SelectItem value="role-2">EC2-Admin-Role</SelectItem>
                  <SelectItem value="role-3">EC2-ReadOnly-Role</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monitoring">CloudWatch Detailed Monitoring</Label>
              <div className="flex items-center gap-2">
                <Switch id="monitoring" />
                <span className="text-sm text-gray-600">Enable detailed monitoring (additional charges apply)</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-data">User Data Script</Label>
              <Textarea 
                id="user-data" 
                placeholder="#!/bin/bash&#10;# Add initialization scripts here"
                rows={6}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="mb-4">Root Volume</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="volume-type">Volume Type *</Label>
                  <Select defaultValue="gp3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gp3">General Purpose SSD (gp3)</SelectItem>
                      <SelectItem value="gp2">General Purpose SSD (gp2)</SelectItem>
                      <SelectItem value="io1">Provisioned IOPS SSD (io1)</SelectItem>
                      <SelectItem value="io2">Provisioned IOPS SSD (io2)</SelectItem>
                      <SelectItem value="st1">Throughput Optimized HDD (st1)</SelectItem>
                      <SelectItem value="sc1">Cold HDD (sc1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volume-size">Size (GiB) *</Label>
                  <Input id="volume-size" type="number" defaultValue="8" min="8" max="16384" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="iops">IOPS</Label>
                  <Input id="iops" type="number" defaultValue="3000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="throughput">Throughput (MiB/s)</Label>
                  <Input id="throughput" type="number" defaultValue="125" />
                </div>

                <div className="space-y-2">
                  <Label>Encryption</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="encryption" defaultChecked />
                    <span className="text-sm text-gray-600">Encrypt this volume</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kms-key">KMS Key</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default (aws/ebs)</SelectItem>
                      <SelectItem value="custom-1">Custom KMS Key 1</SelectItem>
                      <SelectItem value="custom-2">Custom KMS Key 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Delete on Termination</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="delete-on-termination" defaultChecked />
                    <span className="text-sm text-gray-600">Delete volume when instance is terminated</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <h3>Additional Volumes</h3>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Volume
                </Button>
              </div>
              <p className="text-sm text-gray-600">No additional volumes configured</p>
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
              <Label htmlFor="subnet">Subnet *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subnet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subnet-1">Public Subnet (subnet-0abc123)</SelectItem>
                  <SelectItem value="subnet-2">Private Subnet (subnet-0def456)</SelectItem>
                  <SelectItem value="subnet-3">Database Subnet (subnet-0ghi789)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Auto-assign Public IP</Label>
              <div className="flex items-center gap-2">
                <Switch id="public-ip" />
                <span className="text-sm text-gray-600">Enable auto-assign public IPv4 address</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="private-ip">Primary Private IP</Label>
              <Input id="private-ip" placeholder="Auto-assign" />
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
                    <SelectItem value="sg-ssh">ssh-access-sg</SelectItem>
                    <SelectItem value="sg-db">database-sg</SelectItem>
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
              <Label>Advanced Network Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch id="source-dest-check" defaultChecked />
                  <span className="text-sm text-gray-600">Enable source/destination check</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="ena" defaultChecked />
                  <span className="text-sm text-gray-600">Enable enhanced networking (ENA)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="space-y-2">
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
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button variant="outline">Cancel</Button>
        <Button>Create EC2 Instance</Button>
      </div>
    </div>
  );
}
