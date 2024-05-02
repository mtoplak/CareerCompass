import SignUp from "@/components/Auth/SignUp";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registracija | CareerCompass",
};

const SignupPage = () => {
  return (
    <>
      <Breadcrumb pageName="Registracija" />
      <SignUp />
    </>
  );
};

export default SignupPage;
