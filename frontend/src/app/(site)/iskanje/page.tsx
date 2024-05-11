import Breadcrumb from "@/components/Common/Breadcrumb";
import SearchResults from "@/components/AllCompanies/SearchResults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Compass - Rezultati iskanja",
  description: "Rezultati iskanja",
};

const CompaniesPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Rezultati iskanja" />
      <SearchResults />
    </main>
  );
};

export default CompaniesPage;
