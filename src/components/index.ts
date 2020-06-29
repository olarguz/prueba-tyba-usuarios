import { Request, Response, NextFunction } from 'express';
import { routes as restaurantRoutes } from './restaurants';

const api: { [index: string]: any } = {
    '/': {
        verb: ['get'],
        handler: (req: Request, res: Response, next: NextFunction) => {
            res.json({});
        }
    }
};
export const apiRoutes: { [index: string]: any } = {
    ...api,
    ...restaurantRoutes
};
