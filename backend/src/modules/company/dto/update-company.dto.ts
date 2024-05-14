import { Industry } from "../../../enums/industry.enum";

export class UpdateCompanyDto {
  name?: string;
  address?: string;
  city?: string;
  logo?: string;
  website?: string;
  industry?: Industry[];
  subindustry?: string[];
  email?: string;
}
