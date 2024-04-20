import { Panoge } from "./enums/panoge.enum";

export interface SuccessResponse {
    success: boolean;
}

export interface CompanyResponse {
    id: string;
    naziv: string;
    naslov: string;
    kraj: string;
    logo: string;
    panoga: Panoge;
    email: string;
}