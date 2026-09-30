import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity.js';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
  ) {}

  async get(): Promise<Profile> {
    const [profile] = await this.repo.find({ order: { id: 'ASC' }, take: 1 });
    if (!profile) throw new NotFoundException('Profil belum tersedia');
    return profile;
  }

  async update(id: number, dto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.repo.findOne({ where: { id } });
    if (!profile) throw new NotFoundException(`Profil ${id} tidak ditemukan`);
    Object.assign(profile, dto);
    return this.repo.save(profile);
  }
}
