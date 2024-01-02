import { createPinia } from "pinia";

import createPiniaState from "./plugins/pinia-store";

export * from "./helper";

const pinia = createPinia();

pinia.use(createPiniaState());

export default pinia;