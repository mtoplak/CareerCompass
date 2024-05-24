"use client";
import { JobAdvertisement } from "@/types/job";
import SingleJob from "../SingleJob/SingleJob";
import ResultsLoader from "../Common/ResultsLoader";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "@/constants";

const JobPage = ({
  jobs,
  areSaved,
}: {
  jobs: JobAdvertisement[];
  areSaved?: boolean;
}) => {
  const [savedJobs, setSavedJobs] = useState<JobAdvertisement[]>([]);
  const { data: session } = useSession();

  if (!jobs) {
    return <ResultsLoader />;
  }

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(`${api}/user/get/${session?.user.email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const savedJobs = await res.json();
      setSavedJobs(savedJobs.saved_advertisements);
    };

    if (session) {
      fetchJobs();
    }
  }, [session]);

  const canBeSaved =
    session?.user !== undefined && session.user?.company === undefined;

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2">
      <div className="container px-4">
        <div className="mb-[50px] mt-[10px] flex flex-wrap gap-y-8">
          {jobs.length > 0 &&
            jobs.map((job: JobAdvertisement) => (
              <SingleJob
                key={job._id}
                job={job}
                canBeSaved={canBeSaved}
                isSaved={
                  areSaved
                    ? true
                    : savedJobs.some((savedJob) => savedJob._id === job._id)
                }
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default JobPage;
