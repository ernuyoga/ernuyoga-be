import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import type { EnvironmentVariables } from '../../config/env.validation.js';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService<EnvironmentVariables, true>) => ({
    secret: config.get('JWT_SECRET', { infer: true }),
    signOptions: {
      expiresIn: config.get('JWT_EXPIRES_IN', { infer: true }),
    },
  }),
});

@Module({
  imports: [UsersModule, passportModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [passportModule, JwtStrategy, jwtModule],
})
export class AuthModule {}
