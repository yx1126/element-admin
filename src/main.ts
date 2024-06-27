import { createApp } from "vue";
import App from "@/App.vue";
import { ElIcon } from "@/components/Icon";
import ScrollBar from "@/components/ScrollBar";
import i18n from "@/locales";
import router from "@/router";
import pinia from "@/stores";
import "@/styles/index.scss";
import "virtual:svg-icons-load";
import "virtual:uno.css";
import Directive from "@/directive";

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