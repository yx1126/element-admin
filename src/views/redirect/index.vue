<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Redirect",
    setup() {
        const route = useRoute();
        const router = useRouter();
        onBeforeMount(() => {
            const path = route.params.path;
            if(!path) {
                router.replace("/");
                return;
            }
            router.replace({ path: `/${(path as string[]).join("/")}`, query: route.query });
        });
    },
    render() {
        return null;
    },
});
</script>
