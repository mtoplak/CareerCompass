"use client";
import { useState } from "react";
import { Rating } from "@material-tailwind/react";
import { api } from "@/constants";
import { Company } from "@/types/company";


type Props = {
  company: Company;
};

const RateCompany = ({ company }: Props) => {
  const [experience, setExperience] = useState("");
  const [interviewDifficulty, setInterviewDifficulty] = useState("");
  const [formData, setFormData] = useState({
    company_slug: company.slug,
    team: null,
    personal_development: null,
    flexibility: null,
    work_life_balance: null,
    work_environment: null,
    leadership: null,
    general_assessment_comment: "",
    benefits: null,
    remote_work: false,
    salary_and_benefits_comment: "",
    bonuses: null,
    experience: "Nevtralna",
    duration: "",
    difficulty: "Srednje",
    interviews_comment: "",
  });

  const handleSubmit = async (e: any) => {
    console.log(company.slug + " slug pojetja")
    console.log(company.name + " ime pojetja")
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch(`${api}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response)
      const responseData = await response.json();
      console.log("Rating submitted successfully:", responseData);
      setFormData({
        company_slug: company.slug,
        team: null,
        personal_development: null,
        flexibility: null,
        work_life_balance: null,
        work_environment: null,
        leadership: null,
        general_assessment_comment: "",
        benefits: null,
        remote_work: false,
        salary_and_benefits_comment: "",
        bonuses: null,
        experience: "",
        duration: "",
        difficulty: "",
        interviews_comment: "",
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };
  
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(checked ? "checked" : "")
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  return (
    <div>
      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Oceni podjetje {company.name}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
          
        >
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between ">
            <h2 className="mb-2 text-xl font-semibold">Splošna ocena</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="team"
                  className="block text-md font-semibold leading-6 text-gray-900"
                >
                  Ekipa
                </label>
                <Rating
                  id="team"
                  value={0}
                  onChange={handleChange}
                  className="text-yellow-400"
                  defaultValue={0} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
              </div>
              <div>
                <label
                  htmlFor="personal_development"
                  className="block text-md font-semibold leading-6 text-gray-900"
                >
                  Osebna rast
                </label>
                <Rating
                  id="personal_development"
                  value={0}
                  onChange={handleChange}
                  className="text-yellow-400"
                  defaultValue={0} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="mt-4">
                <label
                  htmlFor="flexibility"
                  className="block text-md font-semibold leading-6 text-gray-900"
                >
                  Fleksibilnost
                </label>
                <Rating
                  id="flexibility"
                  value={0}
                  onChange={handleChange}
                  className="text-yellow-400"
                  defaultValue={0} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="work_life_balance"
                  className="block text-md font-semibold leading-6 text-gray-900"
                >
                  Ravnovesje dela in življenja
                </label>
                <Rating
                  id="work_life_balance"
                  value={0}
                  onChange={handleChange}
                  className="text-yellow-400"
                  defaultValue={0} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="mt-4">
                <label
                  htmlFor="work_environment"
                  className="block text-md font-semibold leading-6 text-gray-900"
                >
                  Delovno vzdušje
                </label>
                <Rating
                  id="work_environment"
                  value={0}
                  onChange={handleChange}
                  className="text-yellow-400"
                  defaultValue={0} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="leadership"
                  className="block text-md font-semibold leading-6 text-gray-900"
                >
                  Vodstvo
                </label>
                <Rating
                  id="leadership"
                  value={0}
                  onChange={handleChange}
                  className="text-yellow-400"
                  defaultValue={0} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
              </div>
            </div>
            <div className="sm:col-span-2 mt-4">
              <label
                htmlFor="general_assessment_comment"
                className="block text-md font-semibold leading-6 text-gray-900"
              >
                Komentar
              </label>
              <div>
                <textarea
                  name="general_assessment_comment"
                  id="general_assessment_comment"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
            <h2 className="mb-2 text-xl font-semibold">Plače in ugodnosti</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="mt-4">
                <label
                  htmlFor="benefits"
                  className="block text-md font-semibold leading-6 text-gray-900"
                >
                  Ugodnosti
                </label>
                <Rating
                  id="benefits"
                  value={0}
                  onChange={handleChange}
                  className="text-yellow-400"
                  defaultValue={0} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="bonuses"
                  className="block text-md font-semibold leading-6 text-gray-900"
                >
                  Bonusi
                </label>
                <Rating
                  id="bonuses"
                  value={0}
                  onChange={handleChange}
                  className="text-yellow-400"
                  defaultValue={0} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
              </div>
            </div>
            <div className="sm:col-span-2 mt-4">
              <label
                htmlFor="remote_work"
                className="block text-md font-semibold leading-6 text-gray-900"
              >
                Delo na daljavo
              </label>
              <div>
                <div className="flex items-center gap-4">
                <input type="checkbox" id="remote_work" name="remote_work" onChange={handleChange}/>
                  <label htmlFor="remote_work">Omogočeno</label>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 mt-4">
              <label
                htmlFor="salary_and_benefits_comment"
                className="block text-md font-semibold leading-6 text-gray-900"
              >
                Komentar
              </label>
              <div>
                <textarea
                  name="salary_and_benefits_comment"
                  id="salary_and_benefits_comment"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between">
            <h2 className="mb-2 text-xl font-semibold">Razgovori</h2>
            <div className="sm:col-span-2 mt-4">
              <label
                htmlFor="duration"
                className="block text-md font-semibold leading-6 text-gray-900"
              >
                Dolžina
              </label>
              <div>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="mt-4">
                <label
                  htmlFor="interviewDifficulty"
                  className="block text-md font-semibold leading-6 text-gray-900"
                >
                  Težavnost razgovora
                </label>
                <div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="interviewDifficultyEasy"
                      name="interviewDifficulty"
                      value="Enostavno"
                      checked={interviewDifficulty === "Enostavno"}
                      onChange={() => setInterviewDifficulty("Enostavno")}
                      required
                    />
                    <label htmlFor="interviewDifficultyEasy">Enostavno</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="interviewDifficultyMedium"
                      name="interviewDifficulty"
                      value="Srednje"
                      checked={interviewDifficulty === "Srednje"}
                      onChange={() => setInterviewDifficulty("Srednje")}
                    />
                    <label htmlFor="interviewDifficultyMedium">Srednje</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="interviewDifficultyHard"
                      name="interviewDifficulty"
                      value="Težko"
                      checked={interviewDifficulty === "Težko"}
                      onChange={() => setInterviewDifficulty("Težko")}
                    />
                    <label htmlFor="interviewDifficultyHard">Težko</label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-md font-semibold leading-6 text-gray-900">
                  Izkušnja z razgovorom
                </label>
                <div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="positiveExperience"
                      name="experience"
                      value="Pozitivna"
                      checked={experience === "Pozitivna"}
                      onChange={() => setExperience("Pozitivna")}
                    />
                    <label htmlFor="positiveExperience">Pozitivna</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="neutralExperience"
                      name="experience"
                      value="Nevtralna"
                      checked={experience === "Nevtralna"}
                      onChange={() => setExperience("Nevtralna")}
                    />
                    <label htmlFor="neutralExperience">Nevtralna</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="negativeExperience"
                      name="experience"
                      value="Negativna"
                      checked={experience === "Negativna"}
                      onChange={() => setExperience("Negativna")}
                    />
                    <label htmlFor="negativeExperience">Negativna</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 mt-4">
              <label
                htmlFor="interviews_comment"
                className="block text-md font-semibold leading-6 text-gray-900"
              >
                Komentar
              </label>
              <div>
                <textarea
                  name="interviews_comment"
                  id="interviews_comment"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Oceni podjetje
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RateCompany;
