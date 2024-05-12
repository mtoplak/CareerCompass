import { Company } from "./company";

export interface Rating {
    company: Company;
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
    experience: {
        pozitivna: number;
        nevtralna: number;
        negativna: number;
    };
    duration: string;
    difficulty: {
        enostavno: number;
        srednje: number;
        težko: number;
    };
    interviews_comment: string;
  }