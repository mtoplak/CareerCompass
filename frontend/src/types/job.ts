import { Company } from "./company";

export interface JobAdvertisement {
  position: string;
  description: string;
  city: string;
  company_linked: Company;
  company: string;
  url: string;
  source: string;
}