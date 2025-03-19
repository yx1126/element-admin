<script lang="ts">
import { isLink } from "@/utils/validata";
import { defineComponent } from "vue";
export default defineComponent({
    name: "Redirect",
    setup() {
        const route = useRoute();
        const router = useRouter();
        onBeforeMount(() => {
            const path = (route.params.path as string[]).map(v => {
                return isLink(v) ? encodeURIComponent(v) : v;
            });
            if(!path?.length) {
                router.replace("/");
                return;
            }
            router.replace({ path: `/${path.join("/")}`, query: route.query });
        });
    },
    render() {
        return null;
    },
});
</script>
