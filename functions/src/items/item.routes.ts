import * as express from 'express';
import { ItemService } from './item.service';
import { Response } from '../shared';

export const ItemsRouter = express.Router();
ItemsRouter.post("/", async (req, res) => {
  let response: Response = null;
  try{
    // Grab the request's body
    console.log(`[DEBUG] - <items.routes.addItem> req.body: \n`, req.body);
    const itemService: ItemService = new ItemService();
    response = await itemService.addItem(req.body);
    console.log(`[DEBUG] - <items.routes.addItem> response: \n`, response);
    res.status(201).json(response);
  } catch(error) {
    console.log('[ERROR] - <items.routes.addItem>. Details: \n', error);
    response.error = {
      code: "400",
      message: "Creating a new Item is failing."
    };
    res.sendStatus(500).json(response);
  }
});
