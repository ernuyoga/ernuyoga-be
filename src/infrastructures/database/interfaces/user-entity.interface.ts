import { IBase } from './base-entity.interface.js';

export interface IUser extends IBase {
  accessCodeHash: string;
  displayName: string | null;
}
