import * as admin from 'firebase-admin';

import { ItemRepository } from './item.repository';
import { Response } from '../shared/service.response';
import { Item } from './item.model';

export class ItemService {
  async addItem(newItem: Item = null): Promise<Response>{
    // NOTE: Should add more detailed validations
    if (newItem === null) { 
      return null;
    }

    const repository: ItemRepository = new ItemRepository();
    const writeResult: admin.firestore.DocumentReference = await repository.create(newItem);      
      
    return { result: `Item with ID: ${writeResult.id} added.` };
  }
}
