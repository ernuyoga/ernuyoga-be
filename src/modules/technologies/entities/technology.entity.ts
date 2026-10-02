import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/entities/base.entity.js';
import { ITechnology } from '../interfaces/technology.interface.js';

@Entity('technologies')
export class Technology extends Base implements ITechnology {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  category: string | null;

  @Column({ name: 'icon_url', type: 'varchar', length: 255, nullable: true })
  iconUrl: string | null;
}
