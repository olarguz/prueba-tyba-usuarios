import { controller } from './controller';
export const routes: { [index: string]: any } = {
    '/restaurant': {
        verb: ['get'],
        handler: controller.findRestaurants
    }
};