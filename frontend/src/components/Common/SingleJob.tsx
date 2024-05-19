const SingleJob = ({ job }: { job: any }) => {
  const { position, company, url, city } = job;

  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
      <a href={url} target="_blank">
        <div
          className="group mb-8 rounded-xl bg-white px-5 pb-10 pt-12 shadow-testimonial transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-50 dark:bg-dark dark:shadow-none"
          style={{ height: "280px" }}
        >
          <div className="relative z-10 mx-auto mb-2 flex h-[120px] items-center justify-center text-center">
            <h3 className="mb-1 text-lg font-semibold text-dark dark:text-white">
              {position}
            </h3>
          </div>
          <div className="text-center">
            <p className="mb-5 text-sm text-body-color dark:text-dark-6">
              {company} - {city}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default SingleJob;
