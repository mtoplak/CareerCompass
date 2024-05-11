import { Metadata } from "next";
import SingleCompanyPage from "@/components/SingleCompany/SingleCompanyInfo";
import { api } from "@/constants";
import ErrorPage from "@/app/not-found";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const company = await getCompany(params.slug);

  return {
    title:
      company.name != undefined
        ? "Career Compass - " + company.name
        : "Career Compass - Podjetje",
    description: "Profil podjetja" + company.name,
  };
}

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
