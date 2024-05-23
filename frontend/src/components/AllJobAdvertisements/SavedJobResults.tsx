"use client";
import { useState, useEffect } from "react";
import { api } from "@/constants";
import NoProduct from "../NotFound/NoProduct";
import JobPage from "./JobPage";
import { useSession } from "next-auth/react";
import SavedJobAdvertisementsFilter from "./SavedAdvertisementsFilter";
import PageLoader from "../Common/PageLoader";

const SavedJobResults = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        if (!session?.user?.email) {
          throw new Error("User email not available");
        }

        const response = await fetch(`${api}/job/saved/${session.user.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNoOfPages(Math.ceil(data.count / 28));
        setJobs(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [session?.user?.email]);

  return (
    <>
      <SavedJobAdvertisementsFilter isSavedPage={true} />
      {!isLoading ? (
        <>
          {Array.isArray(jobs) && jobs.length === 0 ? (
            <NoProduct />
          ) : (
            <JobPage jobs={jobs} />
          )}
        </>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default SavedJobResults;
