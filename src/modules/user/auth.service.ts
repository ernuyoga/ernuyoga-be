import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { User } from '../../infrastructures/database/entities/user.entity.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private hashCode(code: string): string {
    // HMAC-SHA256 dengan pepper dari .env, BUKAN bcrypt — agar bisa di-index & di-lookup
    return crypto
      .createHmac('sha256', process.env.ACCESS_CODE_PEPPER!)
      .update(code)
      .digest('hex');
  }

  private generateCode(): string {
    // 16 digit angka acak menggunakan CSPRNG (bukan Math.random)
    let code = '';
    for (let i = 0; i < 16; i++) {
      code += crypto.randomInt(0, 10).toString();
    }
    return code;
  }

  async register(displayName?: string): Promise<{ accessCode: string }> {
    const plainCode = this.generateCode();
    const user = this.userRepo.create({
      accessCodeHash: this.hashCode(plainCode),
      displayName: displayName ?? null,
    });
    await this.userRepo.save(user);
    // Kode plaintext HANYA dikembalikan sekali di sini, tidak pernah disimpan
    return { accessCode: plainCode };
  }

  async login(accessCode: string): Promise<{ accessToken: string }> {
    const hash = this.hashCode(accessCode);
    const user = await this.userRepo.findOne({
      where: { accessCodeHash: hash },
    });
    if (!user) throw new UnauthorizedException('Kode akses tidak valid');
    const token = this.jwtService.sign({ sub: user.id });
    return { accessToken: token };
  }
}
