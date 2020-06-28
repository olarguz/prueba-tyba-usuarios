import express from 'express';
import request from 'request-promise';

import { createParams } from "../utils/parameters.factory";

class RestaurantController {
    private host: string;
    private apiKey: string;

    constructor(host: string, apiKey: string) {
        this.host = host;
        this.apiKey = apiKey;
    }

    public findRestaurantByCity = (city: string, response: express.Response) => {
        let url = this.host.concat('/cities?q=').concat(city);
        request(createParams('GET', this.apiKey, url))
            .then((data: any) => this.findCityId(data, response))
            .catch(() => response.json({ status: 'ERR', data: 'Problemas de conexion' }));
    }

    private findCityId = (data: any, response: express.Response) => {
        if (data.location_suggestions.length > 0) {
            let id = data.location_suggestions[0].id;
            let url = this.host.concat('/location_details?entity_id=').concat(id).concat('&entity_type=city');

            request(createParams('GET', this.apiKey, url))
                .then((datax: any) => this.getRestaurantsInfo(datax, response));
        } else {
            response.json({ status: 'ERR', data: 'Problemas de conexion' });
        }
    }

    private async getRestaurantsInfo(data: any, response: express.Response) {
        let listado = data.nearby_res
            .map((id: any) => createParams('GET', this.apiKey, this.host.concat('/restaurant?res_id=').concat(id)));

        response.json({ status: 'OK', data: await Promise.all(listado.map((params: any) => request(params))) });
    }

}

export default RestaurantController;
