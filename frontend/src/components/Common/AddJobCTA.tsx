"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AddJobCTA = () => {
  const { data: session } = useSession();

  if (!session?.user?.company) return null;

  const slug = session.user.company?.slug;

  return (
    <div className="container my-6">
      <div className="rounded-lg bg-indigo-100 p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-indigo-800">Imate odprto delovno mesto?</h3>
        <p className="mb-4 text-sm text-indigo-700">Objavite nov oglas in pritegnite prave kandidate.</p>
        <Link
          href="/dodaj-zaposlitev"
          className="inline-block rounded bg-indigo-700 px-6 py-2 text-white hover:bg-indigo-800"
        >
          Dodaj zaposlitveni oglas
        </Link>
      </div>
    </div>
  );
};

export default AddJobCTA;
