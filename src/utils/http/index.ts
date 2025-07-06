import Http from "./http";
import router from "@/router";

Http.setConfig({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 60 * 1000, // request timeout
});

Http.request.use(config => {
    const user = useUserStore();
    if(user.token) {
        config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
});

const message = useMessage();

Http.response.use(response => {
    const { data, config } = response;
    const user = useUserStore();
    if(["arraybuffer", "blob"].includes(config.responseType!) || config.headers.isFile) {
        return response;
    } if(data.code !== 200) {
        if(data.code === 401) {
            user.$reset();
            router.push("/");
        }
        message.error(data.message || "Error");
        return Promise.reject(data.message);
    }
    return data;
});

const service = new Http();

export default service;