import {defineStore} from "pinia";

import {computed, ref} from "vue";
import {SearchRouteApi} from "../infrastructure/route-api.js";
import {RouteAssembler} from "../infrastructure/route.assembler.js";
import {Route} from "../domain/model/route.entity.js";

const searchRouteApi = new SearchRouteApi();

const useSearchRouteStore = defineStore('searchroute', () => {

    const routes = ref([]);

}
