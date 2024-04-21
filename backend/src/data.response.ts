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