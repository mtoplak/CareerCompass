import { AverageRating } from "src/db/entities/average-rating.model";
import { Industry } from "src/enums/industry.enum";

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
  claimed: boolean;
  average: AverageRating;
}
