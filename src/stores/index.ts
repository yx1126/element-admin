import { createPinia } from "pinia";
import type { SelectOption } from "#/element";

import createPiniaState from "./plugins/pinia-store";
import type { SetPlacement } from "#/stores";

export * from "./helper";

const pinia = createPinia();

pinia.use(createPiniaState());

export const routerTransList: SelectOption[] = [
    { label: "fade", value: "fade", mode: "out-in" },
    { label: "scale", value: "scale", mode: "out-in" },
    { label: "fade-slide", value: "fade-slide", mode: "out-in" },
    { label: "scale-slide", value: "scale-slide", mode: "out-in" },
];

export const setPlacementLiist: SetPlacement[] = ["default", "drawer", "header"];

export default pinia;