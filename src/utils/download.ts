import { saveAs, type FileSaverOptions } from "file-saver";

export default function download(data: Blob | string, filename?: string, options?: FileSaverOptions) {
    try {
        if(typeof data === "string" && !filename) {
            const splits = data.split("/");
            if(splits.length > 1) {
                filename = data.split("/").at(-1);
            }
        }
        saveAs(data, filename, options);
    } catch (error) {
        console.error(error);
    }
}