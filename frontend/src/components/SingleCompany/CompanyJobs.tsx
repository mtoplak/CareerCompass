"use client";
import { JobAdvertisement } from "@/types/job";
import { useEffect, useState } from "react";
import SingleJob from "../Common/SingleJob";
import { useSession } from "next-auth/react";
import { api } from "@/constants";

const CompanyJobs = ({ jobs }: { jobs: JobAdvertisement[] }) => {
  const [savedJobs, setSavedJobs] = useState<JobAdvertisement[]>([]);
  const { data: session } = useSession();

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
    <div className="mt-20 ">
      <h2 className="mb-4 text-2xl font-semibold">Zaposlitve</h2>
      <div className="mb-[50px] mt-[10px] flex flex-wrap gap-y-8">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <SingleJob
              key={index}
              job={job}
              canBeSaved={canBeSaved}
              isSaved={savedJobs.some((savedJob) => savedJob._id === job._id)}
            />
          ))
        ) : (
          <p>Podjetje nima objavljenih zaposlitev.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyJobs;
