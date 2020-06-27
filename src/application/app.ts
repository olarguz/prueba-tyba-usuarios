import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Credentials from '../model/credentials';
import { createMongoUri } from '../utils/credentials.factory';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Object, credentials: Credentials, port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeDatabase(credentials);
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(express.json())
        this.app.use(bodyParser.json());
    }

    private initializeDatabase(credentials: Credentials) {
        mongoose.connect(createMongoUri(credentials), { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('App connected to MongoDB.'))
            .catch(err => {
                console.log('App can not connet to MongoDB', err);
                process.exit()
            });
    }

    private initializeControllers(controllers) {
        controllers.forEach(ctrl => {
            this.app.use('/', ctrl.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is listening on port ${this.port}`);
        });
    }
}

export default App;
