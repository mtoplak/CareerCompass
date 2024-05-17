"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import CompanyPageJobs from "@/components/AllCompanies/CompanyPageJobs";
import { api } from "@/constants";
import CompanyFilter from "./CompanyFilter";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import NoProduct from "../NotFound/NoProduct";

const SearchResults = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(1);
  const [noOfPages, setNoOfPages] = useState(0);
  const searchParams = useSearchParams();

  const ime = searchParams.get("ime") || "";
  const lokacija = searchParams.get("lokacija") || "";
  const dejavnost = searchParams.get("dejavnost") || "";
  const ocena = searchParams.get("ocena") || "";

  const getItemProps = (index: any) => ({
    className: `${active === index ? "bg-black text-white" : "bg-transparent text-gray-500"} flex items-center justify-center w-8 h-8`,
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

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${api}/company/searchPaginated?name=${ime}&city=${lokacija}&industry=${dejavnost}&rating=${ocena}`,
        );
        const res = await fetch(
          `${api}/company/search?name=${ime}&city=${lokacija}&industry=${dejavnost}&rating=${ocena}`,
        );
        const vsi = await res.json();
        setNoOfPages(Math.ceil(vsi.length / 28));
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();

    return () => {};
  }, [ime, lokacija, dejavnost, ocena]);

  const fetchPage = async (stran: number) => {
    setActive(stran);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${api}/company/searchPaginated?name=${ime}&city=${lokacija}&industry=${dejavnost}&rating=${ocena}&page=${stran}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCompanies(data);
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

  return (
    <>
      <CompanyFilter
        ime={ime}
        lokacija={lokacija}
        dejavnost={dejavnost}
        ocena={ocena}
      />
      {!isLoading ? (
        <CompanyPageJobs companies={companies} />
      ) : (
        <div className="flex items-center justify-center bg-gray-1 pb-20">
          <div role="status">
            <svg
              aria-hidden="true"
              className="h-8 w-8 animate-spin fill-indigo-700 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Nalagam...</span>
          </div>
        </div>
      )}
      {!isLoading && companies.length === 0 ? (
        <NoProduct />
      ) : (
        noOfPages > 1 && (
          <div className="gap-13 flex h-full items-center items-center justify-center bg-gray-1 pb-12 dark:bg-dark-2">
            <Button
              variant="text"
              className="flex items-center gap-2 dark:text-white"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Nazaj
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: noOfPages }, (_, index) => (
                <IconButton
                  {...getItemProps(index + 1)}
                  key={index + 1}
                  onClick={() => fetchPage(index + 1)}
                >
                  {index + 1}
                </IconButton>
              ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2 dark:text-white"
              onClick={next}
              disabled={active === 5}
            >
              Naprej
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        )
      )}
    </>
  );
};

export default SearchResults;
