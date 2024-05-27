import { Company } from "./company";

export interface JobAdvertisement {
  _id: string;
  id?: string;
  position: string;
  description: string;
  city: string;
  company_linked: Company;
  company: string;
  url: string;
  source: string;
}