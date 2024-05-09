import { Metadata } from "next";
import Image from "next/image";
import { Testimonial } from "@/types/testimonial";
import SingleRating from "../Rating/SingleRating";
import { Company } from "@/types/company";
import stars from "../Common/Stars";
import { SetStateAction, useState } from "react";
import GeneralAssessmenta from "./GeneralAssessment";
import GeneralAssessment from "./GeneralAssessment";
import SaleryAndBenefits from "./SaleryAndBenefits";
import Interviews from "./Interviews";

export const metadata: Metadata = {
  title: "Career Compass - Podjetje",
  description: "Profil podjetja",
};

type Props = {
  company: Company;
};

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sabo Masties",
    designation: "Founder @ Rolex",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/author-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Margin Gesmu",
    designation: "Founder @ UI Hunter",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/author-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "William Smith",
    designation: "Founder @ Trorex",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/author-03.png",
    star: 5,
  },
];

const SingleCompanyPage = async ({ company }: Props) => {
  return (
    <div className="container mx-auto py-8 pt-[120px]">
      <div className="flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4 ">
          <Image
            src={company.logo}
            alt={company.name}
            width={150}
            height={200}
          />
        </div>
        <div className="pl-10 md:w-2/4">
          <h1 className="text-3xl font-bold">{company.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {company.industry}
          </p>
          {company.subindustry !== undefined ? (
            <p className="text-md text-gray-600 dark:text-gray-400">
              {company.subindustry.map((sub, index) => (
                <span key={index}>
                  {sub}
                  {index !== company.subindustry.length - 1 && ", "}
                </span>
              ))}
            </p>
          ) : (
            <p></p>
          )}
          <div className="mt-4 flex">{stars(company.avg_rating)}</div>
        </div>
      </div>
      <div className="my-10 border-t border-gray-300"></div>
      <div className="mt-10">
        <div className="container flex flex-col rounded-xl bg-sky-100 py-4 dark:bg-sky-900 lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-2 flex items-center lg:mb-0">
            <img
              src="/images/icons/email.png"
              alt="Email Icon"
              className="mr-2 h-6 w-6"
            />
            <p className="text-sky-700 dark:text-sky-300">{company.email}</p>
          </div>
          <div className="mb-2 flex items-center lg:mb-0">
            <img
              src="/images/icons/location.png"
              alt="Address Icon"
              className="mr-2 h-6 w-6"
            />
            <p className="text-sky-700 dark:text-sky-300">
              {company.address}, {company.city}
            </p>
          </div>
          <div className="flex items-center">
            <img
              src="/images/icons/link.png"
              alt="Website Icon"
              className="mr-2 h-6 w-6"
            />
            <p className="text-sky-700 dark:text-sky-300">{company.website}</p>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="mb-4 text-2xl font-semibold">Zaposlitve</h2>
          Podjetje nima objavljenih zaposlitev.
        </div>
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Komentarji in Ocene</h2>
          <div className="mt-[20px] flex flex-wrap gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
            <GeneralAssessment company={company} />
          </div>
          <div className="mt-[20px] flex flex-wrap gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
            <SaleryAndBenefits company={company} />
          </div>
          {/*<div className="mt-[20px] flex flex-wrap gap-y-8 px-4 md:items-start md:justify-between rounded-xl bg-gray-100 dark:bg-slate-700 py-[20px]">
            <Interviews company={company}/>
        </div>*/}
        </div>
      </div>
    </div>
  );
};

export default SingleCompanyPage;
