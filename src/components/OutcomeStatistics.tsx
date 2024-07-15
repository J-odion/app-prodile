import { Mail, Percent, WalletCards } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import OutcomeStatisticsCard from "./Cards/OutcomeStatisticsCard";

const OutcomeStatistics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 p-4 mb-8 w-full justify-center">
      <Card className="px-6">
        <CardHeader>
          <CardTitle>Outcome Statistics</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <OutcomeStatisticsCard />
        </CardContent>
      </Card>
      <div>
        <Image
          src="/images/map.png"
          width={600}
          height={600}
          alt={"A map of agric"}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default OutcomeStatistics;
