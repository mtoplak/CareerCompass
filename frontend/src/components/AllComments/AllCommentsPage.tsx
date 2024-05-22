"use client";
import { Metadata } from "next";
import { Company } from "@/types/company";
import { useState } from "react";
import SingleGeneralComment from "../Comments/SingleGeneralComment";
import SingleInterviewComment from "../Comments/SingleInterviewComment";
import SingleSaleryComment from "../Comments/SingleSaleryComment";
import Link from "next/link";
import stars from "../Common/Stars";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Career Compass - Podjetje",
  description: "Komentarji podjetja",
};

type Props = {
  company: Company;
};

const SingleCompanyPage = ({ company }: Props) => {
  const [activeCategory, setActiveCategory] = useState("general");

  const renderComments = () => {
    switch (activeCategory) {
      case "general":
        return (
          <div className="container">
            {company.general_assessment_comments.length > 0 ? (
              company.general_assessment_comments
                .map((comment, index) => (
                  <div
                    key={index}
                    className="mb-3 rounded-xl bg-white px-4 py-[20px] shadow-testimonial dark:bg-dark sm:px-[30px]"
                  >
                    <p className="text-gray-800 dark:text-gray-200">{comment}</p>
                  </div>
                ))
            ) : (
              <p className="mt-10 text-gray-800 dark:text-gray-200">
                To podjetje še ni prejelo komentarjev.
              </p>
            )}
          </div>
        );;
      case "interviews":
        return (
        <div className="container">
          {company.interviews_comments.length > 0 ? (
            company.interviews_comments
              .map((comment, index) => (
                <div
                  key={index}
                  className="mb-3 rounded-xl bg-white px-4 py-[20px] shadow-testimonial dark:bg-dark sm:px-[30px]"
                >
                  <p className="text-gray-800 dark:text-gray-200">{comment}</p>
                </div>
              ))
          ) : (
            <p className="mt-10 text-gray-800 dark:text-gray-200">
              To podjetje še ni prejelo komentarjev.
            </p>
          )}
        </div>
      );
      case "salary":
        return (
          <div className="container">
            {company.salary_and_benefits_comments.length > 0 ? (
              company.salary_and_benefits_comments
                .map((comment, index) => (
                  <div
                    key={index}
                    className="mb-3 rounded-xl bg-white px-4 py-[20px] shadow-testimonial dark:bg-dark sm:px-[30px]"
                  >
                    <p className="text-gray-800 dark:text-gray-200">{comment}</p>
                  </div>
                ))
            ) : (
              <p className="mt-10 text-gray-800 dark:text-gray-200">
                To podjetje še ni prejelo komentarjev.
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const getRatingText = (count: number) => {
    if (count === 1) {
      return `${count} ocena`;
    } else if (count === 2) {
      return `${count} oceni`;
    } else if (count > 2 && count < 5) {
      return `${count} ocene`;
    } else {
      return `${count} ocen`;
    }
  };

  return (
    <div className="container mx-auto py-8 pt-[120px]">
      <div className="flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4 ">
          <Image
            src={company.logo}
            alt={company.name}
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto"
            style={{ width: "150px", height: "auto" }}
          />
        </div>
        <div className="pl-10 md:w-2/4">
          <h1 className="text-3xl font-bold">{company.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {company.industry}
          </p>
          {Array.isArray(company.subindustry) ? (
            <p className="text-md text-gray-600 dark:text-gray-400">
              {company.subindustry.map((sub: string, index: number) => (
                <span key={index}>
                  {sub}
                  {index !== company.subindustry.length - 1 && ", "}
                </span>
              ))}
            </p>
          ) : (
            <p></p>
          )}
          <div className="mt-4">
            {company.ratings_count === 0 && company.avg_rating === 0 ? (
              <span className="text-sm">Podjetje še ni bilo ocenjeno</span>
            ) : (
              <>
                <div className="flex items-center">
                  {stars(company.avg_rating)}
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  {getRatingText(company.ratings_count)}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="mb-4 mt-5 flex justify-end md:mb-0 md:w-1/4">
          <Link
            href={`/podjetje/${company.slug}`}
            className="rounded-lg bg-indigo-700 px-6 py-3 font-medium text-white hover:bg-opacity-20 hover:text-dark dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-300"
          >
            Nazaj na profil podjetja
          </Link>
        </div>
      </div>
      <div className="my-10 border-t border-gray-300"></div>
      <div className="flex flex-col mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:flex-row md:items-start md:justify-between">
        <div className="p-4 md:mr-4 md:w-1/4">
          <nav className="md:flex md:flex-col">
            <button
              className={`flex mb-2 block px-4 py-2 font-medium w-full ${
                activeCategory !== "general" ? "bg-white dark:bg-slate-600" : ""
              }`}
              onClick={() => setActiveCategory("general")}
            >
              Splošna ocena
            </button>
            <button
              className={`flex mb-2 block px-4 py-2 font-medium w-full ${
                activeCategory !== "salary" ? "bg-white dark:bg-slate-600" : ""
              }`}
              onClick={() => setActiveCategory("salary")}
            >
              Plače in ugodnosti
            </button>
            <button
              className={`flex mb-2 block px-4 py-2 font-medium w-full ${
                activeCategory !== "interviews" ? "bg-white dark:bg-slate-600" : ""
              }`}
              onClick={() => setActiveCategory("interviews")}
            >
              Razgovori
            </button>
          </nav>
        </div>
        <div className="w-full md:w-3/4 rounded p-4">{renderComments()}</div>
      </div>
    </div>
  );
};

export default SingleCompanyPage;
