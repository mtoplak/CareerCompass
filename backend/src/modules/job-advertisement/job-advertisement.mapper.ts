import { Injectable } from '@nestjs/common';
import { JobAdvertisement } from '../../db/entities/job-advertisement.model';
import { JobAdvertisementDto } from './dto/create-update-job-advertisement.dto';

@Injectable()
export class JobAdvertisementMapper {

    mapOneJobAdvertisement(jobAdvertisement: JobAdvertisement): JobAdvertisementDto {
        return {
            id: jobAdvertisement._id.toString(),
            position: jobAdvertisement.position,
            description: jobAdvertisement.description,
            city: jobAdvertisement.city,
            company_linked: jobAdvertisement.company_linked,
            company: jobAdvertisement.company,
            url: jobAdvertisement.url,
            source: jobAdvertisement.source
        } as JobAdvertisementDto;
    }

    async mapManyJobAdvertisements(jobs: JobAdvertisement[]): Promise<JobAdvertisementDto[]> {
        const jobDtos: JobAdvertisementDto[] = [];

        for (const job of jobs) {
            const jobDto = this.mapOneJobAdvertisement(job);
            jobDtos.push(jobDto);
        }

        return jobDtos;
    }
}
