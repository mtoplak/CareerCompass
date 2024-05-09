import { Metadata } from "next";
import SingleCompanyPage from "@/components/SingleCompany/SingleCompanyInfo";
import { api } from "@/constants";
import ErrorPage from "@/app/not-found";

export const metadata: Metadata = {
  title: "Career Compass - Podjetje",
  description: "Profil podjetja",
};

type Props = {
  params: { slug: string };
};

async function getCompany(slug: string) {
  const res = await fetch(`${api}/company/${slug}`, {
    cache: "no-store",
  });
  const company = await res.json();

  return company;
}

export default async function PodjetjePage({ params }: Props) {
  const company = await getCompany(params.slug);

  if (company.statusCode === 404) {
    return <ErrorPage what="Podjetje" />;
  }

  return <>{params && <SingleCompanyPage company={company} />}</>;
}
