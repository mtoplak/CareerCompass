
import EditCompany from "@/components/SingleCompany/EditCompany";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Compass - Urejanje Podjetja",
  description: "Urejanje podjetja",
};

const CompaniesPage = async () => {
  return (
    <main>
        <EditCompany />
    </main>
  );
};

export default CompaniesPage;
