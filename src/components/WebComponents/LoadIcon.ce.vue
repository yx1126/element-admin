<script lang="tsx">
export default defineComponent({
    name: "LoadIcon",
    render() {
        return (
            <div class="load-icon">
                <div class="icon-wrapper">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
            </div>
        );
    },
});
</script>

<style lang="scss" scoped>
.load-icon {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
        display: grid;
        grid: {
            template: {
                columns: 15px 15px;
                rows: 15px 15px;
            }
            gap: 10px;
        }
        animation: rotate 1s linear infinite;
        & > i {
            $bg-color: #409eff;
            background-color: $bg-color;
            animation: rotate2 1s linear infinite;
            &:nth-child(1) {
                background-color: rgba($color: $bg-color, $alpha: 0.25);
            }
            &:nth-child(2) {
                background-color: rgba($color: $bg-color, $alpha: 0.5);
            }
            &:nth-child(3) {
                background-color: rgba($color: $bg-color, $alpha: 0.75);
            }
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes rotate2 {
        0% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(-180deg);
        }
        100% {
            transform: rotate(-360deg);
        }
    }
}
</style>