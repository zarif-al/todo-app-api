import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
/* import * as admin from 'firebase-admin'; */
// eslint-disable-next-line @typescript-eslint/no-var-requires
/* require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
  }),
}); */

export const CurrentUser = createParamDecorator(
  async (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext().req.headers.authorization.split(' ')[1];
    return token;
    /*    if (token) {
      const authKey = admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          const uid = decodedToken.uid;
          return uid;
        });
      return authKey;
    } else {
      return '';
    } */
  },
);
