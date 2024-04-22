import { JobAdvertisement } from "./entities/job-advertisement.model";
import { Industry } from "./enums/industry.enum";

export interface SuccessResponse {
    success: boolean;
}

export interface CompanyResponse {
    id: string;
    naziv: string;
    naslov: string;
    kraj: string;
    logo: string;
    panoga: Industry;
    email: string;
}

export interface UserResponse {
    name: string;
    surname: string;
    email: string;
    saved_advertisements: JobAdvertisement[];
}