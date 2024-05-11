"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import CompanyPageJobs from "@/components/AllCompanies/CompanyPageJobs";
import { api } from "@/constants";
import CompanyFilter from "./CompanyFilter";

const SearchResults = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  // console.log(searchParams.get("ime"));
  // console.log(searchParams.get("lokacija"));
  // console.log(searchParams.get("dejavnost"));

  const ime = searchParams.get("ime") || "";
  const lokacija = searchParams.get("lokacija") || "";
  const dejavnost = searchParams.get("dejavnost") || "";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${api}/company/search?name=${ime}&city=${lokacija}&industry=${dejavnost}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <>
      <CompanyFilter ime={ime} lokacija={lokacija} dejavnost={dejavnost} />
      {!isLoading ? (
        <CompanyPageJobs companies={companies} />
      ) : (
        <div>Nalagam</div>
      )}
      {!isLoading && companies.length === 0 && (
        <div className="text-center">Ni rezultatov</div>
      )}
    </>
  );
};

export default SearchResults;
