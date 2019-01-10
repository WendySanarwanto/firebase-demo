import * as admin from 'firebase-admin';

import { ItemService, Item } from '..';

jest.mock(`../item.repository`, () => {
  return {
    ItemRepository: function() {
      return {
        create: jest.fn((newDoc: Item) => {
          const fakeWriteResult: admin.firestore.DocumentReference = {
            id: `xyz`,
            firestore: null,
            parent: null,
            path: null,
            collection: null,
            getCollections: null,
            create: null,
            set: null,
            update: null,
            delete: null,
            get: null,
            onSnapshot: null,
            isEqual: null
            // Docum  entReference: null,
          };
          return fakeWriteResult;
        })
      };
    }
  }
});

describe(`ItemService`, () =>{
  it(`adds a new item`, (done) => {
    const item: Item = {
      id: 'xyz',
      name: "Samsung Galaxy S9",
      price: 1000,
      quantity: 1
    };

    const itemService = new ItemService();
    itemService.addItem(item)
      .then(response => {
        expect(response).toBeDefined();
        expect(response.result).toEqual('Item with ID: xyz added.');
        done();
      });
  });

  it(`returns error when new Item arg is null`, (done) =>{
    const itemService = new ItemService();
    itemService.addItem()
      .catch(error => {
        expect(error).toBeDefined();
        done();
      });
  });
 
});