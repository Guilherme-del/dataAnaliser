/* eslint-disable @typescript-eslint/no-unused-vars */
import * as admin from "firebase-admin";
import endpoint from "./envconfig";
import * as functions from "firebase-functions";

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email,
  }),
  databaseURL: endpoint.databaseUrl,
});


const db = admin.firestore();
export {admin, db};
