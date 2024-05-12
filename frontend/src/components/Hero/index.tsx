import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-indigo-800 bg-[url('/images/hero/hero-background-indigo-700.png')] pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center ">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
                  Dobrodošli na CareerCompass
                </h1>
                <p className="mx-auto mb-9 max-w-[600px] text-base font-medium text-white sm:text-lg sm:leading-[1.44]">
                  Inovativna platforma, ki omogoča ocenjevanje slovenskih
                  podjetij s strani zaposlenih, hkrati pa nudi možnost iskanja
                  zaposlitve in objavo zaposlitvenih oglasov.
                </p>
                <form action="/iskanje" method="get">
                  <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
                    <li>
                      <input
                        type="text"
                        placeholder="Poišči podjetje"
                        className="w-64 rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                        name="ime"
                      />
                    </li>
                    <li>
                      <button
                        type="submit"
                        className="focus:shadow-outline rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500 focus:outline-none"
                      >
                        <Image
                          src="/images/hero/compass-icon.png"
                          alt="logo"
                          width={24}
                          height={24}
                          className="h-6 w-6"
                        />
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-indigo-800">
        <div className="w-full">
          <Image
            src="/images/hero/hero-indigo-950.png"
            alt="Landscape Photo"
            width={1920}
            height={200}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
