import * as firebasemock from 'firebase-mock';

import { OrderRepository, ORDER_REPO_TYPE_ID } from '../order.repository';

const mockfirestore = new firebasemock.MockFirestore();

jest.mock('firebase-admin', () => { 
  const mocksdk = new firebasemock.MockFirebaseSdk(
    () => null, () => null, () => mockfirestore, () => null, () => null);

  return mocksdk;
});

describe(`OrderRepository`, () => {
  it(`can be instantiated`, () => {      
    const orderRepo: OrderRepository = new OrderRepository();
    expect(orderRepo.typeId).toEqual(ORDER_REPO_TYPE_ID);
  });
});