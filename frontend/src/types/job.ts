import { Company } from "./company";

export interface JobAdvertisement{
    position: string;
    description: string;
    city: string;
    company_linked: Company;
    company: string;
    salary: string;
    url: string;
    source: string;
  }