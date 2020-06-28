import express, { Router } from 'express';
import 'dotenv/config';

import App from './application/app';
import Credentials from './model/credentials';
import UserController from './controller/user.controller';
import { validate } from './utils/validator';
import RestaurantController from './controller/restaurant.controller';

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DB,
    MONGO_PATH,
    MONGO_PARAMS,
    SERVER_HOST,
    API_KEY,
    PORT } = process.env;

let credentials: Credentials = {
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    db: MONGO_DB,
    path: MONGO_PATH,
    params: MONGO_PARAMS
};

validate(process.env);

const restaurantController: RestaurantController = new RestaurantController(SERVER_HOST, API_KEY);
const router: Router = express.Router();
const controllers: Array<any> = [new UserController('/user', restaurantController, router)];

const app = new App(controllers, credentials, Number(PORT));

app.listen();
