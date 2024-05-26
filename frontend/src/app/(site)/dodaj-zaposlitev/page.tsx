import AddJobAdvertisementPage from "@/components/AddJobAdvertisement/AddJobAdvertisementPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Compass - Uredi podatke podjetja",
  description: "Uredi podatke podjetja",
};

export default async function PodjetjePage() {
  return (
    <>
      <AddJobAdvertisementPage />
    </>
  );
}
