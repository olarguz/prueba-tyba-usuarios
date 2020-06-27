import express, { Router } from 'express';
import { v4 as uuid } from 'uuid';
import userModel from '../model/user.model'
import User from '../model/user';
import logModel from '../model/register.controller';
import Log from '../model/register';

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
        this.router.post(this.path.concat('/restaurants'), this.restaurants);
        this.router.get(this.path.concat('/history/:username'), this.userHistory);
    }

    private createUser = (request: express.Request, response: express.Response) => {
        let userData = request.body;

        const user = new userModel(userData);
        user.save()
            .then((savedUser: User) => this.logUserCreatedOk(savedUser, response))
            .catch(() => response.json({ status: 'ERR', data: { value: `User ${userData.username} already exists.` } }));
    }

    logUserCreatedOk(user: User, response: express.Response) {
        new logModel({ username: user.username, log: 'Usuario creado con exito' }).save();
        response.json({ status: 'OK', data: user });
    }

    private loginUser = (request: express.Request, response: express.Response) => {
        let userData = request.body;

        userData.logged = false;
        userModel.find(userData)
            .then((users: Array<User>) => {
                if (users.length !== 0) {
                    this.logUserLoginOk(users[0], response);
                } else {
                    response.json({ status: 'ERR', data: { value: `User ${userData.username} not logged in now.` } });
                }
            });
    }

    logUserLoginOk(user: User, response: express.Response) {
        const token: string = uuid();
        new logModel({ username: user.username, log: `Usuario logged in con token ${token}` }).save();
        this.updateUser(user, true, token);
        response.json({ status: 'OK', data: { token: token, value: `User ${user.username} logged in now.` } });
    }

    private logoutUser = (request: express.Request, response: express.Response) => {
        let userData = request.body;

        userData.logged = true;
        userModel.find(userData)
            .then((users: Array<User>) => {
                if (users.length !== 0) {
                    this.logUserLogoutOk(users[0], response);
                } else {
                    response.json({ status: 'ERR', data: { value: `User ${userData.username} not logged out now.` } });
                }
            });
    }

    logUserLogoutOk(user: User, response: express.Response) {
        new logModel({ username: user.username, log: `Usuario logged in con token ${user.token}` }).save();
        this.updateUser(user, false, 'NONE');
        response.json({ status: 'OK', data: { value: `User ${user.username} logged out now.` } });
    }

    private restaurants = (request: express.Request, response: express.Response) => {
        let userData = request.body.user;
        let city = request.body.city;

        userData.logged = true;
        userModel.find(userData)
            .then((users: Array<User>) => {
                if (users.length !== 0) {
                    response.json({ status: 'OK', data: users.length });
                } else {
                    response.json({ status: 'ERR', data: `User ${userData.username} is not authorized.` })
                }
            })
            .catch(() => response.json({ status: 'ERR', data: `User ${userData.username} is not authorized.` }));
    }

    private userHistory = (request: express.Request, response: express.Response) => {
        let username = request.params.username;

        logModel.find({ username: username })
            .then((logs: Array<Log>) => response.send({ status: 'OK', data: logs }));
    }

    private updateUser = (user: any, status: boolean, token: string) => {
        user.logged = status;
        user.token = token;
        new userModel(user).save();
    }

}

export default UserController;
