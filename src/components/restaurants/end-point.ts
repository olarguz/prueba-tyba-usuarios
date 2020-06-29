import * as _ from 'lodash';
const { SERVER_HOST: apiBasePath } = process.env;

export const endpoints = {
    'cities': _.template(`${apiBasePath}/cities?q=<%= query %>`),
    'location_details': _.template(`${apiBasePath}/location_details?entity_id=<%= entity %>&entity_type=city`),
    'restaurant': _.template(`${apiBasePath}/restaurant?res_id=<%= restaurant %>`),
};