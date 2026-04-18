"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MOCK_PROVINCES = [
  { name: "Muyinga", visited: 124, total: 150 },
  { name: "Bujumbura", visited: 198, total: 320 },
  { name: "Kirundo", visited: 87, total: 110 },
  { name: "Gitega", visited: 156, total: 240 },
  { name: "Ngozi", visited: 92, total: 180 },
];

export function ProvinceVisitedStats() {
  return (
    <Card className="rounded-3xl border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Progression par Province</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {MOCK_PROVINCES.map((province) => {
          const progress = (province.visited / province.total) * 100;
          return (
            <div key={province.name} className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-brand-500 transition-colors">
                  {province.name}
                </span>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  <span className="text-gray-900 dark:text-white">
                    {province.visited}
                  </span>
                  <span className="mx-1">/</span>
                  {province.total}
                </span>
              </div>
              <div className="relative pt-1">
                <Progress
                  value={progress}
                  className="h-2 rounded-full bg-gray-100 dark:bg-gray-800"
                />
                <div className="absolute right-0 -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black bg-gray-900 text-white px-1.5 py-0.5 rounded shadow-sm">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
