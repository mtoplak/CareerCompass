"use client";
import { api } from "@/constants";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddJobAdvertisementPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    position: "",
    description: "",
    application: "",
    city: "",
    company_linked: "",
    company: `${session?.user.company.name}`,
    url: `/podjetje/${session?.user.company.slug}`,
    source: "Career Compass",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Zaposlitveni oglas uspešno ustvarjen!");
        router.push(`/podjetje/${session?.user.company.slug}`);
      } else {
        toast.error("Oglasa za delo ni bilo mogoče ustvariti!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oglasa za delo ni bilo mogoče ustvariti!");
    }
  };

  return (
    <div className="bg-gray-100 py-[200px] dark:bg-black">
      <div className="mx-auto my-10 mt-10 max-w-4xl rounded-lg bg-white bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Dodaj zaposlitveni oglas</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="position"
              className="mb-2 block font-semibold text-gray-700"
            >
              Naziv:
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block font-semibold text-gray-700"
            >
              Opis zaposlitve:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="min-h-[100px] w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="application"
              className="mb-2 block font-semibold text-gray-700"
            >
              Opis postopka prijave na zaposlitev:
            </label>
            <textarea
              id="application"
              name="application"
              value={formData.application}
              onChange={handleChange}
              className="min-h-[100px] w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="mb-2 block font-semibold text-gray-700"
            >
              Lokacija:
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
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Dodaj oglas
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobAdvertisementPage;
