import { Metadata } from "next";
import Image from "next/image";
import { Testimonial } from "@/types/testimonial";
import SingleRating from "../Rating/SingleRating";
import { Company } from "@/types/company";

export const metadata: Metadata = {
  title: "Career Compass - Podjetje",
  description: "Profil podjetja",
};

type Props = {
  company: Company;
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

const SingleCompanyPage = async ({ company }: Props) => {
  return (
    <div className="container mx-auto py-8 pt-[120px]">
      <div className="flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <Image
            src={company.logo}
            alt={company.name}
            width={150}
            height={200}
            className="rounded-full"
          />
        </div>
        {/*Moremo prilagodit naslednji del ko ne bo več statično*/}
        <div className="pl-10 md:w-2/4">
          <h1 className="text-3xl font-bold">{company.name}</h1>
          <p className="text-lg text-gray-600">{company.industry}</p>
          <div className="mt-4 flex">
            <span className="mr-1 text-yellow-400">&#9733;</span>
            <span className="mr-1 text-yellow-400">&#9733;</span>
            <span className="mr-1 text-yellow-400">&#9733;</span>
            <span className="mr-1 text-yellow-400">&#9733;</span>
            <span className="text-yellow-400">&#9733;</span>
            <span className="ml-2 text-gray-600">(5.0)</span>
          </div>
        </div>
      </div>
      <div className="my-10 border-t border-gray-300"></div>
      <div className="mt-20">
        <h2 className="mb-4 text-2xl font-semibold">Zaposlitve</h2>
        Podjetje nima objavljenih zaposlitev.
      </div>
      <div className="my-20">
        <h2 className="mb-4 text-2xl font-semibold">Komentarji in ocene</h2>
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
