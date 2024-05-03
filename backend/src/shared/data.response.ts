import { Company } from "../db/entities/company.model";
import { JobAdvertisement } from "../db/entities/job-advertisement.model";
import { Industry } from "../enums/industry.enum";
import { InterviewDifficulty } from "../enums/interview-difficulty.enum";
import { InterviewExperience } from "../enums/interview-experience.enum";

export interface SuccessResponse {
    success: boolean;
}

export interface CompanyResponse {
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
    avg_duration: string[];
    remote_work_distribution: {
        yes: number,
        no: number,
    };
    remote_work_percentage: {
        yes: number,
        no: number,
    };
    experience_distribution: {
        pozitivna: number,
        nevtralna: number,
        negativna: number,
    };
    experience_percentage: {
        pozitivna: number,
        nevtralna: number,
        negativna: number,
    };
    difficulty_distribution: {
        enostavno: number,
        srednje: number,
        težko: number,
    };
    difficulty_percentage: {
        enostavno: number,
        srednje: number,
        težko: number,
    };
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    saved_advertisements: JobAdvertisement[];
}

export interface JobAdvertisementResponse {
    id: string;
    position: string;
    description: string;
    address: string;
    city: string;
    company_linked: Company;
    company_nlinked: string;
    hourly_rate: string;
}

export interface RatingResponse {
    id: string;
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
    experience: InterviewExperience;
    duration: string;
    difficulty: InterviewDifficulty;
    interviews_comment: string;
}