import Breadcrumb from "@/components/Common/Breadcrumb";
import NotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stran ne obstaja! | Career Compass",
};

const ErrorPage = ({ what }: { what: string }) => {
  return (
    <>
      <Breadcrumb pageName={what + " ne obstaja!"} />
      <NotFound />
    </>
  );
};

export default ErrorPage;
