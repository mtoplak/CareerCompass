import Signin from "@/components/Auth/SignIn";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prijava | CareerCompass",
};

const SigninPage = () => {
  return (
    <>
      <Breadcrumb pageName="Prijava" />
      <Signin />
    </>
  );
};

export default SigninPage;
