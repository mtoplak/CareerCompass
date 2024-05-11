import Image from "next/image";

const CompanyFilter = () => {
  return (
    <form action="/iskanje">
      <section
        id="company-filter"
        className="bg-gray-1 pb-8 pt-10 dark:bg-dark-2 lg:pb-[70px]"
      >
        <div className="container mx-auto flex flex-wrap justify-between items-center bg-gray-100 dark:bg-gray-600 px-[20px] py-[20px] rounded-xl">
          <div className="flex flex-1 min-w-[160px] mx-2 mb-4 lg:mb-0 lg:col-span-1">
            <input
              type="text"
              placeholder="Vnesi ime..."
              className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="ime"
            />
          </div>
          <div className="flex flex-1 min-w-[160px] mx-2 mb-4 lg:mb-0 lg:col-span-1">
            <input
              type="text"
              placeholder="Vnesi lokacijo..."
              className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="lokacija"
            />
          </div>
          <div className="flex flex-1 min-w-[160px] mx-2 mb-4 lg:mb-0 lg:col-span-1">
            <select
              id="industry"
              className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="dejavnost"
              defaultValue=""
            >
              <option value="" disabled hidden>Dejavnost</option>
              <option>Avtomobilizem</option>
              <option>Dom in vrt</option>
              <option>Gostinstvo in turizem</option>
              <option>Izobraževanje in kultura</option>
              <option>Kmetijstvo</option>
              <option>Lepota in zdravje</option>
              <option>Poslovni svet</option>
              <option>Proizvodnja in obrt</option>
              <option>Prosti čas</option>
              <option>Računalništvo in informatika</option>
            </select>
          </div>
          <div className="flex flex-1 min-w-[160px] mx-2 mb-4 lg:mb-0 lg:col-span-1">
            <select
              id="rating"
              className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="ocena"
              defaultValue=""
            >
              <option value="" disabled hidden>Ocena</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
          </div>
          <div className="flex w-full justify-center mx-2 mt-4 lg:mt-0 lg:w-auto">
            <button className="focus:shadow-outline rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500 focus:outline-none">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/hero/compass-icon.png"
                  alt="logo"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span>Poišči</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default CompanyFilter;
