import * as firebasemock from 'firebase-mock';

import { UserInfoRepository } from '../';

const mockfirestore = new firebasemock.MockFirestore();

jest.mock('firebase-admin', () => { 
  const mocksdk = new firebasemock.MockFirebaseSdk(
    () => null, () => null, () => mockfirestore, () => null, () => null);

  return mocksdk;
});

describe(`UserInfoRepository`, () => {
  it(`can be instantiated`, () => {
    const userInfoRepo: UserInfoRepository = new UserInfoRepository();
    expect(userInfoRepo.typeId).toEqual("UserInfoRepository");
  });
});