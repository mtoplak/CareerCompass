import { Feature } from "@/types/feature";
import Image from 'next/image';

const rateData: Feature[] = [
  {
    id: 1,
    icon: <Image
    src="/images/icons/star.png"
    alt="Address Icon"
    width="0"
    height="0"
    sizes="100vw"
    className="h-10 w-10"
  />,
    title: "Splošne ocene",
    paragraph:
      "Oceni podjetje glede ekipe, osebnega razvoja, fleksibilnosti, vodstva, ipd.",
    btn: "Oceni podjetje...",
    btnLink: "/#",
  },
  {
    id: 2,
    icon: <Image
    src="/images/icons/gift.png"
    alt="Address Icon"
    width="0"
    height="0"
    sizes="100vw"
    className="h-10 w-10"
  />,
    title: "Plača in ugodnosti",
    paragraph:
      "Oceni podjetje glede na bonuse, delo na daljavo, rasti plače in druge ugodnosti.",
    btn: "Oceni podjetje...",
    btnLink: "/#",
  },
  {
    id: 3,
    icon: <Image
    src="/images/icons/briefcase.png"
    alt="Address Icon"
    width="0"
    height="0"
    sizes="100vw"
    className="h-8 w-8"
  />,
    title: "Razgovori",
    paragraph:
      "Oceni podjetje glede na vaše izkušnje s trajanjem postopka razgovora in težavnostjo.",
    btn: "Oceni podjetje...",
    btnLink: "/#",
  },
];
export default rateData;
