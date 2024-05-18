import { Metadata } from "next";
import { api } from "@/constants";
import ErrorPage from "@/app/not-found";
import AddJobAdvertisementPage from "@/components/AddJobAdvertisement/AddJobAdvertisementPage";

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
        ? "Career Compass - Dodaj zaposlitev " + company.name
        : "Career Compass - Dodaj zaposlitev",
    description: "Dodaj zaposlitev " + company.name,
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

  return <>
  {params && <AddJobAdvertisementPage company={company}/>}
  </>;
}
