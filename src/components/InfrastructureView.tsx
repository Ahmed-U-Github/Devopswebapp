import { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { EC2ConfigForm } from "./EC2ConfigForm";
import { S3ConfigForm } from "./S3ConfigForm";
import { RDSConfigForm } from "./RDSConfigForm";
import { ECSConfigForm } from "./ECSConfigForm";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Server, Database, Boxes, Container, Network, Lock, Globe, Cpu, HardDrive, CloudCog, GitBranch } from "lucide-react";

type ServiceType = 
  | "none" 
  | "ec2" 
  | "s3" 
  | "rds" 
  | "lambda" 
  | "ecs" 
  | "vpc" 
  | "iam" 
  | "cloudfront" 
  | "elasticache" 
  | "ebs" 
  | "elb";

const services = [
  {
    id: "ec2",
    icon: Server,
    name: "EC2",
    description: "Virtual servers in the cloud",
    category: "Compute"
  },
  {
    id: "lambda",
    icon: Cpu,
    name: "Lambda",
    description: "Run code without compute servers",
    category: "Compute"
  },
  {
    id: "ecs",
    icon: Container,
    name: "ECS",
    description: "Container orchestration service",
    category: "Compute"
  },
  {
    id: "s3",
    icon: Database,
    name: "S3",
    description: "Scalable object storage",
    category: "Storage"
  },
  {
    id: "ebs",
    icon: HardDrive,
    name: "EBS",
    description: "Block storage for EC2",
    category: "Storage"
  },
  {
    id: "rds",
    icon: Database,
    name: "RDS",
    description: "Managed relational database",
    category: "Database"
  },
  {
    id: "elasticache",
    icon: Database,
    name: "ElastiCache",
    description: "In-memory caching service",
    category: "Database"
  },
  {
    id: "vpc",
    icon: Network,
    name: "VPC",
    description: "Isolated cloud resources",
    category: "Network"
  },
  {
    id: "elb",
    icon: GitBranch,
    name: "ELB",
    description: "Load balancing service",
    category: "Network"
  },
  {
    id: "cloudfront",
    icon: Globe,
    name: "CloudFront",
    description: "Content delivery network",
    category: "Network"
  },
  {
    id: "iam",
    icon: Lock,
    name: "IAM",
    description: "Identity and access management",
    category: "Security"
  },
  {
    id: "cloudwatch",
    icon: CloudCog,
    name: "CloudWatch",
    description: "Monitoring and observability",
    category: "Management"
  }
];

export function InfrastructureView() {
  const [selectedService, setSelectedService] = useState<ServiceType>("none");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedServices = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  const renderServiceConfig = () => {
    switch (selectedService) {
      case "ec2":
        return <EC2ConfigForm />;
      case "s3":
        return <S3ConfigForm />;
      case "rds":
        return <RDSConfigForm />;
      case "ecs":
        return <ECSConfigForm />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Boxes className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="mb-2">No Service Selected</h3>
            <p className="text-gray-600">Select a service from the left to configure</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full">
      {/* Services List */}
      <div className="w-96 border-r bg-gray-50 p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="mb-2">AWS Services</h2>
          <p className="text-gray-600 mb-4">Select a AWS service to configure</p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <div key={category}>
              <h3 className="text-sm text-gray-500 mb-3">{category}</h3>
              <div className="space-y-2">
                {categoryServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    icon={service.icon}
                    name={service.name}
                    description={service.description}
                    onClick={() => setSelectedService(service.id as ServiceType)}
                    isActive={selectedService === service.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderServiceConfig()}
      </div>
    </div>
  );
}
