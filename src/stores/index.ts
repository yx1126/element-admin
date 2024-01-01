import { createPinia } from "pinia";

import createPiniaState from "./plugins/pinia-store";


const pinia = createPinia();

pinia.use(createPiniaState());

export default pinia;