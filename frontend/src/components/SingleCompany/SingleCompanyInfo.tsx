import { Metadata } from "next";
import Image from "next/image";
import { Company } from "@/types/company";
import stars from "../Common/Stars";
import GeneralAssessment from "./GeneralAssessment";
import SaleryAndBenefits from "./SaleryAndBenefits";
import Interviews from "./Interviews";
import Link from "next/link";
import { JobAdvertisement } from "@/types/job";
import SingleJob from "../SingleJob/SingleJob";

export const metadata: Metadata = {
  title: "Career Compass - Podjetje",
  description: "Profil podjetja",
};

type Props = {
  company: Company;
  jobAdvertisements: JobAdvertisement[];
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

const SingleCompanyPage = async ({ company, jobAdvertisements }: Props) => {
  console.log(jobAdvertisements);
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
            href={`/ocenjevanje/${company.slug}`}
            className="rounded-lg bg-indigo-700 px-6 py-3 font-medium text-white hover:bg-opacity-20 hover:text-dark dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-300"
          >
            Oceni podjetje
          </Link>
          <Link
            href={`/dodaj-zaposlitev/${company.slug}`}
            className="rounded-lg bg-indigo-700 px-6 py-3 font-medium text-white hover:bg-opacity-20 hover:text-dark dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-300"
          >
            Dodaj Zaposlitev
          </Link>
        </div>
      </div>
      <div className="my-10 border-t border-gray-300"></div>
      <div className="mt-10">
        <div className="container flex flex-col rounded-xl bg-indigo-100 px-6 py-4 dark:bg-sky-900 lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-2 flex items-center lg:mb-0">
            {company.email && (
              <>
                <Image
                  src="/images/icons/email.png"
                  alt="Email Icon"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="mr-2 h-6 w-6"
                />
                <p className="text-indigo-700 dark:text-sky-300">
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </p>
              </>
            )}
          </div>
          <div className="mb-2 flex items-center lg:mb-0">
            <Image
              src="/images/icons/location.png"
              alt="Address Icon"
              width="0"
              height="0"
              sizes="100vw"
              className="mr-2 h-6 w-6"
            />
            <p className="text-indigo-700 dark:text-sky-300">
              <a
                href={`https://www.google.com/maps/search/${company.address + " " + company.city}`}
              >
                {company.address}, {company.city}
              </a>
            </p>
          </div>
          <div className="flex items-center">
            {company.website && (
              <>
                <Image
                  src="/images/icons/link.png"
                  alt="Website Icon"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="mr-2 h-6 w-6"
                />
                <p className="text-indigo-700 dark:text-sky-300">
                  <a href={company.website}>{company.website}</a>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="mt-20 ">
          <h2 className="mb-4 text-2xl font-semibold">Zaposlitve</h2>
          <div className="mb-[50px] mt-[10px] flex flex-wrap gap-y-8">
            {jobAdvertisements.length > 0 ? (
              jobAdvertisements.map((job, index) => (
                <SingleJob key={index} job={job} />
              ))
            ) : (
              <p>Podjetje nima objavljenih zaposlitev.</p>
            )}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Komentarji in ocene</h2>
          {company.ratings_count > 0 ? (
            <>
              <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
                <h2 className="mb-2 text-xl font-semibold">Splošna ocena</h2>
                <GeneralAssessment company={company} />
              </div>
              <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
                <h2 className="mb-2 text-xl font-semibold">
                  Plača in ugodnosti
                </h2>
                <SaleryAndBenefits company={company} />
              </div>
              <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
                <h2 className="mb-2 text-xl font-semibold">Razgovori</h2>
                <Interviews company={company} />
              </div>
            </>
          ) : (
            <div className="">
              <p>
                To podjetje še ni bilo ocenjeno.
                <Link
                  href={`/ocenjevanje/${company.slug}`}
                  className="ml-1 text-indigo-700 hover:underline"
                >
                  Oceni ga prvi.
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCompanyPage;
