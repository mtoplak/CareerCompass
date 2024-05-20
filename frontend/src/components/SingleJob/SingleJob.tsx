const SingleJob = ({ job }: { job: any }) => {
  const {
    position,
    description,
    city,
    company,
    source,
    url
  } = job;

  return (
    <div className="w-full px-4 lg:w-1/2 xl:w-1/2">
    <div
      className="group mb-8 rounded-xl bg-white px-5 pb-10 pt-10 shadow-testimonial dark:bg-dark dark:shadow-none sm:h-[260px] sm:h-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between px-4">
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
            <p className="text-sm text-body-color dark:text-dark-6 mb-1"><b className="text-dark dark:text-light">Mesto: </b>{city}</p>
            <p className="text-sm text-body-color dark:text-dark-6 mb-1"><b className="text-dark dark:text-light">Podjetje: </b>{company}</p>
            <p className="text-sm text-body-color dark:text-dark-6 mb-1"><b className="text-dark dark:text-light">Vir: </b>
            <a href={url} className="text-indigo-700 dark:text-indigo-300 underline underline-offset-1">
                {source}
              </a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SingleJob;
