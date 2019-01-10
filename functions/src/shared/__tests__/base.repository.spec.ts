import * as firebasemock from 'firebase-mock';
import * as admin from 'firebase-admin';

import { BaseRepository } from '../';

const mockfirestore = new firebasemock.MockFirestore();

jest.mock('firebase-admin', () => { 
  const mocksdk = new firebasemock.MockFirebaseSdk(
    () => null, () => null, () => mockfirestore, () => null, () => null);

  return mocksdk;
});

interface TestData extends admin.firestore.DocumentData {
  id?: string,
  name: string,
} 

const COLLECTION_NAME = "TEST_COLLECTION"

describe(`BaseRepository`, () => {
  it(`creates a new item`, () => {
    // Arrange
    const newItem: TestData = {
      id: "xyz",
      name: "Billy",
    };
    const repo: BaseRepository<TestData> = new BaseRepository(COLLECTION_NAME);

    // Act then Assert
    repo.create(newItem)
      .then(doc => {
        doc.get()
          .then(resp => {
            const createdData = resp.data();
            expect(JSON.stringify(createdData)).toEqual(JSON.stringify(newItem));
          });
        mockfirestore.flush();
      })
    mockfirestore.flush();
  });

  it(`allows inserting null item`, async () => {
    const repo: BaseRepository<TestData> = new BaseRepository(COLLECTION_NAME);
    const createResult = await repo.create();
    expect(createResult).toBeNull();
  });
});