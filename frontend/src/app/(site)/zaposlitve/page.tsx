import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { api } from "@/constants";
import JobPage from "@/components/AllJobAdvertisements/JobPage";

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

const CompaniesPage = async () => {
  const jobs = await getJobAdvertisements();

  return (
    <main>
      <Breadcrumb pageName="Vse zaposlitve" />
      <JobPage jobs={jobs} />
    </main>
  );
};

export default CompaniesPage;
