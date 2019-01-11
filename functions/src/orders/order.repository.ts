
import { BaseRepository } from '../shared/base.repository';
import { Order } from '.';

export const ORDER_COLLECTION_NAME = 'customer-orders-list';
export const ORDER_REPO_TYPE_ID = 'OrderRepository';

export class OrderRepository extends BaseRepository<Order> {
  constructor() { 
    super(ORDER_COLLECTION_NAME);
    this.typeId = ORDER_REPO_TYPE_ID;
  }
}
