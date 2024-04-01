<template>
    <div class="">
        <icon />
        <el-button @click="onClick">Click</el-button>
        <el-button @click="onClick2">Click</el-button>
        <div ref="divRef" style="width: 50%; height: 400px; border: 1px solid red;">
            <scroll-bar is-resize>
                <template v-for="item in 50" :key="item">
                    <p>{{ item }}</p>
                </template>
            </scroll-bar>
        </div>
    </div>
</template>

<script setup lang="tsx">
import ScrollBar from "@/components/ScrollBar";

const Test = defineComponent({
    name: "Test",
    props: {
        name: { type: String }
    },
    render() {
        return (
            <el-button onClick={onClick2}>Click({this.name})</el-button>
        );
    }
});

const dialog = useDialog(Test, {
    title: "Test"
});
// const dialog2 = useDialog(Test);

function onClick() {
    dialog.open({
        rowProps: { name: "test" }
    });
}
function onClick2() {
    dialog.close();
    // dialog2.open({
    //     title: "Test"
    // });
}

</script>

<style lang="scss" scoped></style>