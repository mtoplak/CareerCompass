import { Metadata } from "next";
import { TeamType } from "@/types/team";
import SingleCompanyPage from "@/components/SingleCompany/SingleCompanyInfo";
//import TeamDetails from "@/components/TeamDetails";

export const metadata: Metadata = {
  title: "Podjetja Details",
  description: "Details page for individual podjetja.",
};

type Props = {
  params: { slug: string };
};

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

export default function PodjetjaPage({ params }: Props) {
  // Find the team with the matching slug
  const team = teamData.find((team) => team.name.toLowerCase() === params.slug.toLowerCase());

  return (
    <>
      {team && <SingleCompanyPage team={team} />}
    </>
  );
}
