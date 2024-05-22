import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import JobSearchResults from "@/components/AllJobAdvertisements/JobSearchResults";

export const metadata: Metadata = {
  title: "Career Compass - Rezultati iskanja zapsolitev",
  description: "Rezultati iskanja zaposlitev",
};

const JobAdvertisementsPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Rezultati iskanja zaposlitev" />
      <JobSearchResults />
    </main>
  );
};

export default JobAdvertisementsPage;
