// lib
import * as express from "express";
import * as cors from "cors";
import * as functions from "firebase-functions";
// Actions
import {addPerson, getPeople} from "./controller/personcontroller";

const app = express();
app.use(cors({origin: true}));

// as doc says routes component shoul be on index file
app.get("/listPerson", getPeople);
app.post("/addPerson", addPerson);

exports.app = functions.https.onRequest(app);
