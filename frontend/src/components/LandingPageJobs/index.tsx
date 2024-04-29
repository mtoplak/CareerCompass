import SectionTitle from "../Common/SectionTitle";
import SingleCompany from "../Common/SingleCompany";

const teamData = [
  {
    id: 1,
    name: "Inova",
    designation: "Software Development",
    image: "/images/team/inova.png",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
    logo: "https://firebasestorage.googleapis.com/v0/b/career-compass-ed243.appspot.com/o/companyLogos%2FTEM%20%C4%8Cate%C5%BE%2C%20d.o.o._logo.jpg?alt=media&token=351f509f-2c6d-4d5e-baf1-a9b01f4c5e63",
    industry: "Software Development",
    slug: "inova",
  },
  {
    id: 2,
    name: "Gasilko",
    designation: "Fire protection consultant",
    image: "/images/team/gasilko.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
    logo: "https://firebasestorage.googleapis.com/v0/b/career-compass-ed243.appspot.com/o/companyLogos%2FTEM%20%C4%8Cate%C5%BE%2C%20d.o.o._logo.jpg?alt=media&token=351f509f-2c6d-4d5e-baf1-a9b01f4c5e63",
    industry: "",
    slug: "gasilko",
  },
  {
    id: 3,
    name: "Feri",
    designation: "Faculty",
    image: "/images/team/feri.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
    logo: "https://firebasestorage.googleapis.com/v0/b/career-compass-ed243.appspot.com/o/companyLogos%2FTEM%20%C4%8Cate%C5%BE%2C%20d.o.o._logo.jpg?alt=media&token=351f509f-2c6d-4d5e-baf1-a9b01f4c5e63",
    industry: "",
    slug: "feri",
  },
  {
    id: 4,
    name: "NKB Maribor",
    designation: "Bank",
    image: "/images/team/nkbm.png",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
    logo: "https://firebasestorage.googleapis.com/v0/b/career-compass-ed243.appspot.com/o/companyLogos%2FTEM%20%C4%8Cate%C5%BE%2C%20d.o.o._logo.jpg?alt=media&token=351f509f-2c6d-4d5e-baf1-a9b01f4c5e63",
    industry: "",
    slug: "nkb-maribor",
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
        <div className="mt-[60px] flex flex-wrap gap-y-8 lg:mt-20">
          {teamData.map((team, i) => (
            <SingleCompany key={i} company={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPageJobs;
