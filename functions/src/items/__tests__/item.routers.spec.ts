import * as express from 'express';
import * as request from 'supertest';
import * as bodyParser from 'body-parser';

import { ItemsRouter, ITEM_POST_PATH, ITEM_GET_PATH, Item } from '..';

const app = express();
app.use(bodyParser.json());

const addItemMockedResponse = { result: `Item with ID: xyz added.` };
const getAllItemsMockedResponse = [{
  "price": 150,
  "quantity": 1,
  "name": "iPhone 5c"
},{
  "price": 300,
  "quantity": 1,
  "name": "Samsung Galaxy S4"
}];

const MockedItemService = {
  addItem: jest.fn((newItem: Item) => {
    if ( (newItem === null) || (JSON.stringify(newItem)==='{}')) { 
      throw new Error(`<ItemService.addItem> Invalid argument - newItem argument cannot be null !`);
    }
    
    return addItemMockedResponse;
  }),
  getAllItems: jest.fn()
    .mockImplementationOnce(() => {
      return { result: getAllItemsMockedResponse };
    })
    .mockImplementationOnce(() => {
      // Pretend that calling ItemService's getAllItems method has unexpected error in firestore
      throw new Error("Unable to retrieve all items from Firestore.");
    })  
};

jest.mock(`../item.service`, () => {
  return {
    ItemService: function() {
      return MockedItemService;
    }
  };
});

describe(`ItemRouters`, () => {

  beforeAll(() => {
    app.use(ItemsRouter);
  });
  
  it('adds a new Item through POST method and returns 201', (done) => {
    const item: Item = {
      id: 'xyz',
      name: "Samsung Galaxy S9",
      price: 1000,
      quantity: 1
    };
    
    // ItemService.mock.instances[0];
    request(app)
      .post(ITEM_POST_PATH)
      .send(item)
      .set(`Accept`, 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(addItemMockedResponse);
        done();
      });
  });

  it(`returns items from firestore`, (done) => {
    request(app)
      .get(ITEM_GET_PATH)
      .set(`Accept`, 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeDefined();
        console.log(`[DEBUG] - <itemRoutersSpec.returnItemsTest> res.body.result: \n`, res.body.result);
        expect(Array.isArray(res.body.result)).toBeTruthy();
        let countResult = 0;
        for(const data of res.body.result) {
          expect(data).toMatchSnapshot(getAllItemsMockedResponse[countResult]);
          countResult++;
        }        
        done();
      });
  });

  it(`returns error 400 when its POST method is called with null argument`, (done) => {
    // ItemService.mock.instances[0];
    request(app)
      .post(ITEM_POST_PATH)
      .send(null)
      .set(`Accept`, 'application/json')
      .expect(500)
      .end((err, res) => {
        expect(res.body).toBeDefined();
        expect(res.body.error).toBeDefined();
        const error = res.body.error;
        expect(error.code).toEqual("400");
        expect(error.message).toEqual("Creating a new Item is failing.");
        done(err);
      });    
  });

  it(`returns error 400 when invoking GET method has error in Firestore operation`, (done) => {
    request(app)
      .get(ITEM_GET_PATH)
      .set(`Accept`, 'application/json')
      .expect(500)
      .end((err, res) => {
        expect(res.body).toBeDefined();
        expect(res.body.error).toBeDefined();
        const error = res.body.error;
        expect(error.code).toEqual("400");
        expect(error.message).toEqual("Retrieving items is failing.");
        done(err);
      });
  });

})