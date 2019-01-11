
import { BaseRepository } from '../shared/base.repository';
import { Item } from '.';

export const ITEM_COLLECTION_NAME = 'product-items-list';

export class ItemRepository extends BaseRepository<Item> {
  constructor() { 
    super(ITEM_COLLECTION_NAME);
    this.typeId = "ItemRepository";
  }
}
