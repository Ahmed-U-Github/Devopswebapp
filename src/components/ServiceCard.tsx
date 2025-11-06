import { Card } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  onClick: () => void;
  isActive?: boolean;
}

export function ServiceCard({ icon: Icon, name, description, onClick, isActive }: ServiceCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all hover:shadow-lg hover:border-blue-500 ${
        isActive ? "border-blue-500 bg-blue-50" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Icon className="w-5 h-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1">{name}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
}
