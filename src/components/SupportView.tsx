import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  MessageCircle, 
  FileText, 
  BookOpen, 
  Video,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  ExternalLink,
  Phone,
  Mail,
  Send
} from "lucide-react";

export function SupportView() {
  const [tickets, setTickets] = useState([
    {
      id: "TICK-1234",
      title: "EC2 instance not responding",
      status: "open",
      priority: "high",
      created: "2 hours ago",
      lastUpdate: "30 mins ago"
    },
    {
      id: "TICK-1233",
      title: "S3 bucket access issue",
      status: "in-progress",
      priority: "medium",
      created: "1 day ago",
      lastUpdate: "3 hours ago"
    },
    {
      id: "TICK-1232",
      title: "CloudFront distribution setup help",
      status: "resolved",
      priority: "low",
      created: "3 days ago",
      lastUpdate: "2 days ago"
    }
  ]);

  const faqs = [
    {
      question: "How do I create an EC2 instance?",
      answer: "Navigate to Infrastructure > EC2, click 'Create Instance', and fill in the required details.",
      category: "Infrastructure"
    },
    {
      question: "How to set up a CI/CD pipeline?",
      answer: "Go to Pipelines section, click 'Create Pipeline', and configure your source, build, and deploy stages.",
      category: "Pipelines"
    },
    {
      question: "How can I optimize my AWS costs?",
      answer: "Check the Cost Optimization section for recommendations on Reserved Instances, right-sizing, and unused resources.",
      category: "Cost"
    },
    {
      question: "How to enable MFA for my account?",
      answer: "Go to Security > IAM, select your user, and follow the MFA setup wizard.",
      category: "Security"
    }
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of managing your infrastructure",
      type: "documentation",
      icon: BookOpen
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      type: "video",
      icon: Video
    },
    {
      title: "API Documentation",
      description: "Integrate with our REST API",
      type: "documentation",
      icon: FileText
    },
    {
      title: "Best Practices",
      description: "Learn industry best practices",
      type: "documentation",
      icon: BookOpen
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      open: "bg-blue-100 text-blue-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800"
    };
    return variants[status as keyof typeof variants] || variants.open;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-orange-100 text-orange-800",
      low: "bg-gray-100 text-gray-800"
    };
    return variants[priority as keyof typeof variants] || variants.low;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
              <Badge className="bg-green-100 text-green-800">Available now</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">Get help via email</p>
              <span className="text-sm text-gray-600">Response in 2-4 hours</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600 mb-4">Call our support line</p>
              <span className="text-sm text-gray-600">1-800-AWS-HELP</span>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="create">Create Ticket</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3>Support Tickets</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search tickets..." className="pl-10 w-64" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-gray-600">{ticket.id}</span>
                        <Badge className={getStatusBadge(ticket.status)}>
                          {ticket.status}
                        </Badge>
                        <Badge className={getPriorityBadge(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <h4 className="mb-2">{ticket.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Created: {ticket.created}</span>
                        <span>•</span>
                        <span>Last update: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-6">Create Support Ticket</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ticket-type">Issue Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="security">Security Concern</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General question</SelectItem>
                    <SelectItem value="medium">Medium - Service degradation</SelectItem>
                    <SelectItem value="high">High - Service down</SelectItem>
                    <SelectItem value="critical">Critical - Production impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="Brief description of the issue" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Please provide detailed information about your issue..."
                  rows={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource">Affected Resource (Optional)</Label>
                <Input id="resource" placeholder="e.g., EC2 instance ID, S3 bucket name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">Attachments (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Ticket
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <h3>Frequently Asked Questions</h3>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search FAQs..." className="pl-10" />
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="flex-1">{faq.question}</h4>
                    <Badge variant="outline">{faq.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-6">
              View All FAQs
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <resource.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                    <Button variant="outline" size="sm">
                      View <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <h3 className="mb-4">Popular Articles</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Setting up your first pipeline</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Understanding AWS security groups</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Cost optimization best practices</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Automation rules guide</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Need More Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Can't find what you're looking for? Our support team is here to help you 24/7.
                </p>
                <Button>Contact Support</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
