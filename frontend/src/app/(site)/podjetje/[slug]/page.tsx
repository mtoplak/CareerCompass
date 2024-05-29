import { Metadata } from "next";
import SingleCompanyPage from "@/components/SingleCompany/SingleCompanyInfo";
import { api } from "@/constants";
import ErrorPage from "@/app/not-found";

type Props = {
  readonly params: { slug: string };
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

async function getJobAdvertisements(slug: string) {
  const res = await fetch(`${api}/job/company/${slug}`, {
    cache: "no-store",
  });
  const jobAdvertisements = await res.json();
  return jobAdvertisements;
}

export default async function PodjetjePage({ params }: Props) {
  const company = await getCompany(params.slug);

  if (company.statusCode === 404) {
    return <ErrorPage what="Podjetje" />;
  }

  const jobAdvertisements = await getJobAdvertisements(params.slug);

  return (
    <>
      {params && (
        <SingleCompanyPage
          company={company}
          jobAdvertisements={jobAdvertisements}
        />
      )}
    </>
  );
}
