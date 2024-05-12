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
        <div className="container mx-auto grid grid-cols-1 items-center justify-between gap-2 rounded-xl bg-gray-100 px-[20px] py-[20px] dark:bg-gray-600 md:grid-cols-2 lg:grid-cols-10">
          <input
            type="text"
            placeholder="Vnesi ime"
            className="col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none md:col-span-1 lg:col-span-2"
            name="ime"
            defaultValue={ime}
          />
          <input
            type="text"
            placeholder="Vnesi lokacijo"
            className="col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none md:col-span-1 lg:col-span-2"
            name="lokacija"
            defaultValue={lokacija}
          />
          <select
            id="industry"
            className="lg:col-span-3 col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none md:col-span-1"
            name="dejavnost"
            defaultValue={dejavnost}
          >
            <option value="">Vse dejavnosti</option>
            <option value="Avtomobilizem">Avtomobilizem</option>
            <option value="Dom_in_vrt">Dom in vrt</option>
            <option value="Gostinstvo in turizem">Gostinstvo in turizem</option>
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
          <select
            id="rating"
            className="col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none md:col-span-1 lg:col-span-2"
            name="ocena"
            defaultValue={ocena}
          >
            <option value="">Vse ocene</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
          </select>
          <button className="focus:shadow-outline col-span-1 rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500 focus:outline-none md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center">
              <Image
                  src="/images/hero/compass-icon.png"
                  alt="Search Compass Icon"
                  className="mr-2 h-6 w-6"
                  width="0"
                  height="0"
                  sizes="100vw"
              />
              <span>Poišči</span>
            </div>
          </button>
        </div>
      </section>
    </form>
  );
};

export default CompanyFilter;
