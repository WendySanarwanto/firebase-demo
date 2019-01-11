import { Item } from "../items";

export interface OrderItem {
  itemId: string;
  quantity: number;
  subtotal: number;
}