import React from "react";
import stars from "../Common/Stars";
import { Company } from "@/types/company";
import SingleGeneralComment from "../Comments/SingleGeneralComment";

type Props = {
  company: Company;
};

const GeneralAssessment = ({ company }: Props) => {
  const ratingIcons = [
    { label: "Ekipa", rating: company.avg_team },
    { label: "Osebni razvoj", rating: company.avg_personal_development },
    { label: "Fleksibilnost", rating: company.avg_flexibility },
    {
      label: "Ravnovesje dela in življenja",
      rating: company.avg_work_life_balance,
    },
    { label: "Delovno vzdušje", rating: company.avg_work_environment },
    { label: "Vodstvo", rating: company.avg_leadership },
  ].map((item) => (
    <div key={item.label} className="flex items-center lg:gap-4">
      <span className="mr-1 mt-3">{item.label}:</span>
      {stars(item.rating)}
    </div>
  ));

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <div className="w-full lg:w-2/5">
        <div className="rounded-xl bg-white px-4 pb-[30px] pt-[10px] shadow-testimonial dark:bg-dark sm:px-[30px]">
          <div className="mb-1 grow flex-col gap-1">{ratingIcons}</div>
        </div>
      </div>
      <div className="w-full grow flex-col lg:w-3/5">
        <SingleGeneralComment company={company} />
      </div>
    </div>
  );
};

export default GeneralAssessment;
