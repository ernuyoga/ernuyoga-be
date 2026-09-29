import { IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^\d{16}$/, { message: 'Kode akses harus 16 digit angka' })
  authCode: string;
}
