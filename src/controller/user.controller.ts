import express, { Router } from 'express';
import { v4 as uuid } from 'uuid';

import userModel from '../model/user.model'
import User from '../model/user';
import logModel from '../model/log.model';
import Log from '../model/log';

class UserController {
    private path: string;
    private router: Router;

    constructor(path: string, router: Router) {
        this.path = path;
        this.router = router;

        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path.concat('/create'), this.createUser);
        this.router.post(this.path.concat('/login'), this.loginUser);
        this.router.post(this.path.concat('/logout'), this.logoutUser);
        this.router.get(this.path.concat('/history/:username'), this.getUserHistory);
    }

    /*
        Funciones de Middleware
    */
    private createUser = (request: express.Request, response: express.Response) => {
        let userData = request.body;

        const user = new userModel(userData);
        user.save()
            .then((savedUser: User) => this.logUserCreatedOk(savedUser, response))
            .catch(() => response.json({ status: 'ERR', data: { value: `User ${userData.username} already exists.` } }));
    }

    private loginUser = (request: express.Request, response: express.Response) => {
        let userData = request.body;

        userData.logged = false;
        userModel.find(userData)
            .then((users: Array<User>) => users.length !== 0
                ? this.logUserLoginOk(users[0], response)
                : this.logUserLoginErr(userData, response));
    }

    private logoutUser = (request: express.Request, response: express.Response) => {
        let userData = request.body;

        userData.logged = true;
        userModel.find(userData)
            .then((users: Array<User>) => users.length !== 0
                ? this.logUserLogoutOk(users[0], response)
                : this.logUserLogoutErr(userData, response));
    }

    private getUserHistory = (request: express.Request, response: express.Response) => {
        let username = request.params.username;

        logModel.find({ username: username })
            .then((logs: Array<Log>) => logs.length !== 0
                ? response.send({ status: 'OK', data: logs })
                : response.send({ status: 'ERR', data: `Usuario ${username} no registrado` }));
    }

    /*
        Funciones de Middleware
    */
    private logUserCreatedOk(user: User, response: express.Response) {
        new logModel({ username: user.username, log: 'Usuario creado con exito' }).save();
        response.status(200).json({ status: 'OK', data: user });
    }

    private logUserLoginOk(user: User, response: express.Response) {
        const token: string = uuid();
        new logModel({ username: user.username, log: `Usuario logged in con token ${token}` }).save();
        this.updateUser(user, true, token);
        response.status(200).json({ status: 'OK', data: { token: token, value: `User ${user.username} logged in now.` } });
    }

    private logUserLoginErr(user: any, response: express.Response) {
        new logModel({ username: user.username, log: `Usuario ${user.username} operacion login no permitida` }).save();
        response.status(400).json({ status: 'ERR', data: { value: `User ${user.username} not logged in now.` } });

    }

    private logUserLogoutOk(user: User, response: express.Response) {
        new logModel({ username: user.username, log: `Usuario logged out con token ${user.token}` }).save();
        this.updateUser(user, false, 'NONE');
        response.status(200).json({ status: 'OK', data: { value: `User ${user.username} logged out now.` } });
    }

    private logUserLogoutErr(user: any, response: express.Response) {
        new logModel({ username: user.username, log: `Usuario ${user.username} operacion logout no permitida` }).save();
        response.status(400).json({ status: 'ERR', data: { value: `User ${user.username} not logged out now.` } });
    }

    private updateUser = (user: any, status: boolean, token: string) => {
        user.logged = status;
        user.token = token;
        new userModel(user).save();
    }

}

export default UserController;
