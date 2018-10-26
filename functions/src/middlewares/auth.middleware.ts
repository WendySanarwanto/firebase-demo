import * as admin from 'firebase-admin';

import { Response } from '../shared';

export const authenticate = async (req, res, next) => {
  // console.info(`<middlewares/authenticate> is called ...`);
  const authorization = req.headers.authorization;
  const errorResponse: Response = {
    error: {
      code: "403",
      message: "Request is not Authorised."
    } 
  };

  if ( (!authorization) || (!authorization.startsWith(`Bearer `))) {
    console.error(`<middlewares/authenticate> Auth Token bearer does not exist. `);
    res.status(403).json(errorResponse);
    return;
  }

  const accessToken = authorization.split(`Bearer `)[1];
  try {
    const decodedAccessToken = await admin.auth().verifyIdToken(accessToken);
    req.user = decodedAccessToken;
    next();
    return;
  } catch(err) {
    console.error(`<middlewares/authenticate> Decoding accessToken: ${accessToken} is failing. Errors: \n`, err);
    res.status(403).json(errorResponse);
    return;
  };
}
