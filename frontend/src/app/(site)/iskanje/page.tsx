import Breadcrumb from "@/components/Common/Breadcrumb";
import CompanyFilter from "@/components/AllCompanies/CompanyFilter";
import SearchResults from "@/components/AllCompanies/SearchResults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Compass - Rezultati iskanja",
  description: "Reszultati iskanja",
};

const CompaniesPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Rezultati iskanja" />
      <CompanyFilter />
      <SearchResults />
    </main>
  );
};

export default CompaniesPage;
