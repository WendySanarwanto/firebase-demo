import * as admin from 'firebase-admin';

import { Item, ItemRepository } from '.';
import { Response } from '../shared';

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
