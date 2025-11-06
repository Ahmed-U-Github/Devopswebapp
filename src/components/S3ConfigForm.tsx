import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { Database, Plus, X } from "lucide-react";
import { Badge } from "./ui/badge";

export function S3ConfigForm() {
  const [tags, setTags] = useState<{ key: string; value: string }[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-3 bg-orange-100 rounded-lg">
          <Database className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2>S3 Bucket Configuration</h2>
          <p className="text-gray-600">Configure your Simple Storage Service bucket</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bucket-name">Bucket Name *</Label>
              <Input id="bucket-name" placeholder="my-unique-bucket-name" />
              <p className="text-xs text-gray-500">Must be globally unique and DNS-compliant</p>
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
              <Label>Object Ownership</Label>
              <Select defaultValue="owner">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Bucket owner enforced (recommended)</SelectItem>
                  <SelectItem value="preferred">Bucket owner preferred</SelectItem>
                  <SelectItem value="writer">Object writer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Block Public Access</Label>
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Checkbox id="block-acls" defaultChecked />
                  <label htmlFor="block-acls" className="text-sm">Block all public access</label>
                </div>
                <p className="text-xs text-gray-600 ml-6">Recommended for most use cases</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bucket Versioning</Label>
              <div className="flex items-center gap-2">
                <Switch id="versioning" />
                <span className="text-sm text-gray-600">Enable versioning</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="mb-4">Default Encryption</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Encryption Type</Label>
                  <Select defaultValue="sse-s3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sse-s3">Server-side encryption with Amazon S3 managed keys (SSE-S3)</SelectItem>
                      <SelectItem value="sse-kms">Server-side encryption with AWS KMS keys (SSE-KMS)</SelectItem>
                      <SelectItem value="dsse-kms">Dual-layer server-side encryption with AWS KMS keys (DSSE-KMS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bucket Key</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="bucket-key" defaultChecked />
                    <span className="text-sm text-gray-600">Enable bucket key (reduces KMS costs)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Static Website Hosting</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Switch id="static-hosting" />
                  <span className="text-sm text-gray-600">Enable static website hosting</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="index-doc">Index Document</Label>
                  <Input id="index-doc" placeholder="index.html" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="error-doc">Error Document</Label>
                  <Input id="error-doc" placeholder="error.html" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Server Access Logging</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Switch id="logging" />
                  <span className="text-sm text-gray-600">Enable server access logging</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="target-bucket">Target Bucket</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target bucket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="logs-1">logs-bucket-1</SelectItem>
                      <SelectItem value="logs-2">logs-bucket-2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-prefix">Target Prefix</Label>
                  <Input id="target-prefix" placeholder="logs/" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="mb-4">Access Control List (ACL)</h3>
              <Select defaultValue="private">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="public-read">Public Read</SelectItem>
                  <SelectItem value="public-read-write">Public Read/Write</SelectItem>
                  <SelectItem value="authenticated-read">Authenticated Read</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">CORS Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Switch id="cors" />
                  <span className="text-sm text-gray-600">Enable CORS</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allowed-origins">Allowed Origins</Label>
                  <Input id="allowed-origins" placeholder="*" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowed-methods">Allowed Methods</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">GET</Badge>
                    <Badge variant="secondary">PUT</Badge>
                    <Badge variant="secondary">POST</Badge>
                    <Badge variant="secondary">DELETE</Badge>
                    <Badge variant="secondary">HEAD</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-age">Max Age (seconds)</Label>
                  <Input id="max-age" type="number" defaultValue="3000" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Bucket Policy</h3>
              <Button variant="outline">Edit Policy JSON</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="mb-4">Lifecycle Rules</h3>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Lifecycle Rule
              </Button>
              <p className="text-sm text-gray-600 mt-2">No lifecycle rules configured</p>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Replication Rules</h3>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Replication Rule
              </Button>
              <p className="text-sm text-gray-600 mt-2">No replication rules configured</p>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-4">Analytics & Insights</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch id="request-metrics" />
                  <span className="text-sm text-gray-600">Enable CloudWatch request metrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="storage-analytics" />
                  <span className="text-sm text-gray-600">Enable storage class analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="inventory" />
                  <span className="text-sm text-gray-600">Enable inventory reports</span>
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
        <Button>Create S3 Bucket</Button>
      </div>
    </div>
  );
}
