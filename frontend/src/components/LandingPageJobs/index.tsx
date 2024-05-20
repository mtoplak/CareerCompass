import SectionTitle from "../Common/SectionTitle";
import PopularJobs from "../Common/PopularJobs";

const LandingPageJobs = async () => {
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[120px]">
      <div className="container px-4">
        <SectionTitle
          subtitle="Zaposlitve"
          title="Poišči zaposlitev"
          paragraph="Preberi komentarje in izkušnje drugih zaposlenih ter se na podlagi teh odloči za najboljšo zaposlitev zate!"
          width="640px"
          center
        />
        <div className="mt-[60px] flex flex-wrap gap-y-8 lg:mt-20">
          <PopularJobs />
        </div>
      </div>
    </section>
  );
};

export default LandingPageJobs;
