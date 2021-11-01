import express from "express";
import mongoose from "mongoose";
import { port, mongoURL } from "./config";
import App from "./App";
import FaceController from "./api/controller/face.controller";

const application = new App(express(), [
  new FaceController('/face')
], port);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log(`connect to: ${mongoURL}`);
    application.listen();
  })
  .catch((err) => {
    console.log(err);
  });
