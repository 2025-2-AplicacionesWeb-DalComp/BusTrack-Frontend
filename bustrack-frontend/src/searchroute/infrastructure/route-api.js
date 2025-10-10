import {BaseApi} from "@/shared/infrastructure/base-api.js";
import {BaseEndpoint} from "@/shared/infrastructure/base-endpoint.js";

const routesEndpointPath    = import.meta.env.VITE_ROUTES_ENDPOINT_PATH;

export class SearchRouteApi extends BaseApi {
    /**
     * @type {BaseEndpoint}
     * @private
     */
    #routesEndpoint;

    constructor() {
        super();
        this.#routesEndpoint =  new BaseEndpoint(this.#routesEndpoint);
    }

    getRoutes(){
        return this.#routesEndpoint.getAll();
    }

    getRouteByName(){
        return this.#routesEndpoint.getByName(name);
    }

    /**
     * @param {number|string} id - The ID  to delete.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the delete response.
     */
    deleteRoute(id){
        return this.#routesEndpoint.delete(id);
    }

    updateRoute(resource){
        return this.#routesEndpoint.update(id, resource);
    }

    createRoute(resource){
        return this.#routesEndpoint.create(resource);
    }




}


