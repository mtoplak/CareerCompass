import Image from "next/image";

const CompanyFilter = ({
  ime,
  lokacija,
  dejavnost,
  ocena,
}: {
  ime?: string;
  lokacija?: string;
  dejavnost?: string;
  ocena?: string;
}) => {
  return (
    <form action="/iskanje">
      <section
        id="company-filter"
        className="bg-gray-1 pb-8 pt-10 dark:bg-dark-2 lg:pb-[70px]"
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between rounded-xl bg-gray-100 px-[20px] py-[20px] dark:bg-gray-600">
          <div className="mx-2 mb-4 flex min-w-[160px] flex-1 lg:col-span-1 lg:mb-0">
            <input
              type="text"
              placeholder="Vnesi ime"
              className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="ime"
              defaultValue={ime}
            />
          </div>
          <div className="mx-2 mb-4 flex min-w-[160px] flex-1 lg:col-span-1 lg:mb-0">
            <input
              type="text"
              placeholder="Vnesi lokacijo"
              className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="lokacija"
              defaultValue={lokacija}
            />
          </div>
          <div className="mx-2 mb-4 flex min-w-[160px] flex-1 lg:col-span-1 lg:mb-0">
            <select
              id="industry"
              className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="dejavnost"
              defaultValue={dejavnost}
            >
              <option value="">Vse dejavnosti</option>
              <option value="Avtomobilizem">Avtomobilizem</option>
              <option value="Dom_in_vrt">Dom in vrt</option>
              <option value="Gostinstvo in turizem">
                Gostinstvo in turizem
              </option>
              <option value="Izobraževanje in kultura">
                Izobraževanje in kultura
              </option>
              <option value="Kmetijstvo">Kmetijstvo</option>
              <option value="Lepota in zdravje">Lepota in zdravje</option>
              <option value="Poslovni svet">Poslovni svet</option>
              <option value="Proizvodnja in obrt">Proizvodnja in obrt</option>
              <option value="Prosti čas">Prosti čas</option>
              <option value="Računalništvo in informatika">
                Računalništvo in informatika
              </option>
            </select>
          </div>
          <div className="mx-2 mb-4 flex min-w-[160px] flex-1 lg:col-span-1 lg:mb-0">
            <select
              id="rating"
              className="w-full rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="ocena"
              defaultValue={ocena}
            >
              <option value="">Vse ocene</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
          </div>
          <div className="mx-2 mt-4 flex w-full justify-center lg:mt-0 lg:w-auto">
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
