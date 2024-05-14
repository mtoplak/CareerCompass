import ClaimCompanyProfile from "@/components/Auth/ClaimCompany";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prevzem profila podjetja | CareerCompass",
};

const ClaimProfilePage = () => {
  return (
    <>
      <Breadcrumb pageName="Prevzemi profil podjetja" />
      <ClaimCompanyProfile />
    </>
  );
};

export default ClaimProfilePage;
