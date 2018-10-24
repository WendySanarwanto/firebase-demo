
import * as admin from 'firebase-admin';

import { Item } from '.';

export const ITEM_COLLECTION_NAME = 'shopping-list';

export class ItemRepository {
  constructor(private _firestore: admin.firestore.Firestore = admin.firestore()) { }

  create(newDoc: Item = null): Promise<admin.firestore.DocumentReference>{
    return this._firestore.collection(ITEM_COLLECTION_NAME).add(newDoc);
  }
}