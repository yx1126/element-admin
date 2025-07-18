import { createApp } from "vue";
import App from "@/App.vue";
import i18n, { loadI18n } from "@/locales";
import router from "@/router";
import pinia from "@/stores";
import Directive from "@/directive";
import ElementPlus from "@/plugins/element-plus";
import GlobalRegister from "@/components/GlobalRegister";
import Auth from "@/utils/permission";
import "@/components/WebComponents";
import "@/styles/index.scss";
import "virtual:svg-icons-load";
import "virtual:uno.css";

const app = createApp(App);

app.use(pinia)
    .use(router)
    .use(ElementPlus)
    .use(Directive)
    .use(i18n)
    .use(GlobalRegister)
    .use(Auth);

router.isReady().then(async () => {
    await loadI18n();
    app.mount("#app");
});