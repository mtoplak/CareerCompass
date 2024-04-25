import { Company } from "./entities/company.model";
import { JobAdvertisement } from "./entities/job-advertisement.model";
import { Industry } from "./enums/industry.enum";

export interface SuccessResponse {
    success: boolean;
}

export interface CompanyResponse {
    id: string;
    name: string;
    address: string;
    city: string;
    logo: string;
    industry: Industry;
    email: string;
    claimed: boolean;
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
    team: string;
    personal_development: string;
    flexibility: string;
    work_life_balance: string;
    work_enviroment: string;
    leadership: string;
    general_assessment_comment: string;
    benefits: string;
    remote_work: string;
    bonuses: string;
    salary_and_benefits_comment: string;
    experience: string;
    duration: string;
    difficulty: string;
    interviews_comment: string;
}