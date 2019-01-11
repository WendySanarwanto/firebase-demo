import * as express from 'express';

import { OrderService } from './order.service';
import { Response } from '../shared';

export const ORDER_POST_PATH = "/";
export const ORDER_GET_PATH = "/";
export const OrdersRouter = express.Router();

OrdersRouter.post(ORDER_POST_PATH, async (req, res) => {
  let response: Response = { };
  try{
    // Grab the request's body
    // console.log(`[DEBUG] - <items.routes.addItem> req: \n`, req);
    console.log(`[DEBUG] - <orders.routes.createOrder> req.body: \n`, req.body);
    const orderService: OrderService = new OrderService();
    response = await orderService.createOrder(req.body);
    console.log(`[DEBUG] - <orders.routes.createOrder> response: \n`, response);
    res.status(201).json(response);
  } catch(error) {
    console.log('[ERROR] - <orders.routes.createOrder>. Details: \n', error);
    response.error = {
      code: "400",
      message: "Creating a new Order is failing."
    };
    res.status(500).json(response);
  }
});

OrdersRouter.get(ORDER_GET_PATH, async (req, res) => {
  let response: Response = { };
  
  try {
    // console.log(`[DEBUG] - <orders.routes.getOrders> req: \n`, req);
    const orderService: OrderService = new OrderService();
    // TODO: Add paging / limited result support
    response = await orderService.getOrders();
    // console.log(`[DEBUG] - <orders.routes.getOrders> response: \n`, response);
    res.status(201).json(response);
  } catch(error) {
    console.log(`[ERROR] - <orders.routes.getOrders>. Details: \n`, error);
    response.error = {
      code: "400",
      message: "Retrieving orders is failing."
    }
    res.status(500).json(response);
  }
});
