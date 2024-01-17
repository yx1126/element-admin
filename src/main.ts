import "@/styles/index.scss";
import "virtual:uno.css";
import "virtual:svg-icons-load";
import { createApp } from "vue";
import pinia from "@/stores";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/locales";
import EleIcons from "@/components/Icon";
import ScrollBar from "@/components/ScrollBar";

const app = createApp(App);

app.use(pinia)
    .use(router)
    .use(i18n)
    .use(ScrollBar)
    .use(EleIcons);

router.isReady().then(() => {
    app.mount("#app");
});

