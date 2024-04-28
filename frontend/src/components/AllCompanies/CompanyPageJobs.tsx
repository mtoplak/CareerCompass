import SingleCompany from "../Common/SingleCompany";
import { Company } from "@/types/company";

const CompanyPageJobs = ({ companies }: { companies: Company[] }) => {
  if (!companies) {
    return <div>Loading...</div>; // TODO lepši skeleton
  }
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[10px]">
      <div className="container px-4">
        <div className="mb-[50px] mt-[10px] flex flex-wrap gap-y-8">
          {companies.map((company: Company) => (
            <SingleCompany key={company.name} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyPageJobs;
