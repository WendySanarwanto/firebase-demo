
import { BaseRepository } from '../../shared/base.repository';
import { UserInfo } from './user-info.model';

export const ITEM_COLLECTION_NAME = 'user-info';

export class UserInfoRepository extends BaseRepository<UserInfo> {
  constructor() { 
    super(ITEM_COLLECTION_NAME);
    this.typeId = "UserInfoRepository";
  }
}