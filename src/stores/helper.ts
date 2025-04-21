import type { NavTheme, LayoutMode, SetPlacement } from "#/stores";
import type { SelectOption } from "#/element";

export const navTheme: NavTheme[] = ["light", "inverted", "dark"];

export const layoutMode: LayoutMode[] = ["aside", "top", "mixin", "asideMixin"];

export const routerTransList: SelectOption[] = [
    { label: "fade", value: "fade", mode: "out-in" },
    { label: "scale", value: "scale", mode: "out-in" },
    { label: "fade-slide", value: "fade-slide", mode: "out-in" },
    { label: "scale-slide", value: "scale-slide", mode: "out-in" },
];

export const setPlacementLiist: SetPlacement[] = ["default", "drawer", "header"];