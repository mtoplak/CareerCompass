import React from "react";
import stars from "../Common/Stars";
import { Company } from "@/types/company";
import SingleComment from "./SingleComment";

type Props = {
  company: Company;
};

const SaleryAndBenefits = async ({ company }: Props) => {
  const ratingIcons = [
    { label: "Ugodnosti", rating: company.avg_benefits },
    { label: "Bonusi", rating: company.avg_bonuses },
  ].map((item, index) => (
    <div key={index} className="flex items-center">
      <span className="mr-1 mt-4">{item.label}:</span>
      {stars(item.rating)}
    </div>
  ));

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <div className="w-full lg:w-3/5">
        <div className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]">
          <div className="mb-1 flex flex-col gap-1">{ratingIcons}</div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-2/5">
        <SingleComment company={company} />
      </div>
    </div>
  );
};

export default SaleryAndBenefits;
