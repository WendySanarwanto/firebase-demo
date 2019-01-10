import * as firebasemock from 'firebase-mock';
import * as admin from 'firebase-admin';

import { BaseRepository } from '../';

let mockfirestore = null;

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
  beforeEach(() => {
    mockfirestore = new firebasemock.MockFirestore();
  });

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

  it(`returns existing items from firestore`, async() =>{
    console.log(`[DEBUG] - <BaseRepositorySpec.testExistingItems> executing ...`);
    const newItem: TestData = {
      id: "abc",
      name: "Johnny"
    };
    const newItem2: TestData = {
      id: "def",
      name: "Jenny"
    };

    const repo: BaseRepository<TestData> = new BaseRepository(COLLECTION_NAME);
    repo.create(newItem);
    repo.create(newItem2);
    mockfirestore.flush();
    const items = await repo.getAll();
    // console.log(`[DEBUG] - <BaseRepositorySpec.returnExistingItemsTest> items: \n`, items);
    expect(Array.isArray(items)).toBeTruthy();
    expect(items.length).toEqual(2);
    expect(items[0]).toMatchSnapshot(newItem);
    expect(items[1]).toMatchSnapshot(newItem2);
  });

});