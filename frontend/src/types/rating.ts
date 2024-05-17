import { InterviewDifficulty } from "@/enums/interview-difficulty.enum";
import { Company } from "./company";
import { InterviewExperience } from "@/enums/interview-experience.enum";

export interface Rating {
    company_slug: Company;
    team: number;
    personal_development: number;
    flexibility: number;
    work_life_balance: number;
    work_environment: number;
    leadership: number;
    general_assessment_comment: string;
    benefits: number;
    remote_work: boolean;
    bonuses: number;
    salary_and_benefits_comment: string;
    experience: InterviewExperience;
    difficulty: InterviewDifficulty;
    interviews_comment: string;
  }