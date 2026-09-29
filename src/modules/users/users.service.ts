import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  create(data: { authCode: string }) {
    return this.repo.save(this.repo.create(data));
  }

  findByAuthCode(authCode: string) {
    return this.repo.findOne({ where: { authCode } });
  }
}
