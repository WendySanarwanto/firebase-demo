
import { BaseRepository } from '../shared/base.repository';
import { Item } from '.';

export const ITEM_COLLECTION_NAME = 'shopping-list';

export class ItemRepository extends BaseRepository<Item> {
  constructor() { 
    super(ITEM_COLLECTION_NAME);
    this.typeId = "ItemRepository";
  }
}
