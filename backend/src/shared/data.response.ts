import { User } from "../db/entities/user.model";
import { AverageRating } from "../db/entities/average-rating.model";
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
    avg_rating: AverageRating;
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    company: Company;
    saved_advertisements: JobAdvertisement[];
}

export interface JobAdvertisementResponse {
    id: string;
    position: string;
    description: string;
    city: string;
    company_linked: Company;
    company: string;
    hourly_rate: string;
    url: string;
    source: string;
}

export interface RatingResponse {
    id: string;
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

export interface ChatHistoryResponse {
    id: string;
    user: User;
    chat_history: string[];
}