import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { ItemsRouter } from './items';
import { OrdersRouter } from './orders';
import { authenticate } from './middlewares';

import { doCreateUserInfo } from './triggers/auth/sign-up.trigger';

// Initialise Firebase app & suppress a default warning when accessing firestore later.
admin.initializeApp();    
const firestore: admin.firestore.Firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

// Create express application 
const app = express();

// TODO: Initialise required express middlewares
app.use(authenticate);

// TODO: Add more required routes
app.use(`/items`, ItemsRouter);
app.use('/orders', OrdersRouter);

// Expose the Express API Routes as functions
export const api = functions.https.onRequest(app);

// // TODO: Listen to Firebase onCreate trigger
// export const doRecordSignUpEvent = functions.auth.user().onCreate((user) => {
//   console.log(`[DEBUG] - <triggers.auth.doRecordLoginEvent> user: \n`, user);  
//   console.log(`[DEBUG] - <triggers.auth.doRecordLoginEvent> TODO: Record the login event`, user); 
//   return null; 
// });

export const doCreateUserInfoEvent = functions.auth.user().onCreate((user) => {
  // console.log(`[DEBUG] - <triggers.auth.doCreateUserInfo> user: \n`, user);  
  // console.log(`[DEBUG] - <triggers.auth.doCreateUserInfo> TODO: Create User Info record on Firestore`, user); 
  return doCreateUserInfo(user);
});