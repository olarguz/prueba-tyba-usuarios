import App from './application/app';
import express, { Router } from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';

import Credentials from './model/credentials';
import UserController from './controller/user.controller';
import { validate } from './utils/validator';
import { createMongoUri } from './utils/credentials.factory';

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DB,
    MONGO_PATH,
    MONGO_PARAMS,
    PORT } = process.env;

let credentials: Credentials = {
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    db: MONGO_DB,
    path: MONGO_PATH,
    params: MONGO_PARAMS
};

validate(process.env);

const router: Router = express.Router();
const controllers: Array<any> = [new UserController('/user', router)];

const app = new App(controllers, credentials, Number(PORT));

app.listen();
