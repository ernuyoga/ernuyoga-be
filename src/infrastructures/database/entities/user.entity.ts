import { Column, Entity, Index } from 'typeorm';
import { Base } from './base.entity.js';
import { IUser } from '../interfaces/user-entity.interface.js';

@Entity('users')
export class User extends Base implements IUser {
  @Index({ unique: true })
  @Column({ name: 'access_code_hash', type: 'varchar', length: 64 })
  accessCodeHash: string;

  @Column({
    name: 'display_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  displayName: string | null;
}
