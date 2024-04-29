import "@/styles/index.scss";
import "virtual:uno.css";
import "virtual:svg-icons-load";
import { createApp } from "vue";
import pinia from "@/stores";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/locales";
import { ElIcon } from "@/components/Icon";
import ScrollBar from "@/components/ScrollBar";
import Directive from "./directive";

const app = createApp(App);

app.use(pinia)
    .use(router)
    .use(Directive)
    .use(i18n)
    .use(ScrollBar)
    .use(ElIcon);

router.isReady().then(() => {
    app.mount("#app");
});