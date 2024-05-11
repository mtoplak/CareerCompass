import Image from "next/image";
import Link from "next/link";
import stars from "./Stars";

const SingleCompany = ({ company }: { company: any }) => {
  const { logo, name, industry, slug } = company;

  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
      <div
        className="group mb-8 rounded-xl bg-white px-5 pb-10 pt-12 shadow-testimonial transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-50 dark:bg-dark dark:shadow-none"
        style={{ height: "380px" }}
      >
        <Link href={`/podjetje/${slug}`}>
          <div className="relative z-10 mx-auto mb-5 flex h-[120px] w-[120px] items-center justify-center">
            <Image
              src={logo}
              alt={name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-full"
              style={{ maxHeight: "120px" }}
            />
          </div>
          <div className="text-center">
            <h3 className="mb-1 text-lg font-semibold text-dark dark:text-white">
              {name}
            </h3>
            <p className="mb-5 text-sm text-body-color dark:text-dark-6">
              {industry}
            </p>
          </div>
          <div className="mb-[18px] flex items-center justify-center gap-[2px]">
            {stars(company.avg_rating)}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SingleCompany;
