import { Request, Response, NextFunction } from 'express';
import { service } from './service';

const { API_KEY } = process.env;

export const controller = {
    findRestaurants: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: any = await service.findCityId(req.query, { 'user-key': API_KEY, 'content-type': 'application/json' });
            res.status(200).json(result);
        }
        catch (err) {
            res.status(400).json({ 'error': err });
        }
    }
};