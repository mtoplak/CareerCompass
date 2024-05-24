import React from "react";
import stars from "../Common/Stars";
import { Company } from "@/types/company";
import SingleSaleryComment from "../Comments/SingleSaleryComment";
import RemoteWorkChart from "../Rating/RemoteWorkChart";

type Props = {
  company: Company;
};

const SaleryAndBenefits = ({ company }: Props) => {
  const ratingIcons = [
    { label: "Ugodnosti", rating: company.avg_benefits },
    { label: "Bonusi", rating: company.avg_bonuses },
  ].map((item, index) => (
    <div key={index} className="flex items-center lg:gap-4">
      <span className="mr-1 mt-3">{item.label}:</span>
      {stars(item.rating)}
    </div>
  ));

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <div className="w-full lg:w-2/5">
        <div className="mb-3 rounded-xl bg-white px-4 pb-[30px] pt-[10px] shadow-testimonial dark:bg-dark sm:px-[30px]">
          <div className="mb-1 flex flex-col gap-1">{ratingIcons}</div>
        </div>
        <div className="flex w-full items-center justify-center rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]">
          <RemoteWorkChart company={company} />
        </div>
      </div>
      <div className="flex w-full flex-col lg:w-3/5">
        <SingleSaleryComment company={company} />
      </div>
    </div>
  );
};

export default SaleryAndBenefits;
