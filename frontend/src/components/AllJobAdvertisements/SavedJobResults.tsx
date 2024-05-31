"use client";
import { useState, useEffect } from "react";
import { api } from "@/constants";
import NoJobs from "../NotFound/NoJobs";
import JobPage from "./JobPage";
import { useSession } from "next-auth/react";
import SavedJobAdvertisementsFilter from "./SavedAdvertisementsFilter";
import ResultsLoader from "../Common/ResultsLoader";
import toast from "react-hot-toast";
import ErrorPage from "@/app/not-found";

const SavedJobResults = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${api}/user/get/${session?.user?.email}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        setJobs(data.saved_advertisements);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [session]);

  if (!session?.user) {
    return <ErrorPage what="Stran" />;
  }

  return (
    <>
      <SavedJobAdvertisementsFilter isSavedPage={true} />
      {!isLoading ? (
        <>
          {Array.isArray(jobs) && jobs.length === 0 ? (
            <NoJobs />
          ) : (
            <JobPage jobs={jobs} areSaved={true} />
          )}
        </>
      ) : (
        <ResultsLoader />
      )}
    </>
  );
};

export default SavedJobResults;
