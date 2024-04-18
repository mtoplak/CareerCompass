import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Patch
} from '@nestjs/common';
import { PodjetjeService } from './podjetje.service';
import { CreateUpdatePodjetjeDto } from './create-update-podjetje.dto';
import { Podjetje } from 'src/entities/podjetje.model';
import { PodjetjeResponse, SuccessResponse } from 'src/data.response';

@Controller('/podjetje')
export class PodjetjeController {
    constructor(private readonly podjetjeService: PodjetjeService) { }

    @Post()
    async addPodjetje(
        @Body() createPodjetjeDto: CreateUpdatePodjetjeDto,
    ): Promise<Podjetje> {
        return await this.podjetjeService.createPodjetje(createPodjetjeDto);
    }

    @Get()
    async getAllPodjetja(): Promise<PodjetjeResponse[]> {
        return await this.podjetjeService.getAllPodjetja();
    }

    @Get(':id')
    async getSinglePodjetje(@Param('id') id: string): Promise<Podjetje> {
        return await this.podjetjeService.getSinglePodjetje(id);
    }

    @Patch(':id')
    async updatePodjetje(
      @Param('id') podjetjeId: string,
      @Body() updatePodjetjeDto: CreateUpdatePodjetjeDto,
    ): Promise<Podjetje> {
      return await this.podjetjeService.updatePodjetje(podjetjeId, updatePodjetjeDto);
    }
  
    @Delete(':id')
    async removePodjetje(@Param('id') podjetjeId: string): Promise<SuccessResponse> {
      return this.podjetjeService.removePodjetje(podjetjeId);
    }

}
