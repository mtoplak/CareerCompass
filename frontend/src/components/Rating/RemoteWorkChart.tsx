import { Company } from "@/types/company";
import React from "react";

type Props = {
  company: Company;
};

const RemoteWorkChart = async ({ company }: Props) => {
  const { remote_work_percentage } = company;
  const { yes, no } = remote_work_percentage;

  const total = yes + no;
  const yesPercentage = (yes / total) * 100;
  const noPercentage = (no / total) * 100;

  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center bg-white dark:bg-dark ">
      <p className="text-md font-bold mb-2">Delo od doma</p>
      <div className="relative h-6">
        <svg className="h-full w-full">
          <rect
            x="0"
            y="0"
            width={`${yesPercentage}%`}
            height="100%"
            fill="#3730a3"
          />
          <rect
            x={`${yesPercentage}%`}
            y="0"
            width={`${noPercentage}%`}
            height="100%"
            fill="#C7D2FE"
          />
        </svg>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-indigo-800"></span>
          <span> Da ({yesPercentage.toFixed(1)}%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-indigo-200"></span>
          <span> Ne ({noPercentage.toFixed(1)}%)</span>
        </div>
      </div>
    </div>
  );
};

export default RemoteWorkChart;
