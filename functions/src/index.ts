import * as admin from 'firebase-admin';

admin.initializeApp();    
const firestore: admin.firestore.Firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

export * from './items/item.routes';
