
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-parchment-200 dark:border-cave-700 parchment">
      <CardHeader className="pb-2 border-b border-parchment-200 dark:border-cave-700">
        <div className="mb-2 inline-flex rounded-lg bg-parchment-100 dark:bg-cave-700/50 p-2 text-parchment-800 dark:text-parchment-100">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-monomakh">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <CardDescription className="text-base text-parchment-900 dark:text-parchment-100/80">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
