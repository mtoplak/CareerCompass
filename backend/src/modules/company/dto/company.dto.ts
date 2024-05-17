import { Industry } from "../../../enums/industry.enum";

export class CompanyDto {
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
  avg_rating: number;
  ratings_count: number;
  avg_team: number;
  avg_personal_development: number;
  avg_flexibility: number;
  avg_work_life_balance: number;
  avg_work_environment: number;
  avg_leadership: number;
  avg_benefits: number;
  avg_bonuses: number;
  general_assessment_comments: string[];
  salary_and_benefits_comments: string[];
  interviews_comments: string[];
  remote_work_distribution: { yes: number, no: number };
  remote_work_percentage: { yes: number, no: number };
  experience_distribution: { pozitivna: number, nevtralna: number, negativna: number };
  experience_percentage: { pozitivna: number, nevtralna: number, negativna: number };
  difficulty_distribution: { enostavno: number, srednje: number, težko: number };
  difficulty_percentage: { enostavno: number, srednje: number, težko: number };
}

export class CompanyDtoWithout {
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
  avg_rating: number;
}
