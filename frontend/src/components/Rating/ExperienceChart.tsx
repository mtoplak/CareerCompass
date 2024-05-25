import { Company } from "@/types/company";

type Props = {
  company: Company;
};

const ExperienceChart = ({ company }: Props) => {
  const { experience_percentage } = company;
  const { pozitivna, nevtralna, negativna } = experience_percentage;

  const total = pozitivna + nevtralna + negativna;
  const positivePercentage = (pozitivna / total) * 100;
  const neutralPercentage = (nevtralna / total) * 100;
  const negativePercentage = (negativna / total) * 100;

  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center bg-white dark:bg-dark ">
      <p className="text-md mb-2 font-bold">Izkušnja z razgovorom</p>
      <div className="relative h-6">
        <svg className="h-full w-full">
          <rect
            x="0"
            y="0"
            width={`${positivePercentage}%`}
            height="100%"
            fill="#3730a3"
          />
          <rect
            x={`${positivePercentage}%`}
            y="0"
            width={`${neutralPercentage}%`}
            height="100%"
            fill="#C7D2FE"
          />
          <rect
            x={`${positivePercentage + neutralPercentage}%`}
            y="0"
            width={`${negativePercentage}%`}
            height="100%"
            fill="#D5DBDB"
          />
        </svg>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-indigo-800"></span>
          <span>Pozitivna ({Math.round(positivePercentage)}%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-indigo-200"></span>
          <span>Nevtralna ({Math.round(neutralPercentage)}%)</span>
        </div>
        <div className="flex items-center space-x-2 ">
          <span className="h-3 w-3 rounded-full bg-gray-400"></span>
          <span>Negativna ({Math.round(negativePercentage)}%)</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceChart;
