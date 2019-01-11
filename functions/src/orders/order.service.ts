import * as admin from 'firebase-admin';

import { Order, OrderRepository } from '.';
import { Response } from '../shared';

export class OrderService {
  public async createOrder(newOrder: Order = null): Promise<Response>{
    // 1. Validasi argument
    // 2. Gagal validasi ? -. Throw error
    // 3. Berhasil --> bikin repository untuk save order
    // 4. panggil repository.add / save
    // 5. 
    // NOTE: Should add more detailed validations
    //if ( (newItem === null) || (JSON.stringify(newOrder)==='{}')) { 
    if (newOrder === null) {
      throw new Error(`<OrderService.createOrder> Invalid argument - newOrder argument cannot be null !`);
    }

    const repository: OrderRepository = new OrderRepository();
    const insertedDoc = await repository.create(newOrder);
    return { result: `Order with ID: ${insertedDoc.id} added.`};
  }


  public async getOrders(): Promise<Response> {
    const repository: OrderRepository = new OrderRepository();
    const readAllResult: Array<admin.firestore.DocumentData> = await repository.getAll();
    return { result: readAllResult };
  }
}
