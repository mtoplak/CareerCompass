import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleRating";
import ratingData from "./ratingData";

const LandingPageRate = () => {
  return (
    <section className="pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-[120px]">
      <div className="container bg-indigo-50 sm:py-[20px] sm:px-[20px] dark:bg-slate-800 rounded-xl">
        <SectionTitle
          subtitle="Ocenjevanje"
          title="Podaj oceno o podjetju"
          paragraph="Omogočamo možnost podajanja ocen glede na vaše izkušnje na različnih področjih znotraj podjetja."
        />

        <div className="md:flex md:items-start md:justify-between mt-12 md:mt-20 ">
          {ratingData.map((feature, i) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPageRate;