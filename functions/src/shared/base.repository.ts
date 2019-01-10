import * as admin from 'firebase-admin';

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
}
