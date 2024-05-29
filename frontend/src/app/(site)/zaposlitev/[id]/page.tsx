import { Metadata } from "next";
import SingleJobPage from "@/components/SingleJob/SingleJobInfo";
import { api } from "@/constants";
import ErrorPage from "@/app/not-found";

type Props = {
  readonly params: { id: string };
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const job = await getJob(params.id);

  return {
    title: job.position
      ? "Career Compass - " + job.position
      : "Career Compass - Zaposlitev",
    description: job.description || "Podrobnosti o zaposlitvi",
  };
}

async function getJob(id: string) {
  const res = await fetch(`${api}/job/${id}`, {
    cache: "no-store",
  });
  const job = await res.json();

  return job;
}

export default async function ZaposlitevPage({ params }: Props) {
  const job = await getJob(params.id);

  if (job.statusCode === 404) {
    return <ErrorPage what="Zaposlitev" />;
  }

  return <>{params && <SingleJobPage job={job} />}</>;
}
