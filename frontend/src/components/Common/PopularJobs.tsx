"use client";
import SingleJob from "./SingleJob";
import { useEffect, useState } from "react";
import { api } from "@/constants";
import { useSession } from "next-auth/react";

const PopularJobs = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState([]);

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
    };

    fetchJobs();
  }, [session]);

  return (
    <>
      {jobs.map((job: any, i: number) => (
        <SingleJob key={i} job={job} />
      ))}
    </>
  );
};

export default PopularJobs;
