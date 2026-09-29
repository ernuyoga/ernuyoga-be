import { Column, Entity, Index } from 'typeorm';
import { Base } from '../../../common/entities/base.entity.js';
import { IUser } from '../interfaces/user.interface.js';

@Entity('users')
export class User extends Base implements IUser {
  @Index({ unique: true })
  @Column({ name: 'auth_code', type: 'varchar', length: 64 })
  authCode: string;
}
