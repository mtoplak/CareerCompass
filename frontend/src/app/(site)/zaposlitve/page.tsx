import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { api } from "@/constants";
import JobPage from "@/components/AllJobAdvertisements/JobPage";
import JobAdvertisementFilter from "@/components/AllJobAdvertisements/JobAdvertisementFilter";
import SavedJobAdvertisementsFilter from "@/components/AllJobAdvertisements/SavedAdvertisementsFilter";

export const metadata: Metadata = {
  title: "Career Compass - Zaposlitve",
  description: "Vsi zaposlitveni oglasi",
};

async function getJobAdvertisements() {
  const res = await fetch(`${api}/job/search`, {
    cache: "no-store",
  });
  const jobs = await res.json();

  return { jobList: jobs.jobs, noOfPages: Math.ceil(jobs.count / 14) };
}

const JobAdvertisementsPage = async () => {
  const { jobList, noOfPages } = await getJobAdvertisements();

  return (
    <main>
      <Breadcrumb pageName="Vsi zaposlitveni oglasi" />
      <JobAdvertisementFilter />
      <SavedJobAdvertisementsFilter isSavedPage={false} />
      <JobPage jobs={jobList} noOfPages={noOfPages} />
    </main>
  );
};

export default JobAdvertisementsPage;
