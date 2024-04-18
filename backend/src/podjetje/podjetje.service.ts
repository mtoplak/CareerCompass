import { Injectable, NotFoundException } from '@nestjs/common';
import { PodjetjeRepository } from './podjetje.repository';
import { CreateUpdatePodjetjeDto } from './create-update-podjetje.dto';
import { Podjetje } from 'src/entities/podjetje.model';
import { PodjetjeResponse, SuccessResponse } from 'src/data.response';

@Injectable()
export class PodjetjeService {
    constructor(private readonly podjetjeRepository: PodjetjeRepository) { }

    async createPodjetje(podjetjeData: CreateUpdatePodjetjeDto): Promise<Podjetje> {
        try {
            return await this.podjetjeRepository.create(podjetjeData);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

    async getAllPodjetja(): Promise<PodjetjeResponse[]> {
        try {
            return await this.podjetjeRepository.find({});
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

    async getSinglePodjetje(podjetjeId: string): Promise<Podjetje> {
        try {
            return await this.podjetjeRepository.findOne({ _id: podjetjeId });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

    async updatePodjetje(
        podjetjeId: string,
        podjetjeUpdates: CreateUpdatePodjetjeDto,
      ): Promise<Podjetje> {
        try {
          return await this.podjetjeRepository.findOneAndUpdate(
            { _id: podjetjeId },
            podjetjeUpdates,
            { new: true },
          );
        } catch (error) {
          if (error instanceof NotFoundException) {
            throw new NotFoundException(error.message);
          }
          throw error;
        }
      }
    
      async removePodjetje(podjetjeId: string): Promise<SuccessResponse> {
        return await this.podjetjeRepository.deleteOne({ _id: podjetjeId });
      }

}
