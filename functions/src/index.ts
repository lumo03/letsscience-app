import * as functions from "firebase-functions";
import express = require("express")
import admin = require("firebase-admin");

admin.initializeApp();

const app = express();
app.get("/api/helloWorld", async (req, res) => {
  res.json({
    message: "Hello, World!",
  });
});

const api = functions.https.onRequest(app);

export {api};
