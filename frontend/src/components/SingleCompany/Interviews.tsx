import { Company } from "@/types/company";
import SingleInterviewComment from "../Comments/SingleInterviewComment";
import ExperienceChart from "../Rating/ExperienceChart";
import DifficultyChart from "../Rating/DifficultyChart";

type Props = {
  company: Company;
};

const Interviews = ({ company }: Props) => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <div className="w-full lg:w-2/5">
        <div className="mb-3 flex w-full items-center justify-center rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]">
          <ExperienceChart company={company} />
        </div>
        <div className="flex w-full items-center justify-center rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]">
          <DifficultyChart company={company} />
        </div>
      </div>
      <div className="flex w-full flex-col lg:w-3/5">
        <SingleInterviewComment company={company} />
      </div>
    </div>
  );
};

export default Interviews;
