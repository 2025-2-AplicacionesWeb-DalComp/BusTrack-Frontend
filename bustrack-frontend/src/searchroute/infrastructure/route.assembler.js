import {Route} from '../domain/model/route.entity.js';

export class RouteAssembler {
    /**
     * Converts a plain resource object to a Category entity.
     * @param {Object} resource
     * @returns {Route} The corresponding Category entity.
     */
    static toEntityFromResource(resource) {
        return new Route({...resource});
    }

    /**
     * Converts an API response to an array of Category entities.
     * Handles both array and object response formats.
     * Logs an error and returns an empty array if the response status is not 200.
     *
     * @param {import('axios').AxiosResponse} response - The API response containing category data.
     * @returns {Route[]} Array of Category entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['routes'];

        return resources.map(resource => this.toEntityFromResource(resource));

    }


}