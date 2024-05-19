import { api } from "@/constants";
import SectionTitle from "../Common/SectionTitle";
import SingleJob from "../Common/SingleJob";

const getPopularJobs = async () => {
  const res = await fetch(`${api}/job/popular`);
  const data = await res.json();
  return data;
};

const LandingPageJobs = async () => {
  const jobs = await getPopularJobs();

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[120px]">
      <div className="container px-4">
        <SectionTitle
          subtitle="Zaposlitve"
          title="Poišči zaposlitev"
          paragraph="Preberi komentarje in izkušnje drugih zaposlenih ter se na podlagi teh odloči za najboljši poklic zate! Mogoče bi dali ta tekst gor k podjetjem, sem pa nekaj o zaposlitvah?🤔"
          width="640px"
          center
        />
        <div className="mt-[60px] flex flex-wrap gap-y-8 lg:mt-20">
          {jobs.map((job: any, i: number) => (
            <SingleJob key={i} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPageJobs;
