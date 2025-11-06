import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function SkySavingsView() {
  const accounts = [
    {
      name: "Agilisium Development",
      id: "919490798061"
    },
    {
      name: "Agilisium LifeScience-Labs",
      id: "528503375915"
    }
  ];

  const accountSummaries = [
    {
      accountName: "Agilisium Development",
      accountId: "919490798061",
      services: [
        {
          service: "Unattached EBS",
          yearlySavings: "$34.8",
          monthlySavings: "$2.9",
          dryRun: "True",
          resourceCount: 224,
          actionImplemented: "No"
        },
        {
          service: "EBS Snapshots",
          yearlySavings: "$957.6",
          monthlySavings: "$79.8",
          dryRun: "True",
          resourceCount: 45,
          actionImplemented: "No"
        },
        {
          service: "Redshift Snapshots",
          yearlySavings: "$400.18",
          monthlySavings: "$33.35",
          dryRun: "True",
          resourceCount: 18,
          actionImplemented: "No"
        },
        {
          service: "Applies S3 Life...",
          yearlySavings: "",
          monthlySavings: "",
          dryRun: "True",
          resourceCount: 224,
          actionImplemented: "No"
        },
        {
          service: "EBS Snapshots",
          yearlySavings: "",
          monthlySavings: "",
          dryRun: "True",
          resourceCount: 45,
          actionImplemented: "No"
        },
        {
          service: "RDS Cluster S...",
          yearlySavings: "",
          monthlySavings: "",
          dryRun: "True",
          resourceCount: 18,
          actionImplemented: "No"
        },
        {
          service: "Redshift Snap...",
          yearlySavings: "",
          monthlySavings: "",
          dryRun: "True",
          resourceCount: 25,
          actionImplemented: "No"
        }
      ]
    },
    {
      accountName: "Agilisium LifeScience-Labs",
      accountId: "528503375915",
      services: [
        {
          service: "EBS Snapshots",
          yearlySavings: "$364.8",
          monthlySavings: "$30.4",
          dryRun: "True",
          resourceCount: 118,
          actionImplemented: "No"
        },
        {
          service: "Redshift Snapshots",
          yearlySavings: "$0.09",
          monthlySavings: "$0.01",
          dryRun: "True",
          resourceCount: 6,
          actionImplemented: "No"
        },
        {
          service: "Applies S3 Life...",
          yearlySavings: "",
          monthlySavings: "",
          dryRun: "True",
          resourceCount: 118,
          actionImplemented: "No"
        },
        {
          service: "EBS Snapshots",
          yearlySavings: "",
          monthlySavings: "",
          dryRun: "True",
          resourceCount: 6,
          actionImplemented: "No"
        },
        {
          service: "RDS Cluster S...",
          yearlySavings: "",
          monthlySavings: "",
          dryRun: "True",
          resourceCount: 2,
          actionImplemented: "No"
        },
        {
          service: "Redshift Snap...",
          yearlySavings: "",
          monthlySavings: "",
          dryRun: "True",
          resourceCount: 5,
          actionImplemented: "No"
        }
      ]
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Self Service DevOps Portal</h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search..." className="pl-10 bg-white" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="sky-savings" className="w-full">
          <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0">
            <TabsTrigger 
              value="all" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="sky-savings"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
            >
              Sky Savings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sky-savings" className="space-y-6 mt-6">
            {/* Active Accounts */}
            <Card className="p-6 bg-white">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-700 mb-2">Active Accounts</div>
                  <div className="text-2xl">{accounts.length}</div>
                </div>
                {accounts.map((account, index) => (
                  <div key={index}>
                    <div className="text-sm text-gray-700 mb-2">{account.name}</div>
                    <div className="text-2xl">{account.id}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Savings & Account Summary */}
            <div>
              <h2 className="text-xl mb-4">Savings & Account Summary</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {accountSummaries.map((summary, index) => (
                  <div key={index} className="space-y-4">
                    {/* Account Header */}
                    <div>
                      <h3 className="text-blue-600 text-lg mb-1">
                        {summary.accountName} ({summary.accountId})
                      </h3>
                    </div>

                    {/* Top Table - Cost Savings */}
                    <Card className="bg-white overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="text-gray-700">Service</TableHead>
                            <TableHead className="text-gray-700">Yearly Cost Savings</TableHead>
                            <TableHead className="text-gray-700">Monthly Cost Savings</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {summary.services.slice(0, 3).map((service, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="text-gray-700">{service.service}</TableCell>
                              <TableCell className="text-gray-700">{service.yearlySavings}</TableCell>
                              <TableCell className="text-gray-700">{service.monthlySavings}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>

                    {/* Bottom Table - Resource Details */}
                    <Card className="bg-white overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="text-gray-700">Service</TableHead>
                            <TableHead className="text-gray-700">Dry Run</TableHead>
                            <TableHead className="text-gray-700">Resource Count</TableHead>
                            <TableHead className="text-gray-700">Action Implemented</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {summary.services.slice(3).map((service, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="text-gray-700">{service.service}</TableCell>
                              <TableCell className="text-gray-700">{service.dryRun}</TableCell>
                              <TableCell className="text-gray-700">{service.resourceCount}</TableCell>
                              <TableCell className="text-gray-700">{service.actionImplemented}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="text-center py-12 text-gray-500">
              All content coming soon...
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <div className="text-center py-12 text-gray-500">
              Dashboard content coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
