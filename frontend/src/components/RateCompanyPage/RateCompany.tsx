"use client";
import { useState } from "react";
import { Rating } from "@material-tailwind/react";
import { api } from "@/constants";
import { Company } from "@/types/company";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  company: Company;
};

const initialRatings = {
  team: 0,
  personal_development: 0,
  flexibility: 0,
  work_life_balance: 0,
  work_environment: 0,
  leadership: 0,
  benefits: 0,
  bonuses: 0,
};

const initialFormData = {
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
};

const RateCompany = ({ company }: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company_slug: company.slug,
    ...initialFormData,
  });
  const [ratings, setRatings] = useState(initialRatings);

  const handleChangeRating = (id: any, value: any) => {
    setRatings((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    for (const key in ratings) {
      if (ratings[key as keyof typeof ratings] === 0) {
        toast.error("Prosimo, ocenite vse kategorije.");
        return;
      }
    }

    if (!formData.experience || !formData.difficulty) {
      toast.error("Prosimo, izberite izkušnjo in težavnost razgovora.");
      return;
    }

    const commentsToCheck = [
      formData.salary_and_benefits_comment,
      formData.general_assessment_comment,
      formData.interviews_comment,
    ];

    try {
      for (const comment of commentsToCheck) {
        const commentCheckResponse = await fetch(`${api}/ai/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        });

        const isCommentValid = await commentCheckResponse.json();

        if (!isCommentValid) {
          toast.error("Komentar vsebuje neprimerno vsebino.");
          return;
        }
      }

      const rating = { ...formData, ...ratings };
      const response = await fetch(`${api}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rating),
      });

      toast.success("Uspešno ste ocenili podjetje!");
      router.push(`/podjetje/${company.slug}`);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error submitting rating:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  return (
    <div>
      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
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
                  className="text-md block font-semibold leading-6 text-gray-900"
                >
                  Ekipa
                </label>
                <Rating
                  id="team"
                  value={ratings.team}
                  onChange={(value) => handleChangeRating("team", value)}
                  className="text-yellow-400"
                  defaultValue={0}
                  placeholder={undefined}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
              </div>
              <div>
                <label
                  htmlFor="personal_development"
                  className="text-md block font-semibold leading-6 text-gray-900"
                >
                  Osebna rast
                </label>
                <Rating
                  id="personal_development"
                  value={ratings.personal_development}
                  onChange={(value) =>
                    handleChangeRating("personal_development", value)
                  }
                  className="text-yellow-400"
                  defaultValue={0}
                  placeholder={undefined}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="mt-4">
                <label
                  htmlFor="flexibility"
                  className="text-md block font-semibold leading-6 text-gray-900"
                >
                  Fleksibilnost
                </label>
                <Rating
                  id="flexibility"
                  value={ratings.flexibility}
                  onChange={(value) => handleChangeRating("flexibility", value)}
                  className="text-yellow-400"
                  defaultValue={0}
                  placeholder={undefined}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="work_life_balance"
                  className="text-md block font-semibold leading-6 text-gray-900"
                >
                  Ravnovesje dela in življenja
                </label>
                <Rating
                  id="work_life_balance"
                  value={ratings.work_life_balance}
                  onChange={(value) =>
                    handleChangeRating("work_life_balance", value)
                  }
                  className="text-yellow-400"
                  defaultValue={0}
                  placeholder={undefined}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="mt-4">
                <label
                  htmlFor="work_environment"
                  className="text-md block font-semibold leading-6 text-gray-900"
                >
                  Delovno vzdušje
                </label>
                <Rating
                  id="work_environment"
                  value={ratings.work_environment}
                  onChange={(value) =>
                    handleChangeRating("work_environment", value)
                  }
                  className="text-yellow-400"
                  defaultValue={0}
                  placeholder={undefined}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="leadership"
                  className="text-md block font-semibold leading-6 text-gray-900"
                >
                  Vodstvo
                </label>
                <Rating
                  id="leadership"
                  value={ratings.leadership}
                  onChange={(value) => handleChangeRating("leadership", value)}
                  className="text-yellow-400"
                  defaultValue={0}
                  placeholder={undefined}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
              </div>
            </div>
            <div className="mt-4 sm:col-span-2">
              <label
                htmlFor="general_assessment_comment"
                className="text-md block font-semibold leading-6 text-gray-900"
              >
                Komentar
              </label>
              <div>
                <textarea
                  name="general_assessment_comment"
                  id="general_assessment_comment"
                  rows={4}
                  className="block min-h-[100px] w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue=""
                  value={formData.general_assessment_comment}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between ">
            <h2 className="mb-2 text-xl font-semibold">Plače in ugodnosti</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="benefits"
                  className="text-md block font-semibold leading-6 text-gray-900"
                >
                  Ugodnosti
                </label>
                <Rating
                  id="benefits"
                  value={ratings.benefits}
                  onChange={(value) => handleChangeRating("benefits", value)}
                  className="text-yellow-400"
                  defaultValue={0}
                  placeholder={undefined}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
              </div>
              <div>
                <label
                  htmlFor="bonuses"
                  className="text-md block font-semibold leading-6 text-gray-900"
                >
                  Bonusi
                </label>
                <Rating
                  id="bonuses"
                  value={ratings.bonuses}
                  onChange={(value) => handleChangeRating("bonuses", value)}
                  className="text-yellow-400"
                  defaultValue={0}
                  placeholder={undefined}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="remote_work"
                className="text-md block font-semibold leading-6 text-gray-900"
              >
                Delo na daljavo
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remote_work"
                  id="remote_work"
                  checked={formData.remote_work}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remote_work"
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  Omogočeno
                </label>
              </div>
            </div>
            <div className="mt-4 sm:col-span-2">
              <label
                htmlFor="salary_and_benefits_comment"
                className="text-md block font-semibold leading-6 text-gray-900"
              >
                Komentar
              </label>
              <div>
                <textarea
                  name="salary_and_benefits_comment"
                  id="salary_and_benefits_comment"
                  rows={4}
                  className="block min-h-[100px] w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue=""
                  value={formData.salary_and_benefits_comment}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-[20px] gap-y-8 rounded-xl bg-gray-100 px-4 py-[20px] dark:bg-slate-700 md:items-start md:justify-between ">
            <h2 className="mb-2 text-xl font-semibold">Razgovori</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <fieldset>
                <legend className="text-md font-semibold leading-6 text-gray-900">
                  Izkušnja z razgovori
                </legend>
                <div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="good"
                      name="experience"
                      type="radio"
                      value="Pozitivna"
                      checked={formData.experience === "Pozitivna"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="good"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Pozitivna
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="neutral"
                      name="experience"
                      type="radio"
                      value="Nevtralna"
                      checked={formData.experience === "Nevtralna"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="neutral"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nevtralna
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      type="radio"
                      id="negativeExperience"
                      name="experience"
                      value="Negativna"
                      checked={formData.experience === "Negativna"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="negativeExperience"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Negativna
                    </label>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-md font-semibold leading-6 text-gray-900">
                  Težavnost
                </legend>
                <div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="easy"
                      name="difficulty"
                      type="radio"
                      value="Enostavno"
                      checked={formData.difficulty === "Enostavno"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="easy"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Enostavno
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="medium"
                      name="difficulty"
                      type="radio"
                      value="Srednje"
                      checked={formData.difficulty === "Srednje"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="medium"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Srednje
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="hard"
                      name="difficulty"
                      type="radio"
                      value="Težko"
                      checked={formData.difficulty === "Težko"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="hard"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Težko
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="mt-4 sm:col-span-2">
              <label
                htmlFor="interviews_comment"
                className="text-md block font-semibold leading-6 text-gray-900"
              >
                Komentar
              </label>
              <div>
                <textarea
                  name="interviews_comment"
                  id="interviews_comment"
                  rows={4}
                  className="block min-h-[100px] w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue=""
                  value={formData.interviews_comment}
                  onChange={handleChange}
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
