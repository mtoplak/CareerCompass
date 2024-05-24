import { Injectable } from '@nestjs/common';
import { Company } from '../../db/entities/company.model';
import { AverageRating } from '../../db/entities/average-rating.model';
import { CompanyDto, CompanyDtoWithout } from './dto/company.dto';
import { AverageRatingRepository } from '../average-rating/average-rating.repository';
import { JobAdvertisement } from '../../db/entities/job-advertisement.model';

@Injectable()
export class CompanyMapper {

    mapOneCompany(company: Company, averageRating: AverageRating | null, jobs: JobAdvertisement[] | null): CompanyDto {
        const jobAdvertisements = jobs ? jobs.map(job => ({
            position: job.position,
            description: job.description,
            city: job.city,
            company: job.company,
            url: job.url,
            source: job.source
        })) : null;

        return {
            id: company._id.toString(),
            name: company.name,
            address: company.address,
            city: company.city,
            logo: company.logo,
            slug: company.slug,
            website: company.website,
            industry: company.industry,
            subindustry: company.subindustry,
            email: company.email,
            average: company.average,
            avg_rating: averageRating ? averageRating.avg_rating : 0,
            ratings_count: averageRating ? averageRating.ratings_count : 0,
            avg_team: averageRating ? averageRating.avg_team : 0,
            avg_personal_development: averageRating ? averageRating.avg_personal_development : 0,
            avg_flexibility: averageRating ? averageRating.avg_flexibility : 0,
            avg_work_life_balance: averageRating ? averageRating.avg_work_life_balance : 0,
            avg_work_environment: averageRating ? averageRating.avg_work_environment : 0,
            avg_leadership: averageRating ? averageRating.avg_leadership : 0,
            avg_benefits: averageRating ? averageRating.avg_benefits : 0,
            avg_bonuses: averageRating ? averageRating.avg_bonuses : 0,
            general_assessment_comments: averageRating ? averageRating.general_assessment_comments : [],
            salary_and_benefits_comments: averageRating ? averageRating.salary_and_benefits_comments : [],
            interviews_comments: averageRating ? averageRating.interviews_comments : [],
            remote_work_distribution: averageRating ? averageRating.remote_work_distribution : { yes: 0, no: 0 },
            remote_work_percentage: averageRating ? averageRating.remote_work_percentage : { yes: 0, no: 0 },
            experience_distribution: averageRating ? averageRating.experience_distribution : { pozitivna: 0, nevtralna: 0, negativna: 0 },
            experience_percentage: averageRating ? averageRating.experience_percentage : { pozitivna: 0, nevtralna: 0, negativna: 0 },
            difficulty_distribution: averageRating ? averageRating.difficulty_distribution : { enostavno: 0, srednje: 0, težko: 0 },
            difficulty_percentage: averageRating ? averageRating.difficulty_percentage : { enostavno: 0, srednje: 0, težko: 0 },
            job_advertisements: jobAdvertisements
        } as CompanyDto;
    }

    mapOneCompanyWithout(company: Company, averageRating: AverageRating | null): CompanyDtoWithout {
        return {
            id: company._id.toString(),
            name: company.name,
            address: company.address,
            city: company.city,
            logo: company.logo,
            slug: company.slug,
            website: company.website,
            industry: company.industry,
            subindustry: company.subindustry,
            email: company.email,
            avg_rating: averageRating ? averageRating.avg_rating : 0,
        } as CompanyDtoWithout;
    }

    mapOneCompanyAverage(company: Company): CompanyDtoWithout {
        return {
            id: company._id.toString(),
            name: company.name,
            address: company.address,
            city: company.city,
            logo: company.logo,
            slug: company.slug,
            website: company.website,
            industry: company.industry,
            subindustry: company.subindustry,
            email: company.email,
            average: company.average,
        } as CompanyDtoWithout;
    }

    mapOneCompanyJobs(company: Company, averageRating: AverageRating | null, job: JobAdvertisement | null): CompanyDtoWithout {
        return {
            id: company._id.toString(),
            name: company.name,
            address: company.address,
            city: company.city,
            logo: company.logo,
            slug: company.slug,
            website: company.website,
            industry: company.industry,
            subindustry: company.subindustry,
            email: company.email,
            average: company.average,
            avg_rating: averageRating ? averageRating.avg_rating : 0,
            job_advertisement: job
        } as CompanyDtoWithout;
    }

    async mapManyCompanies(companies: Company[], averageRatingRepository: AverageRatingRepository, jobs: JobAdvertisement[]): Promise<CompanyDto[]> {
        const companyDtos: CompanyDto[] = [];

        for (const company of companies) {
            const averageRating = await averageRatingRepository.findOne({ company: company._id });
            const companyDto = this.mapOneCompany(company, averageRating, jobs);
            companyDtos.push(companyDto);
        }

        return companyDtos;
    }
}
