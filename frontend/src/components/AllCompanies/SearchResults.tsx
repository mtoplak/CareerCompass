"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import CompanyPageJobs from "@/components/AllCompanies/CompanyPageJobs";
import { api } from "@/constants";
import CompanyFilter from "./CompanyFilter";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

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
        <div>Nalagam</div>
      )}
      {!isLoading && companies.length === 0 ? (
        <div className="text-center">Ni rezultatov</div>
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
