import http from "./http";

http.setConfig({
    baseURL: import.meta.env.BASE_URL,
    timeout: 60 * 1000,
});

http.interceptors.request.use((config) => {
    return config;
});

http.interceptors.response.use((response) => {
    const { data, config } = response;
    if(config.responseType && ["blob", "arraybuffer", "stream"].includes(config.responseType)) {
        return response;
    }
    return data;
});

const service = http.create({});

export default service;