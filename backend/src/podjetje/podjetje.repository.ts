import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Podjetje } from 'src/entities/podjetje.model';
import { PodjetjeResponse, SuccessResponse } from 'src/data.response';

@Injectable()
export class PodjetjeRepository {
    constructor(
        @InjectModel('Podjetje') public podjetjeModel: Model<Podjetje>,
    ) { }

    async findOne(podjetjeFilterQuery: FilterQuery<Podjetje>): Promise<Podjetje> {
        try {
            return await this.podjetjeModel
                .findOne(podjetjeFilterQuery)
        } catch (err) {
            throw new NotFoundException('Could not get the podjetje.');
        }
    }

    async find(podjetjesFilterQuery: FilterQuery<Podjetje>): Promise<PodjetjeResponse[]> {
        try {
            return await this.podjetjeModel
                .find(podjetjesFilterQuery)
        } catch (err) {
            throw new NotFoundException('Could not find podjetja.');
        }
    }

    async create(podjetje: Podjetje): Promise<Podjetje> {
        try {
            return await new this.podjetjeModel(podjetje).save();
        } catch (err) {
            throw new NotFoundException('Could not create podjetje.');
        }
    }

    async findOneAndUpdate(
        podjetjeFilterQuery: FilterQuery<Podjetje>,
        podjetje: Partial<Podjetje>,
        options?: QueryOptions,
      ): Promise<Podjetje> {
        try {
          const updatedPodjetje = await this.podjetjeModel.findOneAndUpdate(
            podjetjeFilterQuery,
            podjetje,
            options,
          );
          
          if (!updatedPodjetje) {
            throw new NotFoundException('Podjetje not found.');
          }
      
          return updatedPodjetje;
        } catch (error) {
          console.error('Error updating podjetje:', error);
          throw new InternalServerErrorException('Could not update podjetje.');
        }
      }
      
    
      async deleteOne(podjetjeFilterQuery: FilterQuery<Podjetje>): Promise<SuccessResponse> {
        try {
          await this.podjetjeModel.deleteOne(podjetjeFilterQuery);
          return { success: true };
        } catch (err) {
          throw new NotFoundException('Could not delete podjetje.');
        }
      }

}