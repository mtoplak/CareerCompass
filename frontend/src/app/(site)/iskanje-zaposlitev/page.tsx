import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import JobSearchResults from "@/components/AllJobAdvertisements/JobSearchResults";

export const metadata: Metadata = {
  title: "Career Compass - Rezultati iskanja zapsolitev",
  description: "Rezultati iskanja zaposlitvenih oglasov",
};

const JobAdvertisementsPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Rezultati iskanja zaposlitvenih oglasov" />
      <JobSearchResults />
    </main>
  );
};

export default JobAdvertisementsPage;
