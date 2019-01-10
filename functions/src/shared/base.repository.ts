import * as admin from 'firebase-admin';
import { Item } from '../items';

export class BaseRepository<TDoc extends admin.firestore.DocumentData> {
  typeId = "BaseRepository";

  constructor(
    private collectionName: string, 
    private _firestore: admin.firestore.Firestore = admin.firestore()) { }

  create(newDoc: TDoc = null): Promise<admin.firestore.DocumentReference>{
    console.log(`[DEBUG] - <${this.typeId}.create> newDoc: \n`, newDoc);
    if ( (newDoc === null) || (!newDoc) ) {
      return null;
    }
    return this._firestore.collection(this.collectionName).add(newDoc);
  }

  async getAll(): Promise<Array<admin.firestore.DocumentData>> {
    const getAllQuerySnapshot: admin.firestore.QuerySnapshot = await this._firestore.collection(this.collectionName).get();
    let result: Array<admin.firestore.DocumentData> = [];
    if (!getAllQuerySnapshot.empty) {
      const allData: Array<admin.firestore.DocumentData> = getAllQuerySnapshot.docs.map(docSnapshot => docSnapshot.data());
      result = allData;
    }
    return result;
  }
}
