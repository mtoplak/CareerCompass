import { Industry } from "../../../enums/industry.enum";

export class CreateCompanyDto {
  id: string;
  name: string;
  address: string;
  city: string;
  logo: string;
  slug: string;
  website: string;
  industry: Industry[];
  subindustry: string[];
  email: string;
}
