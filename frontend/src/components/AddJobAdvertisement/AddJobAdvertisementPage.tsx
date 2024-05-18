"use client";
import { api } from "@/constants";
import { Company } from "@/types/company";
import React, { useState } from "react";

type Props = {
  company: Company;
};

//bo treba popravit <333 TODO

const AddJobAdvertisementPage = ({ company }: Props) => {
  const [formData, setFormData] = useState({
    position: "",
    description: "",
    city: "",
    company_linked: "",
    company: `${company.name}`,
    url: `${api}/podjetje/${company.slug}`,
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
        alert("Job advertisement created successfully!");
      } else {
        alert("Failed to create job advertisement.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-auto my-10 mt-10 mt-[100px] max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Dodaj zaposlitev</h1>
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
            Opis:
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
  );
};

export default AddJobAdvertisementPage;
