import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module.js';
import { AuthService } from '../../modules/auth/auth.service.js';

const app = await NestFactory.createApplicationContext(AppModule);
const { authCode } = await app.get(AuthService).createAdmin();
console.log(`Kode admin (simpan, hanya tampil sekali): ${authCode}`);
await app.close();
