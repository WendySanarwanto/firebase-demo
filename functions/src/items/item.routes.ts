import * as functions from 'firebase-functions';

import { ItemService } from './item.service';

export const addItem = functions.https.onRequest(async (req, res) => {
  // Grab the request's body
  // console.log(`[DEBUG] - <addItem> req.body: \n`, req.body);
  const itemService: ItemService = new ItemService();
  const response = await itemService.addItem(req.body);
  console.log(`[DEBUG] - <addItem> response: \n`, response);
  res.json(response);
});