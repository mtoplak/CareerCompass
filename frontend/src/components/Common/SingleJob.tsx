import Link from "next/link";
import JobActions from "./JobButton";
import slugify from "slugify";

const SingleJob = ({
  job,
  canBeSaved,
  isSaved,
  companyPage = false,
}: {
  job: any;
  canBeSaved: boolean;
  isSaved: boolean;
  companyPage?: boolean;
}) => {
  const { _id, position, description, city, company, source, url } = job;

  const jobContent = (
    <div className="flex flex-col justify-between px-4 sm:flex-row">
      <div className="sm:w-3/5">
        <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">
          {position}
        </h3>
        <p className="mb-5 text-justify text-sm text-body-color dark:text-dark-6">
          {description}
        </p>
      </div>
      <div className="sm:w-2/5">
        <div className="sm:ml-10 sm:mt-8">
          <p className="mb-1 text-sm text-body-color dark:text-dark-6">
            <b className="text-dark dark:text-light">Lokacija: </b>
            {city}
          </p>
          <p className="mb-1 text-sm text-body-color dark:text-dark-6">
            <b className="text-dark dark:text-light">Podjetje: </b>
            {companyPage ? (
              company
            ) : (
              <Link
                href={`podjetje/${slugify(company, { lower: true, strict: true })}`}
                className="text-indigo-700 underline underline-offset-1 dark:text-indigo-300"
              >
                {company}
              </Link>
            )}
          </p>
          <p className="mb-1 text-sm text-body-color dark:text-dark-6">
            <b className="text-dark dark:text-light">Vir: </b>
            <a
              href={url}
              target="_blank"
              className="text-indigo-700 underline underline-offset-1 dark:text-indigo-300"
            >
              {source}
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full px-4 lg:w-1/2 xl:w-1/2">
      {source === "Career Compass" ? (
        <div className="rounded-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-50 dark:bg-dark dark:shadow-none lg:min-h-[320px]">
          <div className="group mb-8 h-auto rounded-xl bg-white px-5 pb-10 pt-10 shadow-testimonial dark:bg-dark dark:shadow-none lg:min-h-[320px]">
            <a href={`/zaposlitev/${_id}`} className="block">
              {jobContent}
            </a>
            {canBeSaved && <JobActions job={job} isSaved={isSaved} />}
          </div>
        </div>
      ) : (
        <div className="group mb-8 h-auto rounded-xl bg-white px-5 pb-10 pt-10 shadow-testimonial dark:bg-dark dark:shadow-none lg:min-h-[320px]">
          {jobContent}
          {canBeSaved && <JobActions job={job} isSaved={isSaved} />}
        </div>
      )}
    </div>
  );
};

export default SingleJob;
