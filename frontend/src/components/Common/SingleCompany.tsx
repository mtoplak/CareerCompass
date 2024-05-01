import Image from "next/image";
import Link from "next/link";
const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z" />
  </svg>
);

const SingleCompany = ({ company }: { company: any }) => {
  const { logo, name, industry, slug } = company;

  let ratingIcons = [];
  for (let index = 0; index < 5; index++) {
    ratingIcons.push(
      <span key={index} className="text-[#fbb040]">
        {starIcon}
      </span>,
    );
  }
  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
      <div className="transition ease-in-out delay-150 group mb-8 rounded-xl bg-white px-5 pb-10 pt-12 shadow-testimonial dark:bg-dark dark:shadow-none hover:-translate-y-1 hover:scale-105 hover:bg-indigo-50 duration-300" style={{ height: '380px' }}>
        <Link href={`/podjetje/${slug}`}>
          <div className="relative z-10 mx-auto mb-5 h-[120px] w-[120px] flex justify-center items-center">
            <Image
              src={logo}
              alt={name}
              className="w-full"
              width={120}
              height={120}
              style={{ maxHeight: '120px' }}
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
            {ratingIcons}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SingleCompany;
