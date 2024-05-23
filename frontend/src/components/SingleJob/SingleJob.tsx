"use client";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { api } from "@/constants";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSession } from "next-auth/react";
import JobActions from "../JobButton";

const SingleJob = ({ job }: { job: any }) => {
  const { data: session } = useSession();
  const { _id, position, description, city, company, source, url } = job;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkIfSaved = async () => {
      console.log(session?.user?.company);
      if (!session?.user?.email) {
        console.error("User email is missing");
        return;
      }

      if (!_id) {
        console.error("Job ID is missing");
        return;
      }

      try {
        const response = await fetch(
          `${api}/job/check/${_id}/${session.user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const { saved } = await response.json();
          setIsSaved(saved);
        } else {
          console.error(
            "Failed to check if job is saved",
            await response.text(),
          );
          setIsSaved(false);
        }
      } catch (error) {
        console.error("There was a problem checking the saved status:", error);
      }
    };
    checkIfSaved();
  }, [session, _id]);

  return (
    <div className="w-full px-4 lg:w-1/2 xl:w-1/2">
      <div className="group mb-8 rounded-xl bg-white px-5 pb-10 pt-10 shadow-testimonial dark:bg-dark dark:shadow-none sm:h-[260px] sm:h-auto">
        <div className="flex flex-col justify-between px-4 sm:flex-row">
          <div className="sm:w-3/5">
            <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">
              {position}
            </h3>
            <p className="mb-5 text-justify text-sm text-body-color dark:text-dark-6">
              {description}
            </p>
          </div>
          <div className="sm:w-2/5">
            <div className="sm:ml-10 sm:mt-8">
              <p className="mb-1 text-sm text-body-color dark:text-dark-6">
                <b className="text-dark dark:text-light">Lokacija: </b>
                {city}
              </p>
              <p className="mb-1 text-sm text-body-color dark:text-dark-6">
                <b className="text-dark dark:text-light">Podjetje: </b>
                {company}
              </p>
              <p className="mb-1 text-sm text-body-color dark:text-dark-6">
                <b className="text-dark dark:text-light">Vir: </b>
                <a
                  href={url}
                  className="text-indigo-700 underline underline-offset-1 dark:text-indigo-300"
                >
                  {source}
                </a>
              </p>
            </div>
          </div>
        </div>
        {session?.user && <JobActions job={job} isSaved={isSaved} />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SingleJob;
