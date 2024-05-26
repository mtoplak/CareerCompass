"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "@/constants";
import NoProduct from "../NotFound/NoProduct";
import JobAdvertisementFilter from "./JobAdvertisementFilter";
import JobPage from "./JobPage";
import SavedJobAdvertisementsFilter from "./SavedAdvertisementsFilter";
import toast from "react-hot-toast";
import ResultsLoader from "../Common/ResultsLoader";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

const JobSearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(0);
  const [active, setActive] = useState(1);
  const searchParams = useSearchParams();

  const delovno_mesto = searchParams.get("delovno_mesto") || "";
  const lokacija = searchParams.get("lokacija") || "";
  const dejavnost = searchParams.get("dejavnost") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${api}/job/search?position=${delovno_mesto}&city=${lokacija}&industry=${dejavnost}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNoOfPages(Math.ceil(data.count / 28));
        setJobs(data.jobs);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();

    return () => {};
  }, [delovno_mesto, lokacija, dejavnost]);

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
    setActive(stran);
    setIsLoading(true);
    try {
      const response = await fetch(`${api}/job/search?page=${stran}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      setJobs(data.jobs);
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

  const pages = Array.from({ length: noOfPages }, (_, index) => index + 1);

  const visiblePages = pages.filter((page) => {
    return (
      page === 1 ||
      page === noOfPages ||
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
    <>
      <JobAdvertisementFilter
        delovno_mesto={delovno_mesto}
        lokacija={lokacija}
        dejavnost={dejavnost}
      />
      <SavedJobAdvertisementsFilter isSavedPage={false} />
      {!isLoading ? <JobPage jobs={jobs} /> : <ResultsLoader />}
      {!isLoading && jobs.length === 0 && <NoProduct />}
      {noOfPages > 1 && (
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
              disabled={active === noOfPages}
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
    </>
  );
};

export default JobSearchResults;
