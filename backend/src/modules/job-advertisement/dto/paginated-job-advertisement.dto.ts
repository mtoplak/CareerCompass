import { JobAdvertisementDto } from "./create-update-job-advertisement.dto";

export class PaginatedJobAdvertisementsResponseDto {
    jobs: JobAdvertisementDto[];
    count: number;
}