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
  const res = await fetch(`http://localhost:4000/company/${slug}`, {
    cache: "no-store",
  });
  const companies = await res.json();

  return companies;
}

export default async function PodjetjePage({ params }: Props) {
  const company = await getCompany(params.slug);

  return <>{params && <SingleCompanyPage company={company} />}</>;
}
