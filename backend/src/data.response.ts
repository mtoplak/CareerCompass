import { Company } from "./entities/company.model";
import { JobAdvertisement } from "./entities/job-advertisement.model";
import { Industry } from "./enums/industry.enum";
import { InterviewDifficulty } from "./enums/interview-difficulty.enum";
import { InterviewExperience } from "./enums/interview-experience.enum";

export interface SuccessResponse {
    success: boolean;
}

export interface CompanyResponse {
    id: string;
    name: string;
    address: string;
    city: string;
    logo: string;
    industry: Industry[];
    email: string;
    claimed: boolean;
    avg_rating: number;
}

export interface UserResponse {
    id: string;
    name: string;
    surname: string;
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
    work_enviroment: number;
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