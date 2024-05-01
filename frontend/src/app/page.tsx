import CallToAction from "@/components/CallToAction";
import ScrollUp from "@/components/Common/ScrollUp";
import LandingPageRate from "@/components/LandingPageRate";
import Hero from "@/components/Hero";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";
import LandingPageJobs from "@/components/LandingPageJobs";

export const metadata: Metadata = {
  title: "Career Compass",
  description:
    "CareerCompass is a platform that helps job seekers to find the right company to work for. It provides a list of companies with their ratings and reviews. Users can also look for job advertisements and chat with an AI chatbot to get career advice.",
};

//potrebno spremenit funkcijo za najbolje ocenjene ko se naredi
async function getCompanies() {
  const res = await fetch(`http://localhost:4000/company`, {
    cache: "no-store",
  });
  const companies = await res.json();

  return companies;
}

const Home = async () => {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
  const companies = await getCompanies();

  return (
    <main>
      <ScrollUp />
      <Hero />
      <LandingPageRate companies={companies} />
      <CallToAction />
      <LandingPageJobs />
    </main>
  );
}

export default Home;