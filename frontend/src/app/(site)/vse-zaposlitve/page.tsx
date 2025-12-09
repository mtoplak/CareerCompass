import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { api } from "@/constants";
import JobPage from "@/components/AllJobAdvertisements/JobPage";
import JobAdvertisementFilter from "@/components/AllJobAdvertisements/JobAdvertisementFilter";
import SavedJobAdvertisementsFilter from "@/components/AllJobAdvertisements/SavedAdvertisementsFilter";
import AddJobCTA from "@/components/Common/AddJobCTA";
import HotjarEvent from "@/components/Common/HotjarEvet";

export const metadata: Metadata = {
  title: "Career Compass - Vse zaposlitve",
  description: "Vsi zaposlitveni oglasi (variant)",
};

async function getJobAdvertisements() {
  const res = await fetch(`${api}/job/search`, {
    cache: "no-store",
  });
  const jobs = await res.json();

  return { jobList: jobs.jobs, noOfPages: Math.ceil(jobs.count / 14) };
}

const VseZaposlitvePage = async () => {
  const { jobList, noOfPages } = await getJobAdvertisements();

  return (
    <main>
      <HotjarEvent eventName="zaposlitve_variant_B" />
      <Breadcrumb pageName="Vse zaposlitvene oglase" />
      <AddJobCTA />
      <JobAdvertisementFilter />
      <SavedJobAdvertisementsFilter isSavedPage={false} />
      <JobPage jobs={jobList} noOfPages={noOfPages} />
    </main>
  );
};

export default VseZaposlitvePage;
