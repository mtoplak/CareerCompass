import { Injectable } from "@nestjs/common";
import { Company } from "src/db/entities/company.model";
import { CompanyDto } from "./dto/create-update-company.dto";

@Injectable()
export class CompanyMapper {
    mapCompany(companies: Company[]): CompanyDto[] {
        return companies.map(company => this.mapOneCompany(company));
    }

    mapOneCompany(company: Company): CompanyDto {
        return {
            id: company._id.toString(),
            name: company.name,
            address: company.address,
            city: company.city,
            logo: company.logo,
            slug: company.slug,
            website: company.website,
            industry: company.industry,
            email: company.email,
            claimed: company.claimed,
            avg_rating: company.avg_rating,
            ratings_count: company.ratings_count,
            avg_team: company.avg_team,
            avg_personal_development: company.avg_personal_development,
            avg_flexibility: company.avg_flexibility,
            avg_work_life_balance: company.avg_work_life_balance,
            avg_work_environment: company.avg_work_environment,
            avg_leadership: company.avg_leadership,
            avg_benefits: company.avg_benefits,
            avg_bonuses: company.avg_bonuses,
            general_assessment_comments: company.general_assessment_comments,
            salary_and_benefits_comments: company.salary_and_benefits_comments,
            interviews_comments: company.interviews_comments,
            remote_work_distribution: company.remote_work_distribution,
            experience_distribution: company.experience_distribution,
            difficulty_distribution: company.difficulty_distribution,
            remote_work_percentage: company.remote_work_percentage,
            experience_percentage: company.experience_percentage,
            difficulty_percentage: company.difficulty_percentage,
            
        } as CompanyDto;
    }
}