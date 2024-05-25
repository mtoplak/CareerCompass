"use client";
import { Industry, industries } from "@/types/industry";
import React, { useEffect, useState } from "react";
import { industryMappings } from "@/types/subindustry";
import { useRouter } from "next/navigation";
import { api } from "@/constants";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { useSession } from "next-auth/react";
import ErrorPage from "@/app/not-found";

const industryOptions = industries.map((industry: Industry) => (
  <option key={industry} value={industry}>
    {industry}
  </option>
));

const EditCompany = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    subindustry: "",
    website: "",
    address: "",
    city: "",
  });
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const { data: session } = useSession();
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(
    session?.user.company?.industry as Industry,
  );

  useEffect(() => {
    const getCompany = async () => {
      if (session?.user.company.id) {
        const res = await fetch(`${api}/company/id/${session.user.company.id}`);
        const company = await res.json();
        setFormData(company);
      }
    };

    getCompany();
  }, [session]);

  if (!session?.user.company) {
    return <ErrorPage what="Podjetje" />;
  }

  const subindustries = Object.entries(industryMappings)
    .filter(([subindustry, industry]) => industry === selectedIndustry)
    .map(([subindustry]) => subindustry);

  const subindustryOptions = subindustries.map((subindustry) => (
    <option key={subindustry} value={subindustry}>
      {subindustry}
    </option>
  ));

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "industry") {
      setSelectedIndustry(value as Industry);
    }
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${api}/company/${session?.user.company.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) {
        toast.success("Uspešno ste uredili vaše podatke!");
        router.push(`/podjetje/${session?.user.company.slug}`);
      } else {
        console.error("Failed to update company");
        toast.error("Urejanje ni mogoče.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Urejanje ni mogoče.");
    }
  };

  const handleDelete = async () => {
    confirmAlert({
      message: `Ste prepričani, da želite izbrisati svoje podjetje ${session?.user.company.name} iz naše platforme?`,
      buttons: [
        {
          label: "Da",
          onClick: async () => {
            try {
              const response = await fetch(
                `${api}/company/${session?.user.company.slug}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );
              if (!response.ok) {
                throw new Error("Doesn't work");
              }

              toast.success("Vaše podjetje je uspešno izbrisano.");
              router.push("/");
            } catch (error) {
              toast.error("Prišlo je do napake pri brisanju podjetja.");
            }
          },
        },
        {
          label: "Ne",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="bg-gray-100 py-[100px] dark:bg-black">
      <div className="mx-auto my-10 mt-10 max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">
          Uredite podatke vašega podjetja
        </h1>
        <form onSubmit={handleEdit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block font-semibold text-gray-700"
            >
              Naziv:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="mb-2 block font-semibold text-gray-700"
            >
              Mesto:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="mb-2 block font-semibold text-gray-700"
            >
              Naslov:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="website"
              className="mb-2 block font-semibold text-gray-700"
            >
              Spletna stran:
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="industry"
              className="mb-2 block font-semibold text-gray-700"
            >
              Dejavnost
            </label>
            <select
              name="industry"
              value={formData.industry}
              className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            >
              <option value="">Dejavnost</option>
              {industryOptions}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="subindustry"
              className="mb-2 block font-semibold text-gray-700"
            >
              Poddejavnost
            </label>
            <select
              name="subindustry"
              value={formData.subindustry}
              className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            >
              <option value="">Poddejavnost</option>
              {subindustryOptions}
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Posodobi podatke
          </button>
        </form>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-red-500 px-8 py-2 text-white hover:bg-red-600"
          onClick={handleDelete}
        >
          Svoje podjetje želim izbrisati iz CareerCompass
        </button>
      </div>
    </div>
  );
};

export default EditCompany;
