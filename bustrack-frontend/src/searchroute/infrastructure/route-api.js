import {BaseApi} from "@/shared/infrastructure/base-api.js";
import {BaseEndpoint} from "@/shared/infrastructure/base-endpoint.js";

const routesEndpointPath = import.meta.env.VITE_ROUTES_ENDPOINT_PATH || 'routes'; // 'routes' como valor por defecto

export class SearchRouteApi extends BaseApi {
    #routesEndpoint;

    constructor() {
        super();
        this.#routesEndpoint = new BaseEndpoint(this, routesEndpointPath);
    }

    /**
     * Obtiene rutas. Si se pasa 'searchText', filtra por nombre usando name_like.
     * @param {string} [searchText] - El texto para la búsqueda parcial.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getRoutes(searchText = '') {
        // 1. Si hay texto de búsqueda, lo usamos para filtrar.
        if (searchText) {
            return this.http.get(`/${routesEndpointPath}`, { params: { name_like: searchText } });
        }
        // 2. Si no hay texto, simplemente obtenemos todas las rutas.
        return this.#routesEndpoint.getAll();
    }

    getRouteByName(name){
        return this.#routesEndpoint.getByName(name);
    }

    deleteRoute(id){
        return this.#routesEndpoint.delete(id);
    }

    updateRoute(route){
        return this.#routesEndpoint.update(route.id, route);
    }

    createRoute(resource){
        return this.#routesEndpoint.create(resource);
    }
}