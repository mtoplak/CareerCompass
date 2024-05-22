import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { api } from "@/constants";
import JobPage from "@/components/AllJobAdvertisements/JobPage";
import JobAdvertisementFilter from "@/components/AllJobAdvertisements/JobAdvertisementFilter";

export const metadata: Metadata = {
  title: "Career Compass - Zaposlitve",
  description: "Vse zaposlitve",
};

async function getJobAdvertisements() {
  const res = await fetch(`${api}/job`, {
    cache: "no-store",
  });
  const jobs = await res.json();

  return jobs;
}

const JobAdvertisementsPage = async () => {
  const jobs = await getJobAdvertisements();

  return (
    <main>
      <Breadcrumb pageName="Vse zaposlitve" />
      <JobAdvertisementFilter />
      <JobPage jobs={jobs} />
    </main>
  );
};

export default JobAdvertisementsPage;
