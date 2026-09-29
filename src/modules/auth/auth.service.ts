import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHmac, randomInt } from 'node:crypto';
import { UsersService } from '../users/users.service.js';
import type { EnvironmentVariables } from '../../config/env.validation.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService<EnvironmentVariables, true>,
  ) {}

  private hashCode(code: string): string {
    return createHmac(
      'sha256',
      this.config.get('ACCESS_CODE_PEPPER', { infer: true }),
    )
      .update(code)
      .digest('hex');
  }

  private generateCode(): string {
    return Array.from({ length: 16 }, () => randomInt(0, 10)).join('');
  }

  async createAdmin(): Promise<{ authCode: string }> {
    const authCode = this.generateCode();
    await this.usersService.create({ authCode: this.hashCode(authCode) });
    return { authCode };
  }

  async login(authCode: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByAuthCode(
      this.hashCode(authCode),
    );
    if (!user) throw new UnauthorizedException('Kode akses tidak valid');
    return { accessToken: this.jwtService.sign({ sub: user.id }) };
  }
}
