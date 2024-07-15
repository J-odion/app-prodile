import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


type MetricsCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
};

const MetricsCard = ({
  title,
  value,
  change,
  changeType,
}: MetricsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-gray-500 text-sm font-medium">{title}</CardTitle>
        <p
        className={`text-sm ${
          changeType === "increase" ? "text-green-500" : "text-red-500"
        }`}
      >
        {changeType === "increase" ? "▲" : "▼"} {change}
      </p>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          +20.1% from last month
        </p>
      </CardContent>

    </Card>
  );
};

export default MetricsCard;
