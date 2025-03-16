import { createApp, defineCustomElement } from "vue";
import { kebabCase } from "lodash-es";
import App from "@/App.vue";
import i18n from "@/locales";
import router from "@/router";
import pinia from "@/stores";
import "@/styles/index.scss";
import "virtual:svg-icons-load";
import "virtual:uno.css";
import Directive from "@/directive";
import ElementPlus from "element-plus";
import GlobalRegister from "@/components/GlobalRegister";
import WebComponents from "./components/WebComponents";

const app = createApp(App);

WebComponents.forEach(component => {
    if(component.name) {
        customElements.define(kebabCase(component.name), defineCustomElement(component));
    } else {
        throw new Error("[customElements]: The component name cannot be empty!");
    }
});

app.use(pinia)
    .use(router)
    .use(ElementPlus)
    .use(Directive)
    .use(i18n)
    .use(GlobalRegister);

router.isReady().then(() => {
    app.mount("#app");
});
