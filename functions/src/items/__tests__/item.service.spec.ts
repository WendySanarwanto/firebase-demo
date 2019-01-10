import * as admin from 'firebase-admin';

import { ItemService, Item } from '..';

const GET_ALL_ITEMS_MOCKED_RESULT = [{
    "price": 150,
    "quantity": 1,
    "name": "iPhone 5c"
  },{
    "price": 300,
    "quantity": 1,
    "name": "Samsung Galaxy S4"
}];

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
        }),
        getAll: jest.fn(() => {
          return {
            result: GET_ALL_ITEMS_MOCKED_RESULT
          }
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

  it(`returns items from firestore`, (done) => {
    const itemService = new ItemService();
    itemService.getAllItems()
      .then(response => {
        expect(response).toBeDefined();
        console.log(`[DEBUG] - <itemServiceSpec> response.result.result: \n`, response.result["result"]);
        expect(response.result).toBeTruthy();
        expect(Array.isArray(response.result["result"])).toBeTruthy();
        const dataResults = <any[]> response.result["result"];
        let countResult = 0;
        for(const data of dataResults) {
          expect(data).toMatchSnapshot(GET_ALL_ITEMS_MOCKED_RESULT[countResult]);
          countResult++;
        }
        done();
      });
  });
 
});