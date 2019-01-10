import * as express from 'express';
import * as request from 'supertest';
import * as bodyParser from 'body-parser';

import { ItemsRouter, POST_PATH, Item } from '..';

const app = express();
app.use(bodyParser.json());

const addItemMockedResponse = { result: `Item with ID: xyz added.` };
jest.mock(`../item.service`, () => {
  return {
    ItemService: function() {
      return {
        addItem: jest.fn((newItem: Item) => {
          if ( (newItem === null) || (JSON.stringify(newItem)==='{}')) { 
            throw new Error(`<ItemService.addItem> Invalid argument - newItem argument cannot be null !`);
          }
          
          return addItemMockedResponse;
        })
      }
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
      .post(POST_PATH)
      .send(item)
      .set(`Accept`, 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(addItemMockedResponse);
        done();
      });
  });

  it(`returns error 400 when its POST method is called with null argument`, (done) => {
    // ItemService.mock.instances[0];
    request(app)
      .post(POST_PATH)
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

})