import { useState } from "react";

const RateCompany = () => {
  return (
    <div>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Oceni podjetje
          </h2>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
            <h2 className="mb-2 text-xl font-semibold">Splošna ocena</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="team"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Ekipa
                </label>
                <select
                  id="team"
                  className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
                  name="team"
                  defaultValue=""
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="personal_development"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Osebna rast
                </label>
                <select
                  id="personal_development"
                  className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
                  name="personal_development"
                  defaultValue=""
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              </div>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="flexibility"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Fleksibilnost
                </label>
                <select
                  id="flexibility"
                  className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
                  name="flexibility"
                  defaultValue=""
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="work_life_balance"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Ravnovesje dela in življenja
                </label>
                <select
                  id="work_life_balance"
                  className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
                  name="work_life_balance"
                  defaultValue=""
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              </div>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="work_environment"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Delovno vzdušje
                </label>
                <select
                  id="work_environment"
                  className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
                  name="work_environment"
                  defaultValue=""
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="leadership"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Vodstvo
                </label>
                <select
                  id="leadership"
                  className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
                  name="leadership"
                  defaultValue=""
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="general_assessment_comment"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Komentar
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="general_assessment_comment"
                    id="general_assessment_comment"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
              </div>
            </div>
          </div>
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
            <h2 className="mb-2 text-xl font-semibold">Plače in ugodnosti</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="benefits"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Ugodnosti
                </label>
                <select
                  id="benefits"
                  className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
                  name="benefits"
                  defaultValue=""
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="bonuses"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Bonusi
                </label>
                <select
                  id="bonuses"
                  className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
                  name="bonuses"
                  defaultValue=""
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="salary_and_benefits_comment"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Komentar
              </label>
              <div className="mt-2.5">
                <textarea
                  name="salary_and_benefits_comment"
                  id="salary_and_benefits_comment"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
            <h2 className="mb-2 text-xl font-semibold">Razgovori</h2>
            <div className="sm:col-span-2">
              <label
                htmlFor="interviews_comment"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Komentar
              </label>
              <div className="mt-2.5">
                <textarea
                  name="interviews_comment"
                  id="interviews_comment"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Let's talk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RateCompany;
