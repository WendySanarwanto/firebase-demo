import * as express from 'express';
import * as request from 'supertest';
import * as bodyParser from 'body-parser';

import { authenticate } from '../auth.middleware';
import { Item, ItemsRouter, POST_PATH } from '../../items';

const app = express();
app.use(bodyParser.json());
app.use(authenticate);
app.use(ItemsRouter);

jest.mock(`firebase-admin`, () => {
  return {
    auth: () => {
      return {
        verifyIdToken: (accessToken) => {
          console.log(`accessToken: ${accessToken}`);
          const VALID_ACCESS_TOKEN = "ADGHBG76LOI898";
          if (accessToken === VALID_ACCESS_TOKEN) {
            throw new Error(`'${accessToken}' access token is invalid!`);
          }
          return {
            tokenId: "abcdefg"
          };
        }
      };
    }
  };
});

const addItemMockedResponse = { result: `Item with ID: xyz added.` };
jest.mock(`../../items/item.service`, () => {
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

describe(`Auth Middleware`, () => {
  const item: Item = {
    id: 'xyz',
    name: "Samsung Galaxy S9",
    price: 1000,
    quantity: 1
  };
  
  function assert403(res){
    expect(res.body).toBeDefined();
    const error = res.body.error;
    expect(error).toBeDefined();
    expect(error.code).toEqual(`403`);
    expect(error.message).toEqual(`Request is not Authorised.`);
  }

  it(`rejects unauthorised HTTP Request to Item's endpoints`, (done) => {
    request(app)
      .post(POST_PATH)
      .send(item)
      .set(`Accept`, 'application/json')
      .expect(403)
      .end((err, res) => {
        assert403(res);
        done();
      });
  });

  it(`rejects HTTP Request with non-Bearer auth token, to Item's endpoints`, (done)=>{
    request(app)
      .post(POST_PATH)
      .send(item)
      .set(`Accept`, 'application/json')
      .set(`Authorization`, `basic 123456`)
      .expect(403)
      .end((err, res) => {
        assert403(res);
        done();
      });
  });

  it(`pass HTTP Request with valid access token, to Item's endpoints`, (done) => {
    request(app)
      .post(POST_PATH)
      .send(item)
      .set(`Accept`, 'application/json')
      .set(`Authorization`, `Bearer 123456`)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(addItemMockedResponse);
        done();
      });
  });
  
  it(`rejects HTTP Request with invalid auth token, to Item's endpoints`, (done) => {
    const VALID_ACCESS_TOKEN = "ADGHBG76LOI898";
    request(app)
    .post(POST_PATH)
    .send(item)
    .set(`Accept`, 'application/json')
    .set(`Authorization`, `Bearer ${VALID_ACCESS_TOKEN}`)
    .expect(403)
    .end((err, res) => {
      assert403(res);
      done();
    });    
  });
});