import Breadcrumb from "@/components/Common/Breadcrumb";
import CompanyFilter from "@/components/AllCompanies/CompanyFilter";
import CompanyPageJobs from "@/components/AllCompanies/CompanyPageJobs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Compass - Podjetja",
  description: "Vsa podjetja",
};

const CompaniesPage = async () => {
  return (
    <main>
      <Breadcrumb pageName="Vsa podjetja" />
      <CompanyFilter />
      <CompanyPageJobs />
    </main>
  );
};

export default CompaniesPage;
