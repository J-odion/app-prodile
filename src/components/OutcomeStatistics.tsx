"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle
} from "@/components/ui/chart"
const chartData = [
  { month: "January", revenue: 186, disbursement: 80 },
  { month: "February", revenue: 305, disbursement: 200 },
  { month: "March", revenue: 237, disbursement: 120 },
  { month: "April", revenue: 73, disbursement: 190 },
  { month: "May", revenue: 209, disbursement: 130 },
  { month: "June", revenue: 214, disbursement: 140 },
]

const chartConfig = {
  revenue: {
    label: "revenue",
    color: "hsl(var(--chart-1))",
  },
  disbursement: {
    label: "disbursement",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig



export function OutcomeStatistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Outcome Statistics - Revenue / Disbursement</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
        
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="disbursement"
              type="monotone"
              stroke="var(--color-disbursement)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Revenue is trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total transactions for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
