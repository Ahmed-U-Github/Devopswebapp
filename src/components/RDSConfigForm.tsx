import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Database } from "lucide-react";

export function RDSConfigForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-3 bg-orange-100 rounded-lg">
          <Database className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2>RDS Database Configuration</h2>
          <p className="text-gray-600">Configure your Relational Database Service instance</p>
        </div>
      </div>

      <Tabs defaultValue="engine" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engine">Engine</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
          <TabsTrigger value="additional">Additional</TabsTrigger>
        </TabsList>

        <TabsContent value="engine" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Database Creation Method</Label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard create</SelectItem>
                  <SelectItem value="easy">Easy create</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="engine-type">Engine Type *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select engine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mysql">Amazon Aurora (MySQL-Compatible)</SelectItem>
                  <SelectItem value="postgresql">Amazon Aurora (PostgreSQL-Compatible)</SelectItem>
                  <SelectItem value="mysql-standard">MySQL</SelectItem>
                  <SelectItem value="postgresql-standard">PostgreSQL</SelectItem>
                  <SelectItem value="mariadb">MariaDB</SelectItem>
                  <SelectItem value="oracle">Oracle</SelectItem>
                  <SelectItem value="sqlserver">Microsoft SQL Server</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="engine-version">Engine Version *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8.0.35">MySQL 8.0.35</SelectItem>
                  <SelectItem value="8.0.33">MySQL 8.0.33</SelectItem>
                  <SelectItem value="5.7.44">MySQL 5.7.44</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Templates</Label>
              <Select defaultValue="prod">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prod">Production</SelectItem>
                  <SelectItem value="dev">Dev/Test</SelectItem>
                  <SelectItem value="free">Free tier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Availability and Durability</Label>
              <Select defaultValue="multi-az">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multi-az">Multi-AZ DB instance</SelectItem>
                  <SelectItem value="multi-az-cluster">Multi-AZ DB cluster</SelectItem>
                  <SelectItem value="single">Single DB instance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="db-identifier">DB Instance Identifier *</Label>
              <Input id="db-identifier" placeholder="my-database-instance" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="master-username">Master Username *</Label>
              <Input id="master-username" placeholder="admin" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="master-password">Master Password *</Label>
              <Input id="master-password" type="password" placeholder="Enter a strong password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password *</Label>
              <Input id="confirm-password" type="password" placeholder="Re-enter password" />
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Instance Configuration</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instance-class">DB Instance Class *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select instance class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="db.t3.micro">db.t3.micro (1 vCPU, 1 GiB RAM) - Free tier</SelectItem>
                      <SelectItem value="db.t3.small">db.t3.small (2 vCPU, 2 GiB RAM)</SelectItem>
                      <SelectItem value="db.t3.medium">db.t3.medium (2 vCPU, 4 GiB RAM)</SelectItem>
                      <SelectItem value="db.m5.large">db.m5.large (2 vCPU, 8 GiB RAM)</SelectItem>
                      <SelectItem value="db.m5.xlarge">db.m5.xlarge (4 vCPU, 16 GiB RAM)</SelectItem>
                      <SelectItem value="db.r5.2xlarge">db.r5.2xlarge (8 vCPU, 64 GiB RAM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage-type">Storage Type</Label>
                  <Select defaultValue="gp3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gp3">General Purpose SSD (gp3)</SelectItem>
                      <SelectItem value="gp2">General Purpose SSD (gp2)</SelectItem>
                      <SelectItem value="io1">Provisioned IOPS SSD (io1)</SelectItem>
                      <SelectItem value="magnetic">Magnetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allocated-storage">Allocated Storage (GiB) *</Label>
                  <Input id="allocated-storage" type="number" defaultValue="20" min="20" max="65536" />
                </div>

                <div className="space-y-2">
                  <Label>Storage Autoscaling</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="autoscaling" defaultChecked />
                    <span className="text-sm text-gray-600">Enable storage autoscaling</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-storage">Maximum Storage Threshold (GiB)</Label>
                  <Input id="max-storage" type="number" defaultValue="1000" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="connectivity" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Compute Resource</Label>
              <Select defaultValue="dont-connect">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dont-connect">Don't connect to an EC2 compute resource</SelectItem>
                  <SelectItem value="connect">Connect to an EC2 compute resource</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vpc-connectivity">VPC *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select VPC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default VPC</SelectItem>
                  <SelectItem value="vpc-1">Production VPC (vpc-0abc123)</SelectItem>
                  <SelectItem value="vpc-2">Development VPC (vpc-0def456)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subnet-group">DB Subnet Group</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subnet group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="private">Private subnet group</SelectItem>
                  <SelectItem value="public">Public subnet group</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Public Access</Label>
              <Select defaultValue="no">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="security-group">VPC Security Group</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select security group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="db-sg">database-sg</SelectItem>
                  <SelectItem value="app-sg">application-sg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="az">Availability Zone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="No preference" />
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
              <Label htmlFor="db-port">Database Port</Label>
              <Input id="db-port" type="number" defaultValue="3306" />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="additional" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="mb-4">Database Options</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="initial-db">Initial Database Name</Label>
                  <Input id="initial-db" placeholder="mydb" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="param-group">DB Parameter Group</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">default.mysql8.0</SelectItem>
                      <SelectItem value="custom-1">Custom parameter group 1</SelectItem>
                      <SelectItem value="custom-2">Custom parameter group 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="option-group">Option Group</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">default:mysql-8-0</SelectItem>
                      <SelectItem value="custom">Custom option group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Backup</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Enable Automated Backups</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="auto-backup" defaultChecked />
                    <span className="text-sm text-gray-600">Enable automated backups</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-retention">Backup Retention Period (days)</Label>
                  <Input id="backup-retention" type="number" defaultValue="7" min="0" max="35" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-window">Backup Window</Label>
                  <Input id="backup-window" placeholder="03:00-04:00" />
                </div>

                <div className="space-y-2">
                  <Label>Copy Tags to Snapshots</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="copy-tags" defaultChecked />
                    <span className="text-sm text-gray-600">Copy all tags from DB instance to snapshots</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Encryption</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Enable Encryption</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="encryption" defaultChecked />
                    <span className="text-sm text-gray-600">Encrypt database</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kms-key">AWS KMS Key</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default (aws/rds)</SelectItem>
                      <SelectItem value="custom-1">Custom KMS Key 1</SelectItem>
                      <SelectItem value="custom-2">Custom KMS Key 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Monitoring</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Enhanced Monitoring</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="enhanced-monitoring" />
                    <span className="text-sm text-gray-600">Enable enhanced monitoring</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Performance Insights</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="performance-insights" />
                    <span className="text-sm text-gray-600">Enable Performance Insights</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Maintenance</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Enable Auto Minor Version Upgrade</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="auto-upgrade" defaultChecked />
                    <span className="text-sm text-gray-600">Enable auto minor version upgrade</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maintenance-window">Maintenance Window</Label>
                  <Input id="maintenance-window" placeholder="sun:05:00-sun:06:00" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Deletion Protection</h3>
              <div className="space-y-2">
                <Label>Enable Deletion Protection</Label>
                <div className="flex items-center gap-2">
                  <Switch id="deletion-protection" defaultChecked />
                  <span className="text-sm text-gray-600">Protect database from accidental deletion</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button variant="outline">Cancel</Button>
        <Button>Create Database</Button>
      </div>
    </div>
  );
}
