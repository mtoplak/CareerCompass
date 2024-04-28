import About from "@/components/About";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CompanyFilter from "@/components/AllCompanies/CompanyFilter";
import CompanyPageJobs from "@/components/AllCompanies/CompanyPageJobs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Compass - Podjetja",
  description: "Vsa podjetja",
};

async function getCompanies() {
  const res = await fetch(`http://localhost:4000/company`, {
    cache: "no-store",
  });
  const companies = await res.json();

  return companies;
}

const CompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <main>
      <Breadcrumb pageName="Vsa podjetja" />
      <CompanyFilter />
      <CompanyPageJobs companies={companies} />
    </main>
  );
};

export default CompaniesPage;
