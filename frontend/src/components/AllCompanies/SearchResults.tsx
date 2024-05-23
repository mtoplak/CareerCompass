"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import CompanyPageJobs from "@/components/AllCompanies/CompanyPageJobs";
import { api } from "@/constants";
import CompanyFilter from "./CompanyFilter";
import NoProduct from "../NotFound/NoProduct";
import PageLoader from "../Common/PageLoader";

const SearchResults = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(0);
  const searchParams = useSearchParams();

  const ime = searchParams.get("ime") || "";
  const lokacija = searchParams.get("lokacija") || "";
  const dejavnost = searchParams.get("dejavnost") || "";
  const ocena = searchParams.get("ocena") || "";

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${api}/company/searchPaginated?name=${ime}&city=${lokacija}&industry=${dejavnost}&rating=${ocena}`,
        );
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
    fetchCompanies();

    return () => {};
  }, [ime, lokacija, dejavnost, ocena]);

  return (
    <>
      <CompanyFilter
        ime={ime}
        lokacija={lokacija}
        dejavnost={dejavnost}
        ocena={ocena}
      />
      {!isLoading ? (
        <CompanyPageJobs companies={companies} noOfPages={noOfPages} />
      ) : (
        <PageLoader />
      )}
      {!isLoading && companies.length === 0 && <NoProduct />}
    </>
  );
};

export default SearchResults;
