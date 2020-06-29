import axios, { AxiosResponse } from 'axios';
import { endpoints } from './end-point';

export const service = {
    findCityId: async (body: any, headers: any) => {
        try {
            const { q } = body;
            const url = endpoints['cities']({ query: q });
            const response: AxiosResponse<any> = (await axios.get(url, { headers }));
            return await service.findRestaurantByCity(response.data, headers);
        }
        catch (err) {
            throw { ...err };
        }
    },
    findRestaurantByCity: async (body: any, headers: any) => {
        try {
            const { location_suggestions: suggestions } = body;
            if (suggestions.length > 0) {
                const { id } = suggestions[0];
                const url = endpoints['location_details']({ entity: id });
                const response: AxiosResponse<any> = (await axios.get(url, { headers }));
                return await service.getRestaurantsInfo(response.data, headers);
            } else {
                throw { message: 'connection-data-error' };
            }
        }
        catch (err) {
            throw { ...err };
        }
    },
    getRestaurantsInfo: async (body: any, headers: any) => {
        try {
            const { nearby_res: nearby } = body;
            let response = await Promise.all(nearby.map((id: any) => {
                const url = endpoints['restaurant']({ restaurant: id });
                return axios.get(url, { headers });
            }));
            return response.map(({ data }: AxiosResponse<any>) => {
                const { apikey, ...rest } = data;
                return rest;
            });
        }
        catch (err) {
            throw { ...err, message: err.message, };
        }
    }
};
