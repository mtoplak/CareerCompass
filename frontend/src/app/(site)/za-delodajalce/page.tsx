import Breadcrumb from "@/components/Common/Breadcrumb";
import ForEmployers from "@/components/ForEmployers/ForEmployers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Za delodajalce | CareerCompass",
};

const ZaDelodajalcePage = () => {
  return (
    <>
      <Breadcrumb pageName="Za delodajalce" />
      <ForEmployers />
    </>
  );
};

export default ZaDelodajalcePage;
