import { TeamType } from "@/types/team";
import SectionTitle from "../Common/SectionTitle";
import SingleJobs from "./SingleJobs";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Inova",
    designation: "Software Development",
    image: "/images/team/inova.png",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 2,
    name: "Gasilko",
    designation: "Fire protection consultant",
    image: "/images/team/gasilko.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 3,
    name: "Feri",
    designation: "Faculty",
    image: "/images/team/feri.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 4,
    name: "NKB Maribor",
    designation: "Bank",
    image: "/images/team/nkbm.png",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
];


const LandingPageJobs = () => {
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[120px]">
      <div className="container px-4">
        <SectionTitle
          subtitle="Zaposlitve"
          title="Poišči zaposlitev"
          paragraph="Preberi komentarje in izkušnje drugih zaposlenih ter se na podlagi teh odloči za najboljši poklic zate!"
          width="640px"
          center
        />

        <div className="mt-[60px] flex flex-wrap lg:mt-20 gap-y-8">
          {teamData.map((team, i) => (
            <SingleJobs key={i} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPageJobs;
