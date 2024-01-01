import "@/styles/index.scss";
import { createApp } from "vue";
import pinia from "@/stores";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/locales";
import EleIcons from "@/components/Icon";

const app = createApp(App);

app.use(pinia)
    .use(router)
    .use(i18n)
    .use(EleIcons);

app.mount("#app");
