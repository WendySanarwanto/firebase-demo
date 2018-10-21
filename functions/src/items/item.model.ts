import * as admin from 'firebase-admin';

export interface Item extends admin.firestore.DocumentData {
  id?: string;
  name: string;
  quantity: number;
  price: number;
}