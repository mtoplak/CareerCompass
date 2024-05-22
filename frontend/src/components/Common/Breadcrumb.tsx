import Link from "next/link";

const Breadcrumb = ({
  pageName,
  pageDescription,
}: {
  pageName: string;
  pageDescription?: string;
}) => {
  return (
    <>
      <section className="relative overflow-hidden bg-indigo-800 bg-[url('/images/hero/hero-background-indigo-700.png')] pb-[60px] pt-[120px] md:pt-[130px] lg:pt-[160px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div className="text-center">
                <h1 className="mb-4 text-3xl font-bold text-white dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
                  {pageName}
                </h1>
                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                  {pageDescription}
                </p>

                <ul className="flex items-center justify-center gap-[10px]">
                  <li>
                    <Link
                      href="/"
                      className="flex items-center gap-[10px] text-base font-medium text-white dark:text-white"
                    >
                      Domov
                    </Link>
                  </li>
                  <li>
                    <p className="flex items-center gap-[10px] text-base font-medium text-slate-400">
                      <span className="text-slate-400 dark:text-dark-6">
                        {" "}
                        /{" "}
                      </span>
                      {pageName}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcrumb;
