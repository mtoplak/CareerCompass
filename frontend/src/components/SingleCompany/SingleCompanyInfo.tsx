import { Metadata } from "next";
import Image from "next/image";
import SingleRating from "../Rating/SingleRating";
import { Company } from "@/types/company";
import stars from "../Common/Stars";
import GeneralAssessmenta from "./GeneralAssessment";
import GeneralAssessment from "./GeneralAssessment";
import SaleryAndBenefits from "./SaleryAndBenefits";
import Interviews from "./Interviews";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Career Compass - Podjetje",
  description: "Profil podjetja",
};

type Props = {
  company: Company;
};

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
          <div className="mt-4">
            {company.ratings_count === 0 && company.avg_rating === 0 ? (
              <span className="text-sm">Podjetje še ni bilo ocenjeno</span>
            ) : (
              <>
                <div className="flex items-center">
                  {stars(company.avg_rating)}
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  Število ocen: {company.ratings_count}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="mb-4 md:mb-0 md:w-1/4 ">
          <Link
            href={`/ocenjevanje/${company.slug}`}
            className="rounded bg-indigo-700 px-4 py-2 font-bold text-white hover:bg-indigo-900 dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-300"
          >
            Oceni podjetje
          </Link>
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
            <p className="text-sky-700 dark:text-sky-300">
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </div>
          <div className="mb-2 flex items-center lg:mb-0">
            <img
              src="/images/icons/location.png"
              alt="Address Icon"
              className="mr-2 h-6 w-6"
            />
            <p className="text-sky-700 dark:text-sky-300">
              <a
                href={`https://www.google.com/maps/search/${company.address + " " + company.city}`}
              >
                {company.address}, {company.city}
              </a>
            </p>
          </div>
          <div className="flex items-center">
            <img
              src="/images/icons/link.png"
              alt="Website Icon"
              className="mr-2 h-6 w-6"
            />
            <p className="text-sky-700 dark:text-sky-300">
              <a href={company.website}>{company.website}</a>
            </p>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="mb-4 text-2xl font-semibold">Zaposlitve</h2>
          Podjetje nima objavljenih zaposlitev.
        </div>
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Komentarji in Ocene</h2>
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
            <h2 className="mb-2 text-xl font-semibold">Splošna ocena</h2>
            <GeneralAssessment company={company} />
          </div>
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
            <h2 className="mb-2 text-xl font-semibold">Plača in ugodnosti</h2>
            <SaleryAndBenefits company={company} />
          </div>
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
            <h2 className="mb-2 text-xl font-semibold">Razgovori</h2>
            <Interviews company={company} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCompanyPage;
