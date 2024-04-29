import { Metadata } from "next";
import SingleCompanyPage from "@/components/SingleCompany/SingleCompanyInfo";

export const metadata: Metadata = {
  title: "Career Compass - Podjetje",
  description: "Profil podjetja",
};

type Props = {
  params: { slug: string };
};

async function getCompany(slug: string) {
  console.log(slug);
  const res = await fetch(`http://localhost:4000/company/${slug}`, {
    cache: "no-store",
  });
  console.log(res);
  const companies = await res.json();

  return companies;
}

export default async function PodjetjePage({ params }: Props) {
  const company = await getCompany(params.slug);
  console.log(company);

  return <>{params && <SingleCompanyPage company={company} />}</>;
}
