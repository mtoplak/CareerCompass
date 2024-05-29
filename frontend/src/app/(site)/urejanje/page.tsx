import EditCompany from "@/components/SingleCompany/EditCompany";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Compass - Uredi podatke podjetja",
  description: "Uredi podatke podjetja",
};

export default async function EditPage() {
  return <EditCompany />;
}
