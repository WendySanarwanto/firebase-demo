import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { ItemsRouter } from './items';

// Initialise Firebase app & suppress a default warning when accessing firestore later.
admin.initializeApp();    
const firestore: admin.firestore.Firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

// Create express application 
const app = express();

// TODO: Initialise required express middlewares

// TODO: Add more required routes
app.use(`/items`, ItemsRouter);

// Expose the Express API Routes as functions
export const api = functions.https.onRequest(app);
