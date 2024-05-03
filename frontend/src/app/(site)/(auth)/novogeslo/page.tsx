import React from "react";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pozabljeno geslo | Career Compass",
};

const ForgotPasswordPage = () => {
  return (
    <>
      <Breadcrumb pageName="Pozabljeno geslo" />
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordPage;
