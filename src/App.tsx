import { useState } from "react";
import { DashboardView } from "./components/DashboardView";
import { InfrastructureView } from "./components/InfrastructureView";
import { PipelineView } from "./components/PipelineView";
import { AutomationView } from "./components/AutomationView";
import { CostOptimizationView } from "./components/CostOptimizationView";
import { SecurityView } from "./components/SecurityView";
import { SupportView } from "./components/SupportView";
import { SkySavingsView } from "./components/SkySavingsView";
import { ChatBot } from "./components/ChatBot";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { 
  LayoutDashboard,
  Boxes, 
  GitBranch, 
  Zap, 
  DollarSign,
  Shield,
  HelpCircle,
  Cloud,
  Menu, 
  X,
  Bell,
  Settings,
  LogOut,
  User,
  ChevronDown
} from "lucide-react";
import logoImage from "figma:asset/e7b85ff8b2496fc4a18fba4849514ba212d9cb0a.png";

type View = "dashboard" | "infrastructure" | "pipelines" | "automations" | "cost" | "security" | "support" | "skysavings";

export default function App() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigation = [
    {
      id: "dashboard" as View,
      name: "Dashboard",
      icon: LayoutDashboard,
      description: "Overview & metrics"
    },
    {
      id: "infrastructure" as View,
      name: "Infrastructure",
      icon: Boxes,
      description: "Manage AWS resources"
    },
    {
      id: "pipelines" as View,
      name: "Pipelines",
      icon: GitBranch,
      description: "CI/CD pipelines"
    },
    {
      id: "automations" as View,
      name: "Automations",
      icon: Zap,
      description: "Automation rules"
    },
    {
      id: "skysavings" as View,
      name: "Sky Savings",
      icon: Cloud,
      description: "Cloud cost savings"
    },
    {
      id: "cost" as View,
      name: "Cost Optimization",
      icon: DollarSign,
      description: "Cost analysis & savings"
    },
    {
      id: "security" as View,
      name: "Security",
      icon: Shield,
      description: "Security & compliance"
    },
    {
      id: "support" as View,
      name: "Support",
      icon: HelpCircle,
      description: "Help & documentation"
    }
  ];

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "infrastructure":
        return <InfrastructureView />;
      case "pipelines":
        return <PipelineView />;
      case "automations":
        return <AutomationView />;
      case "skysavings":
        return <SkySavingsView />;
      case "cost":
        return <CostOptimizationView />;
      case "security":
        return <SecurityView />;
      case "support":
        return <SupportView />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={logoImage} alt="Agilisium" className="h-12 w-auto" />
            </div>
            <h1 className="text-3xl mb-2">DevOps Portal</h1>
            <p className="text-gray-600">AWS Infrastructure Management Platform</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Email</label>
              <input
                type="email"
                placeholder="your.email@company.com"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <Button 
              className="w-full py-6 text-lg"
              onClick={() => setIsLoggedIn(true)}
            >
              Sign In
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="py-6">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="py-6">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
              </Button>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-0"} bg-white border-r transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-6 border-b">
          <div className="flex items-center justify-center">
            <img src={logoImage} alt="Agilisium" className="h-10 w-auto" />
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left flex-1">
                  <div className="text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Region:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  us-east-1 <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>us-east-1 (N. Virginia)</DropdownMenuItem>
                <DropdownMenuItem>us-west-2 (Oregon)</DropdownMenuItem>
                <DropdownMenuItem>eu-west-1 (Ireland)</DropdownMenuItem>
                <DropdownMenuItem>ap-southeast-1 (Singapore)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
            <div>
              <h2 className="text-xl">
                {navigation.find(n => n.id === activeView)?.name}
              </h2>
              <p className="text-sm text-gray-600">
                {navigation.find(n => n.id === activeView)?.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2 space-y-2">
                  <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-start gap-2">
                      <div className="p-1 bg-red-100 rounded">
                        <Shield className="w-3 h-3 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Security alert: Public S3 bucket detected</p>
                        <p className="text-xs text-gray-500">5 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-start gap-2">
                      <div className="p-1 bg-blue-100 rounded">
                        <GitBranch className="w-3 h-3 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Pipeline completed successfully</p>
                        <p className="text-xs text-gray-500">10 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-start gap-2">
                      <div className="p-1 bg-yellow-100 rounded">
                        <DollarSign className="w-3 h-3 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Cost optimization tip available</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">John Doe</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}
