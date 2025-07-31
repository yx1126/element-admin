import { withInstallFunction } from "./withInstall";

export function auth(...values: (string | string[])[]) {
    const auths = values.flat();
    if(!auths.length) return true;
    const user = useUserStore();
    if(user.permission.includes("*:*:*")) {
        return true;
    }
    return auths.some(v => user.permission.includes(v));
}

export default withInstallFunction(auth, "$auth");