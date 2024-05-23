"use client";
import React from "react";
import { Company } from "@/types/company";
import { Industry, industries } from "@/types/industry";
import { useState } from "react";
import { industryMappings } from "@/types/subindustry";

type Props = {
  company: Company;
};

const industryOptions = industries.map((industry: Industry) => (
    <option key={industry} value={industry}>
      {industry}
    </option>
  ));

const EditCompany = () => {
    const [selectedIndustry, setSelectedIndustry] = useState<Industry>(
        "" as Industry,
      );

      const [companyLogo, setCompanyLogo] = useState<File | null>(null);

  const subindustries = Object.entries(industryMappings)
    .filter(([subindustry, industry]) => industry === selectedIndustry)
    .map(([subindustry]) => subindustry);

  const subindustryOptions = subindustries.map((subindustry) => (
    <option key={subindustry} value={subindustry}>
      {subindustry}
    </option>
  ));

  return (
    <div className="bg-gray-100 py-[200px] dark:bg-black">
      <div className="mx-auto my-10 mt-10 max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Uredi podatke vašega podjetja</h1>
        <form>
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
              value={""}
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
              value={""}
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
              value={""}
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
              type="url"
              id="website"
              name="website"
              value={""}
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
                    className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setSelectedIndustry(e.target.value as Industry)
                    }
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
                    className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Poddejavnost</option>
                    {subindustryOptions}
                  </select>
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

export default EditCompany;
