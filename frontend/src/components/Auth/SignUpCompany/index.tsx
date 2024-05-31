"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "@/components/Common/Loader";
import { Industry, industries } from "@/types/industry";
import { industryMappings } from "@/types/subindustry";

const industryOptions = industries.map((industry: Industry) => (
  <option key={industry} value={industry}>
    {industry}
  </option>
));

const SignUpCompany = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const requiredFields: Record<string, string> = {
      name: "Ime podjetja",
      email: "Email",
      address: "Naslov",
      city: "Mesto",
      industry: "Dejavnost",
      subindustry: "Poddejavnost",
    };

    for (const field in requiredFields) {
      if (!values[field]) {
        toast.error(`Prosimo izpolnite polje ${requiredFields[field]}.`);
        setLoading(false);
        return;
      }
    }
    if (!companyLogo) {
      toast.error("Prosimo dodajte logotip podjetja.");
      setLoading(false);
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(companyLogo);
    reader.onload = async function () {
      const base64String = reader.result;
      const data = {
        ...values,
        logo: base64String,
      };

      const res = await fetch("/api/registerCompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        toast.success(
          "Uspešna registracija! Zdaj lahko prevzamete profil podjetja in nato boste dobili potrditveni mail.",
        );
        router.push("/za-delodajalce/prevzemi");
      } else if (res.status === 413) {
        toast.error("Naložena datoteka je prevelika.");
      } else {
        toast.error("Napaka pri registraciji podjetja.");
      }
      setLoading(false);
    };
  };

  return (
    <section className="bg-gray-1 py-14 dark:bg-dark lg:py-[90px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp shadow-form relative mx-auto max-w-[525px] overflow-hidden rounded-xl bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
              data-wow-delay=".15s"
            >
              <div className="mb-10 text-center">
                <Link href="/" className="mx-auto inline-block max-w-[160px]">
                  <Image
                    src="/images/logo/logocompass.png"
                    alt="logo"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-auto w-full dark:hidden"
                    style={{ maxWidth: "100px" }}
                  />
                  <Image
                    src="/images/logo/logocompass.png"
                    alt="logo"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="hidden h-auto w-full dark:block"
                    style={{ maxWidth: "100px" }}
                  />
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-base text-dark dark:text-white"
                  >
                    Ime podjetja
                  </label>
                  <input
                    type="text"
                    placeholder="Polno ime podjetja"
                    name="name"
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-base text-dark dark:text-white"
                  >
                    Naslov
                  </label>
                  <input
                    type="text"
                    placeholder="Naslov podjetja"
                    name="address"
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="city"
                    className="mb-2 block text-base text-dark dark:text-white"
                  >
                    Mesto
                  </label>
                  <input
                    type="text"
                    placeholder="Mesto podjetja"
                    name="city"
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-base text-dark dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email podjetja"
                    name="email"
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="website"
                    className="mb-2 block text-base text-dark dark:text-white"
                  >
                    Spletna stran
                  </label>
                  <input
                    type="text"
                    placeholder="Spletna stran"
                    name="website"
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="industry"
                    className="mb-2 block text-base text-dark dark:text-white"
                  >
                    Dejavnost
                  </label>
                  <select
                    name="industry"
                    className="col-span-1 w-full rounded-md border px-5 py-3 focus:outline-none dark:border-dark-3 dark:bg-gray-800 dark:focus:border-primary md:col-span-1 lg:col-span-3"
                    onChange={(e) =>
                      setSelectedIndustry(e.target.value as Industry)
                    }
                  >
                    <option value="">Dejavnost</option>
                    {industryOptions}
                  </select>
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="subindustry"
                    className="mb-2 block text-base text-dark dark:text-white"
                  >
                    Poddejavnost
                  </label>
                  <select
                    name="subindustry"
                    className="col-span-1 w-full rounded-md border px-5 py-3 focus:outline-none dark:border-dark-3 dark:bg-gray-800 dark:focus:border-primary md:col-span-1 lg:col-span-3"
                  >
                    <option value="">Poddejavnost</option>
                    {subindustryOptions}
                  </select>
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="companyLogo"
                    className="mb-2 block text-base text-dark dark:text-white"
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
                    <div className="rounded-md border border-stroke bg-transparent px-5 py-3 text-left text-dark outline-none transition placeholder:text-dark-6 focus-within:border-primary dark:border-dark-3 dark:text-gray-400 dark:focus-within:border-primary">
                      {companyLogo ? companyLogo.name : "Izberi datoteko"}
                    </div>
                  </div>
                </div>
                <div className="mb-9">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-indigo-600 px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-indigo-500"
                  >
                    Registracija {loading && <Loader />}
                  </button>
                </div>
              </form>

              <p className="text-body-secondary mb-4 text-base">
                Z ustvarjanjem računa podjetja se strinjate s{" "}
                <a href="/#" className="text-indigo-600 hover:underline">
                  Politiko zasebnosti (GDPR)
                </a>{" "}
                in{" "}
                <a href="/#" className="text-indigo-600 hover:underline">
                  Splošnimi pogoji poslovanja
                </a>
                . Vaše podjetje bo javno vidno in na voljo za ocenjevanje.
              </p>

              <p className="text-body-secondary text-base">
                Ali je vaše podjetje že na platoformi?
                <Link
                  href="/za-delodajalce/prevzemi"
                  className="pl-2 text-indigo-600 hover:underline"
                >
                  Prevzemite profil
                </Link>
              </p>

              <div>
                <span className="absolute right-1 top-1">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="1.39737"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 1.39737 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 1.39737 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 13.6943 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 13.6943 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 25.9911 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 25.9911 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 38.288 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 38.288 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 1.39737 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 13.6943 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 25.9911 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 38.288 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 1.39737 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 13.6943 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 25.9911 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 38.288 14.0086)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
                <span className="absolute bottom-1 left-1">
                  <svg
                    width="29"
                    height="40"
                    viewBox="0 0 29 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="2.288"
                      cy="25.9912"
                      r="1.39737"
                      transform="rotate(-90 2.288 25.9912)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="25.9911"
                      r="1.39737"
                      transform="rotate(-90 14.5849 25.9911)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="25.9911"
                      r="1.39737"
                      transform="rotate(-90 26.7216 25.9911)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="13.6944"
                      r="1.39737"
                      transform="rotate(-90 2.288 13.6944)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="13.6943"
                      r="1.39737"
                      transform="rotate(-90 14.5849 13.6943)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="13.6943"
                      r="1.39737"
                      transform="rotate(-90 26.7216 13.6943)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="38.0087"
                      r="1.39737"
                      transform="rotate(-90 2.288 38.0087)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="1.39739"
                      r="1.39737"
                      transform="rotate(-90 2.288 1.39739)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="38.0089"
                      r="1.39737"
                      transform="rotate(-90 14.5849 38.0089)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="38.0089"
                      r="1.39737"
                      transform="rotate(-90 26.7216 38.0089)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="1.39761"
                      r="1.39737"
                      transform="rotate(-90 14.5849 1.39761)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="1.39761"
                      r="1.39737"
                      transform="rotate(-90 26.7216 1.39761)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpCompany;
