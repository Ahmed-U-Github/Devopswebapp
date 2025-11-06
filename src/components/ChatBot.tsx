import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AWS DevOps assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("ec2") || lowerInput.includes("instance")) {
      return "To create an EC2 instance, go to Infrastructure > EC2 and click 'Create Instance'. You can choose from various instance types, AMIs, and configure storage, networking, and security settings. Would you like me to guide you through the process?";
    }
    
    if (lowerInput.includes("pipeline") || lowerInput.includes("ci/cd")) {
      return "I can help you set up a CI/CD pipeline! Navigate to the Pipelines section and click 'Create Pipeline'. You'll need to configure your source repository, build settings, and deployment target. What type of application are you deploying?";
    }
    
    if (lowerInput.includes("cost") || lowerInput.includes("billing") || lowerInput.includes("price")) {
      return "For cost optimization, check out the Cost Optimization section. You can see current spending, cost breakdown by service, and recommendations for savings. Your current monthly cost is $4,283. Would you like specific recommendations?";
    }
    
    if (lowerInput.includes("security") || lowerInput.includes("vulnerability")) {
      return "Security is important! Visit the Security section to view your security posture score (currently 87), active vulnerabilities, and compliance status. You have 3 critical issues that need attention. Would you like me to list them?";
    }
    
    if (lowerInput.includes("s3") || lowerInput.includes("storage") || lowerInput.includes("bucket")) {
      return "For S3 bucket management, go to Infrastructure > S3. You can create buckets, configure encryption, versioning, lifecycle policies, and access controls. Need help with a specific S3 task?";
    }
    
    if (lowerInput.includes("automation") || lowerInput.includes("automate")) {
      return "The Automation section lets you create rules for automatic infrastructure management. You can set up triggers based on metrics, schedules, or events. Common automations include auto-scaling, backups, and resource cleanup. What would you like to automate?";
    }
    
    if (lowerInput.includes("help") || lowerInput.includes("support")) {
      return "I'm here to help! You can also visit the Support section for live chat with our team, create tickets, browse FAQs, or access documentation. What specific help do you need?";
    }

    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hello! I'm here to assist you with AWS DevOps operations. I can help with infrastructure management, pipelines, security, cost optimization, and more. What would you like to know?";
    }

    return "I'm here to help with AWS infrastructure management, pipelines, security, cost optimization, and automation. Could you please provide more details about what you need help with?";
  };

  const quickActions = [
    "How do I create an EC2 instance?",
    "Show me cost optimization tips",
    "What are my security issues?",
    "Help with CI/CD pipeline"
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 shadow-2xl rounded-lg overflow-hidden bg-white z-50 transition-all ${
      isMinimized ? "h-14" : "h-[600px]"
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-full">
            <Bot className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-white">
            <h3 className="text-sm">DevOps Assistant</h3>
            <p className="text-xs opacity-90">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[440px] bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`p-2 rounded-full ${
                  message.sender === "bot" ? "bg-blue-100" : "bg-purple-100"
                } flex-shrink-0 h-fit`}>
                  {message.sender === "bot" ? (
                    <Bot className="w-4 h-4 text-blue-600" />
                  ) : (
                    <User className="w-4 h-4 text-purple-600" />
                  )}
                </div>
                <div className={`flex-1 ${message.sender === "user" ? "flex justify-end" : ""}`}>
                  <div
                    className={`inline-block rounded-lg p-3 max-w-[80%] ${
                      message.sender === "bot"
                        ? "bg-white shadow-sm"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="space-y-2 pt-4">
                <p className="text-xs text-gray-500 text-center">Quick actions:</p>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(action);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="w-full text-left p-3 bg-white rounded-lg text-sm hover:bg-blue-50 transition-colors border"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
