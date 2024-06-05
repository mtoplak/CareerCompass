"use client";
import { JobAdvertisement } from "@/types/job";
import SingleJob from "../Common/SingleJob";
import ResultsLoader from "../Common/ResultsLoader";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "@/constants";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

const JobPage = ({
  jobs,
  areSaved,
  noOfPages,
  delovno_mesto,
  lokacija,
  dejavnost,
}: {
  jobs: JobAdvertisement[];
  areSaved?: boolean;
  noOfPages?: number;
  delovno_mesto?: string;
  lokacija?: string;
  dejavnost?: string;
}) => {
  const [savedJobs, setSavedJobs] = useState<JobAdvertisement[]>([]);
  const [jobs2, setJobs2] = useState<JobAdvertisement[]>([]);
  const [active, setActive] = useState(1);
  const [noOfPages2, setNoOfPages2] = useState(0);
  const { data: session } = useSession();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchPage = async (stran: number) => {
    setActive(stran);
    try {
      let url = `${api}/job/search?page=${stran}`;
      if (delovno_mesto || lokacija || dejavnost) {
        url += `&position=${delovno_mesto}&city=${lokacija}&industry=${dejavnost}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setJobs2(data.jobs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      scrollToTop();
    }
  };

  useEffect(() => {
    if (session?.user) {
      const fetchSavedJobs = async () => {
        try {
          const res = await fetch(`${api}/user/get/${session.user.email}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const savedJobs = await res.json();
          setSavedJobs(savedJobs.saved_advertisements);
        } catch (error) {
          console.error("Error fetching saved jobs:", error);
        }
      };

      fetchSavedJobs();
    }
  }, [session, jobs, noOfPages]);

  useEffect(() => {
    if (!jobs) {
      fetchPage(active);
    } else {
      setJobs2(jobs);
      setNoOfPages2(noOfPages as number);
    }
  }, [active]);

  if (!jobs2) {
    return <ResultsLoader />;
  }

  const canBeSaved =
    session?.user !== undefined && session.user?.company === undefined;

  const getItemProps = (index: any) => ({
    className: `${active === index ? "bg-black" : "bg-transparent text-gray-500"} flex items-center justify-center w-8 h-8`,
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
    fetchPage(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    fetchPage(active - 1);
  };

  const pages = Array.from({ length: noOfPages2 }, (_, index) => index + 1);

  const visiblePages = pages.filter((page) => {
    return (
      page === 1 ||
      page === noOfPages ||
      page === active ||
      page === active - 1 ||
      page === active + 1
    );
  });

  const paginationItems: any = [];
  let lastPage = 0;

  visiblePages.forEach((page, index) => {
    if (page - lastPage > 1) {
      paginationItems.push(
        <span
          key={`ellipsis-${index}`}
          className="text-center text-black dark:text-white"
        >
          ...
        </span>,
      );
    }
    paginationItems.push(
      <IconButton
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        {...getItemProps(page)}
        key={page}
        onClick={() => fetchPage(page)}
        className={`flex items-center justify-center text-center text-black dark:text-black ${page === active ? "bg-indigo-700 text-white" : "bg-white"}`}
      >
        {page}
      </IconButton>,
    );
    lastPage = page;
  });

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2">
      <div className="container px-4">
        <div className="mb-[50px] mt-[10px] flex flex-wrap gap-y-8">
          {jobs2.length > 0 &&
            jobs2.map((job: JobAdvertisement) => (
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
        {noOfPages2 > 1 && (
          <div className="mb-12 flex flex-wrap items-center justify-center gap-4 bg-gray-1 p-4 dark:bg-dark-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="text"
                className="flex items-center gap-2 dark:text-white"
                onClick={prev}
                disabled={active === 1}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Nazaj
              </Button>
              {paginationItems}
              <Button
                variant="text"
                className="flex items-center gap-2 dark:text-white"
                onClick={next}
                disabled={active === noOfPages}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Naprej
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobPage;
