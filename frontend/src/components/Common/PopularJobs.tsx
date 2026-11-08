"use client";
import SingleJob from "./SingleJob";
import { useEffect, useState } from "react";
import { api } from "@/constants";
import { useSession } from "next-auth/react";
import { JobAdvertisement } from "@/types/job";

const PopularJobs = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<JobAdvertisement[]>([]);
  const [savedJobs, setSavedJobs] = useState<JobAdvertisement[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const body = session
        ? JSON.stringify({ userEmail: session?.user?.email })
        : null;
      const res = await fetch(`${api}/job/popular`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
      });
      const jobs = await res.json();
      setJobs(jobs);

      if (session) {
        const res = await fetch(`${api}/user/get/${session.user.email}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const savedJobs = await res.json();
        setSavedJobs(savedJobs.saved_advertisements);
      }
    };

    fetchJobs();
  }, [session]);

  // Users who are not a company have company null (credentials login) or undefined (Google login).
  const canBeSaved = !!session?.user && !session.user.company;

  return (
    <>
      {jobs.length > 0 &&
        jobs.map((job: any) => (
          <SingleJob
            key={job._id}
            job={job}
            canBeSaved={canBeSaved}
            isSaved={savedJobs.some((savedJob) => savedJob._id === job._id)}
          />
        ))}
    </>
  );
};

export default PopularJobs;
