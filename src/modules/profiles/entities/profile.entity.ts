import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/entities/base.entity.js';
import { IProfile } from '../interfaces/profile.interface.js';

@Entity('profiles')
export class Profile extends Base implements IProfile {
  @Column({ name: 'full_name', type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'varchar', length: 255 })
  headline: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ name: 'avatar_url', type: 'varchar', length: 255, nullable: true })
  avatarUrl: string | null;

  @Column({ name: 'cv_url', type: 'varchar', length: 255, nullable: true })
  cvUrl: string | null;
}
