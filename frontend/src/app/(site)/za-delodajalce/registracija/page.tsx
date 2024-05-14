import SignUpCompany from "@/components/Auth/SignUpCompany";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registracija za podjetja | CareerCompass",
};

const SignupPage = () => {
  return (
    <>
      <Breadcrumb pageName="Registracija za podjetja" />
      <SignUpCompany />
    </>
  );
};

export default SignupPage;
