import { TeamType } from "@/types/team";
import SingleJobs from "../Common/SingleJobs";


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


const CompanyPageJobs = () => {
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[10px]">
      <div className="container px-4">

        <div className="mt-[10px] mb-[50px] flex flex-wrap gap-y-8">
          {teamData.map((team, i) => (
              <SingleJobs team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyPageJobs;
