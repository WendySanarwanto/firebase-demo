import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ItemService } from './items/item.service';

admin.initializeApp();    
const firestore: admin.firestore.Firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

export const addItem = functions.https.onRequest(async (req, res) => {
  // Grab the request's body
  // console.log(`[DEBUG] - <addItem> req.body: \n`, req.body);
  const itemService: ItemService = new ItemService();
  const response = await itemService.addItem(req.body);
  console.log(`[DEBUG] - <addItem> response: \n`, response);
  res.json(response);
});