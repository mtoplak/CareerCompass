import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleRating";
import ratingData from "./ratingData";
import SingleCompany from "../Common/SingleCompany";
import { Company } from "@/types/company";

const LandingPageRate = ({ companies }: { companies: Company[] }) => {
  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <section className="pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-[120px]">
      <div className="container rounded-xl bg-indigo-50 dark:bg-slate-800 xs:px-[20px] xs:py-[20px]">
        <SectionTitle
          subtitle="Ocenjevanje"
          title="Podaj oceno o podjetju"
          paragraph="Omogočamo možnost podajanja ocen glede na vaše izkušnje na različnih področjih znotraj podjetja."
        />

        <div className="mt-12 rounded-xl bg-indigo-100 py-[20px] dark:bg-slate-700 md:mt-20 md:flex md:items-start md:justify-between">
          {ratingData.map((feature, i) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
        <div className="pt-20">
          <span className="mx-4 mb-2 block text-lg font-semibold">
            Najboljše ocenjena podjetja...
          </span>
          <div className="mb-[20px] mt-[10px] flex flex-wrap gap-y-8">
            {companies.map((company: Company) => (
              <SingleCompany key={company.name} company={company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageRate;
