import { CompanyDtoWithout } from "./company.dto";

export class PaginatedCompaniesResponseDto {
    companies: CompanyDtoWithout[];
    count: number;
}