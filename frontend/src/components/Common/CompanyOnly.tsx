"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const CompanyOnly = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.company) {
      router.replace("/zaposlitve");
    }
  }, [session, status, router]);

  if (status === "loading") return null;
  if (!session?.user?.company) return null;

  return <>{children}</>;
};

export default CompanyOnly;
