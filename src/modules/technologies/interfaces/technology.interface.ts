import { IBase } from '../../../common/interfaces/base-entity.interface.js';

export interface ITechnology extends IBase {
  name: string;
  category: string | null;
  iconUrl: string | null;
}
