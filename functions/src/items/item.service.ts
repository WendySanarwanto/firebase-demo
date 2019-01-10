import * as admin from 'firebase-admin';

import { Item, ItemRepository } from '.';
import { Response } from '../shared';

export class ItemService {
  public async addItem(newItem: Item = null): Promise<Response>{
    // 1. Validasi argument
    // 2. Gagal validasi ? -. Throw error
    // 3. Berhasil --> bikin repository untuk save item
    // 4. panggil repository.add / save
    // 5. 
    // NOTE: Should add more detailed validations
    //if ( (newItem === null) || (JSON.stringify(newItem)==='{}')) { 
    if (newItem === null) {
      throw new Error(`<ItemService.addItem> Invalid argument - newItem argument cannot be null !`);
    }

    const repository: ItemRepository = new ItemRepository();
    const insertedDoc = await repository.create(newItem);
    return { result: `Item with ID: ${insertedDoc.id} added.`};
  }


  public async getAllItems(): Promise<Response> {
    const repository: ItemRepository = new ItemRepository();
    const readAllResult: Array<admin.firestore.DocumentData> = await repository.getAll();
    return { result: readAllResult };
  }
}
