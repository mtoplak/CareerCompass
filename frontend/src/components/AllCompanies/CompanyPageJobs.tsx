"use client";
import { useEffect, useState } from "react";
import SingleCompany from "../Common/SingleCompany";
import { Company } from "@/types/company";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { api } from "@/constants";
import ResultsLoader from "../Common/ResultsLoader";

const CompanyPageJobs = ({
  companies,
  noOfPages,
  ime,
  lokacija,
  dejavnost,
  ocena,
  delovno_mesto,
}: {
  companies?: Company[];
  noOfPages?: number;
  ime?: string;
  lokacija?: string;
  dejavnost?: string;
  ocena?: string;
  delovno_mesto?: boolean;
}) => {
  const [noOfPages2, setNoOfPages] = useState(0);
  const [companies2, setCompanies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${api}/company/pagination?page=1`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNoOfPages(Math.ceil(data.count / 28));
        setCompanies(data.companies);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!companies) {
      fetchCompanies();
    } else {
      setCompanies(companies);
      setNoOfPages(noOfPages as number);
      setIsLoading(false);
    }
  }, [companies, noOfPages]);

  const getItemProps = (index: any) => ({
    className: `${active === index ? "bg-black" : "bg-transparent text-gray-500"} flex items-center justify-center w-8 h-8`,
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
    fetchPage(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    fetchPage(active - 1);
  };

  const fetchPage = async (stran: number) => {
    setIsLoading(true);
    try {
      let url = `${api}/company/pagination?page=${stran}`;
      if (
        ime ||
        lokacija ||
        dejavnost ||
        ocena ||
        delovno_mesto !== undefined
      ) {
        url = `${api}/company/searchPaginated?name=${ime}&city=${lokacija}&industry=${dejavnost}&rating=${ocena}&job=${delovno_mesto}&page=${stran}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCompanies(data.companies);
      setActive(stran);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      scrollToTop();
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pages = Array.from({ length: noOfPages2 }, (_, index) => index + 1);

  const visiblePages = pages.filter((page) => {
    return (
      page === 1 ||
      page === noOfPages2 ||
      page === active ||
      page === active - 1 ||
      page === active + 1
    );
  });

  const paginationItems: any = [];
  let lastPage = 0;

  visiblePages.forEach((page, index) => {
    if (page - lastPage > 1) {
      paginationItems.push(
        <span
          key={`ellipsis-${index}`}
          className="text-center text-black dark:text-white"
        >
          ...
        </span>,
      );
    }
    paginationItems.push(
      <IconButton
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        {...getItemProps(page)}
        key={page}
        onClick={() => fetchPage(page)}
        className={`flex items-center justify-center text-center text-black dark:text-black ${page === active ? "bg-indigo-700 text-white" : "bg-white"}`}
      >
        {page}
      </IconButton>,
    );
    lastPage = page;
  });

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[10px]">
      <div className="container px-4">
        <div className="mb-[50px] mt-[10px] flex flex-wrap gap-y-8">
          {isLoading ? (
            <ResultsLoader />
          ) : (
            companies2.map((company: Company) => (
              <SingleCompany key={company.name} company={company} />
            ))
          )}
        </div>
        {noOfPages2 > 1 && (
          <div className="mb-12 flex flex-wrap items-center justify-center gap-4 bg-gray-1 p-4 dark:bg-dark-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="text"
                className="flex items-center gap-2 dark:text-white"
                onClick={prev}
                disabled={active === 1}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Nazaj
              </Button>
              {paginationItems}
              <Button
                variant="text"
                className="flex items-center gap-2 dark:text-white"
                onClick={next}
                disabled={active === noOfPages2}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Naprej
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyPageJobs;
