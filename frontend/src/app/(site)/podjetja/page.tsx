import About from "@/components/About";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CompanyFilter from "@/components/AllCompanies/CompanyFilter";
import CompanyPageJobs from "@/components/AllCompanies/CompanyPageJobs";
import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Companies",
  description: "A catalog page of all the companies.",
};

const CompaniesPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Vsa podjetja" />
      <CompanyFilter />
      <CompanyPageJobs />
    </main>
  );
};

export default CompaniesPage;