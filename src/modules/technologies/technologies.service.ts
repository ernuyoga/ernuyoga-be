import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Technology } from './entities/technology.entity.js';
import { Repository } from 'typeorm';
import { CreateTechnologyDto } from './dto/create-technology.dto.js';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology) private readonly repo: Repository<Technology>,
  ) {}

  async findAll(): Promise<Technology[]> {
    return this.repo.find();
  }

  async create(dto: CreateTechnologyDto): Promise<Technology> {
    const technology = this.repo.create(dto);
    return await this.repo.save(technology);
  }

  async remove(id: number): Promise<void> {
    const technology = await this.repo.findOne({ where: { id } });
    if (!technology)
      throw new NotFoundException(`Teknologi ${id} tidak ditemukan`);
    await this.repo.softRemove(technology);
  }
}
