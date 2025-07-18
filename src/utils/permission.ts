import { withInstallFunction } from "./withInstall";

export function auth(...values: (string | string[])[]) {
    const auths = values.flat();
    if(!auths.length) return true;
    if(auths.includes("*:*:*")) {
        return true;
    }
    const user = useUserStore();
    return auths.some(v => user.permission.includes(v));
}

export default withInstallFunction(auth, "$auth");