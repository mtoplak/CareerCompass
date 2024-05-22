import { Company } from "@/types/company";
import React from "react";

type Props = {
  company: Company;
};

const DifficultyChart = ({ company }: Props) => {
  const { difficulty_percentage } = company;
  const { enostavno, srednje, težko } = difficulty_percentage;

  const total = enostavno + srednje + težko;
  const easyPercentage = (enostavno / total) * 100;
  const mediumPercentage = (srednje / total) * 100;
  const hardPercentage = (težko / total) * 100;

  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center bg-white dark:bg-dark ">
      <p className="text-md font-bold mb-2">Težavnost razgovora</p> {/* Title */}
      <div className="relative h-6">
        <svg className="h-full w-full">
          <rect
            x="0"
            y="0"
            width={`${easyPercentage}%`}
            height="100%"
            fill="#3730a3"
          />
          <rect
            x={`${easyPercentage}%`}
            y="0"
            width={`${mediumPercentage}%`}
            height="100%"
            fill="#C7D2FE"
          />
          <rect
            x={`${easyPercentage + mediumPercentage}%`}
            y="0"
            width={`${hardPercentage}%`}
            height="100%"
            fill="#D5DBDB"
          />
        </svg>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-indigo-800"></span>
          <span>Enostavno ({Math.round(easyPercentage)}%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-indigo-200"></span>
          <span>Srednje ({Math.round(mediumPercentage)}%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-gray-400"></span>
          <span>Težko ({Math.round(hardPercentage)}%)</span>
        </div>
      </div>
    </div>
  );
};

export default DifficultyChart;
