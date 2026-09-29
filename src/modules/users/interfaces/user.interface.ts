import { IBase } from '../../../common/interfaces/base-entity.interface.js';

export interface IUser extends IBase {
  authCode: string;
}
