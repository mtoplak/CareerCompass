import { Metadata } from "next";
import SingleCompanyPage from "@/components/SingleCompany/SingleCompanyInfo";
import { api } from "@/constants";

export const metadata: Metadata = {
  title: "Career Compass - Podjetje",
  description: "Profil podjetja",
};

type Props = {
  params: { slug: string };
};

async function getCompany(slug: string) {
  const res = await fetch(`${api}}/company/${slug}`, {
    cache: "no-store",
  });
  const companies = await res.json();

  return companies;
}

export default async function PodjetjePage({ params }: Props) {
  const company = await getCompany(params.slug);

  return <>{params && <SingleCompanyPage company={company} />}</>;
}
