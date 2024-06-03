"use client";
import { Industry, industries } from "@/types/industry";
import { useEffect, useState } from "react";
import { industryMappings } from "@/types/subindustry";
import { api } from "@/constants";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { signOut, useSession } from "next-auth/react";
import ErrorPage from "@/app/not-found";

const industryOptions = industries.map((industry: Industry) => (
  <option key={industry} value={industry}>
    {industry}
  </option>
));

const EditCompany = () => {
  const [formData, setFormData] = useState({
    industry: "",
    subindustry: "",
    website: "",
    address: "",
    city: "",
    newLogo: "",
    id: "",
  });
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const { data: session } = useSession();
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(
    session?.user.company?.industry as Industry,
  );

  useEffect(() => {
    const getCompany = async () => {
      if (session?.user.company !== undefined) {
        const res = await fetch(
          `${api}/company/id/${session?.user.company.id}`,
        );
        const company = await res.json();
        setFormData(company);
      }
    };

    getCompany();
  }, [session]);

  if (!session?.user.company) {
    return <ErrorPage what="Stran" />;
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

    const updateCompanyInfo = async () => {
      try {
        formData.id = session?.user.company.id;
        const response = await fetch("/api/editCompany", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Uspešno ste uredili vaše podatke!");
          window.location.href = `/podjetje/${session?.user.company.slug}`;
        } else {
          toast.error("Urejanje ni uspelo.");
        }
      } catch (error) {
        toast.error("Urejanje ni uspelo.");
      }
    };

    if (companyLogo) {
      const reader = new FileReader();
      reader.readAsDataURL(companyLogo);
      reader.onload = function () {
        const base64String = reader.result;
        formData.newLogo = base64String as string;
        updateCompanyInfo();
      };
    } else {
      updateCompanyInfo();
    }
  };

  const handleDelete = async () => {
    confirmAlert({
      message: `Ali ste prepričani, da želite izbrisati svoje podjetje ${session?.user.company.name} iz naše platforme?`,
      buttons: [
        {
          label: "Da",
          onClick: async () => {
            try {
              const response = await fetch("/api/deleteCompany", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: session?.user.company.id,
                  user_id: session?.user.id,
                  email: session?.user.company.email,
                }),
              });
              if (!response.ok) {
                throw new Error("Prišlo je do napake pri brisanju podjetja.");
              }

              toast.success("Vaše podjetje je uspešno izbrisano.");
              signOut({ callbackUrl: "/" });
            } catch (error) {
              toast.error("Prišlo je do napake pri brisanju podjetja.");
            }
          },
        },
        {
          label: "Ne",
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
          <div className="mb-4">
            <label
              htmlFor="companyLogo"
              className="mb-2 block font-semibold text-gray-700"
            >
              Logotip podjetja
            </label>
            <div className="relative">
              <input
                id="companyLogo"
                type="file"
                name="logo"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && setCompanyLogo(e.target.files[0])
                }
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="rounded-md border border-stroke bg-transparent px-5 py-3 text-left text-dark outline-none transition placeholder:text-dark-6 focus-within:border-primary dark:border-dark-3 dark:bg-black dark:text-white dark:focus-within:border-primary">
                {companyLogo ? companyLogo.name : "Izberi nov logotip"}
              </div>
            </div>
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
          className="py-5 text-red hover:text-black"
          onClick={handleDelete}
        >
          Svoje podjetje želim izbrisati iz CareerCompass.
        </button>
      </div>
    </div>
  );
};

export default EditCompany;
