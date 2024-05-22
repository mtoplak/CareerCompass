import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import SavedJobResults from "@/components/AllJobAdvertisements/SavedJobResults";

export const metadata: Metadata = {
  title: "Career Compass - Shranjene zaposlitve",
  description: "Shranjeni zaposlitveni oglasi",
};

const SavedJobAdvertisementsPage = async () => {

  return (
    <main>
      <Breadcrumb pageName="Shranjeni zaposlitveni oglasi" />
      <SavedJobResults />
    </main>
  );
};

export default SavedJobAdvertisementsPage;
