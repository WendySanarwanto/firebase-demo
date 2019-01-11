import * as admin from 'firebase-admin';
import { OrderItem } from './orderItem.model';

export interface Order extends admin.firestore.DocumentData {
  id?: string;
  orderItems: Array<OrderItem>;
  customerName: string;  
  totalCharge: number;
}