import About from "@/components/About";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CompanyFilter from "@/components/CompanyFilter";
import CompanyPageJobs from "@/components/CompanyPageJobs";
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