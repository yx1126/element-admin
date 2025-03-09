import { createApp } from "vue";
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

const app = createApp(App);

app.use(pinia)
    .use(router)
    .use(ElementPlus)
    .use(Directive)
    .use(i18n)
    .use(GlobalRegister);

router.isReady().then(() => {
    app.mount("#app");
});