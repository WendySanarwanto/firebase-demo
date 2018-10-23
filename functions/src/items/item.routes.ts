// import * as functions from 'firebase-functions';
import * as express from 'express';
import { ItemService } from './item.service';

export const ItemsRouter = express.Router();
ItemsRouter.post("/", async (req, res) => {
  try{
    // Grab the request's body
    console.log(`[DEBUG] - <items.routes.addItem> req.body: \n`, req.body);
    const itemService: ItemService = new ItemService();
    const response = await itemService.addItem(req.body);
    console.log(`[DEBUG] - <items.routes.addItem> response: \n`, response);
    res.status(201).json(response);
  } catch(error) {
    console.log('[ERROR] - <items.routes.addItem>. Details: \n', error);
    res.sendStatus(500);
  }
});
