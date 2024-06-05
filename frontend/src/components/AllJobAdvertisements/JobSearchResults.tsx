"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "@/constants";
import JobAdvertisementFilter from "./JobAdvertisementFilter";
import JobPage from "./JobPage";
import SavedJobAdvertisementsFilter from "./SavedAdvertisementsFilter";
import toast from "react-hot-toast";
import ResultsLoader from "../Common/ResultsLoader";
import NoJobs from "../NotFound/NoJobs";

const JobSearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(0);
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
        setNoOfPages(Math.ceil(data.count / 14));
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

  return (
    <>
      <JobAdvertisementFilter
        delovno_mesto={delovno_mesto}
        lokacija={lokacija}
        dejavnost={dejavnost}
      />
      <SavedJobAdvertisementsFilter isSavedPage={false} />
      {!isLoading ? (
        <JobPage
          jobs={jobs}
          noOfPages={noOfPages}
          delovno_mesto={delovno_mesto}
          lokacija={lokacija}
          dejavnost={dejavnost}
        />
      ) : (
        <ResultsLoader />
      )}
      {!isLoading && jobs.length === 0 && <NoJobs />}
    </>
  );
};

export default JobSearchResults;
