import * as firebasemock from 'firebase-mock';

import { ItemRepository } from '../item.repository';

const mockfirestore = new firebasemock.MockFirestore();

jest.mock('firebase-admin', () => { 
  const mocksdk = new firebasemock.MockFirebaseSdk(
    () => null, () => null, () => mockfirestore, () => null, () => null);

  return mocksdk;
});

describe(`ItemRepository`, () => {
  it(`can be instantiated`, () => {
    // NOTE: - I forgot why did I create these commented lines , previously
    // const authService: AuthService = new authService();
    // authService.regiser(request)
    //   .then()
    //   .error();
      
    const itemRepo: ItemRepository = new ItemRepository();
    expect(itemRepo.typeId).toEqual("ItemRepository");
  });
});