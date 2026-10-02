import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from './entities/technology.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { TechnologiesController } from './technologies.controller.js';
import { TechnologiesService } from './technologies.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Technology]), AuthModule],
  controllers: [TechnologiesController],
  providers: [TechnologiesService],
  exports: [TechnologiesService],
})
export class TechnologiesModule {}
