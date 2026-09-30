import { IBase } from '../../../common/interfaces/base-entity.interface.js';

export interface IProfile extends IBase {
  fullName: string;
  headline: string;
  bio: string;
  avatarUrl: string | null;
  cvUrl: string | null;
}
