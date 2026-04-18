"use client";

import React from "react";
import { TrendingUp, Warehouse } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { team: "Equipe"  , visited: 12 },
  { team: "Equipe B", visited: 18 },
  { team: "Equipe C", visited: 15 },
  { team: "Equipe D", visited: 10 },
  { team: "Equipe E", visited: 22 },
  { team: "Equipe F", visited: 14 },
];

const chartConfig = {
  visited: {
    label: "Visites",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
};

export function VisitedHangarStats({ totalVisited }) {
  const [timeRange, setTimeRange] = React.useState("last-30-days");
  const [selectedDate, setSelectedDate] = React.useState("");
 console.log("totalVisited",totalVisited);
  return (
    <Card className="rounded-3xl border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 gap-4">
        <div className="space-y-1">
          <CardTitle className="">Hangars Visités</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <span className="text-xl text-gray-900 dark:text-white">
              {totalVisited}/395
            </span>
            <span className="text-gray-500">hangars au total</span>
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            className="h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-500/10 transition-all hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-44 rounded-xl border-gray-200 dark:border-gray-700 font-medium h-10 bg-white dark:bg-gray-900">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100 dark:border-gray-800 shadow-lg">
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="last-7-days">7 derniers jours</SelectItem>
              <SelectItem value="all">Tout</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] flex">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 32,
              left: 0,
            }}
          >
            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              opacity={0.3}
            />
            <YAxis
              dataKey="team"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="visited" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" hideLabel />}
            />
            <Bar
              dataKey="visited"
              fill="var(--color-visited)"
              radius={8}
              barSize={32}
            >
              <LabelList
                dataKey="team"
                position="insideLeft"
                offset={12}
                className="fill-white"
                fontSize={12}
              />
              <LabelList
                dataKey="visited"
                position="right"
                offset={12}
                className="fill-foreground"
                fontSize={14}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
