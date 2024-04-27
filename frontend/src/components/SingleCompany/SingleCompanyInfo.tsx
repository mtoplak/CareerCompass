import { Metadata } from "next";
import { TeamType } from "@/types/team";
import Image from "next/image";
import { Testimonial } from "@/types/testimonial";
import SingleRating from "../Rating/SingleRating";

export const metadata: Metadata = {
  title: "Podjetja Details",
  description: "Details page for individual podjetja.",
};

type Props = {
  team: TeamType;
};

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sabo Masties",
    designation: "Founder @ Rolex",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/author-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Margin Gesmu",
    designation: "Founder @ UI Hunter",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/author-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "William Smith",
    designation: "Founder @ Trorex",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/author-03.png",
    star: 5,
  },
];

const SingleCompanyPage = ({ team }: Props) => {
  return (
    <div className="container mx-auto py-8 pt-[120px]">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <Image src={team.image} alt={team.name} width={200} height={200} className="rounded-full" />
        </div>
        {/*Moremo prilagodit naslednji del ko ne bo več statično*/}
        <div className="md:w-1/4 pl-10">
          <h1 className="text-3xl font-bold">{team.name}</h1>
          <p className="text-lg text-gray-600">{team.designation}</p>
          <div className="flex mt-4">
            <span className="text-yellow-400 mr-1">&#9733;</span>
            <span className="text-yellow-400 mr-1">&#9733;</span>
            <span className="text-yellow-400 mr-1">&#9733;</span>
            <span className="text-yellow-400 mr-1">&#9733;</span>
            <span className="text-yellow-400">&#9733;</span>
            <span className="text-gray-600 ml-2">(5.0)</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 my-10"></div>
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-4">Zaposlitve</h2>
            Podjetje nima objavljenih zaposlitev.
      </div>
      <div className="my-20">
        <h2 className="text-2xl font-semibold mb-4">Komentarji in Ocene</h2>
        <div className="mt-[20px] flex flex-wrap gap-y-8">
          {testimonialData.map((testimonial, i) => (
            <SingleRating key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCompanyPage;
