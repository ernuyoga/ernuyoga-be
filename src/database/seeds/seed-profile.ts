import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module.js';
import { DataSource } from 'typeorm';
import { Profile } from '../../modules/profiles/entities/profile.entity.js';

const app = await NestFactory.createApplicationContext(AppModule);
const repo = app.get(DataSource).getRepository(Profile);

if ((await repo.count()) > 0) {
  console.log('Profil sudah ada, seeding dilewati');
} else {
  await repo.save(
    repo.create({
      fullName: 'Nama Lengkap',
      headline: 'Headline',
      bio: 'Bio',
      avatarUrl: null,
      cvUrl: null,
    }),
  );
  console.log('Profil awal dibuat');
}
