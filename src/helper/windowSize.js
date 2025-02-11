import { ref,onMounted,onUnmounted } from "vue";

export const windowSize = ref({
    width: window.innerWidth,
    height: window.innerHeight,
})

export const useWindowSize = () => {

    const updateSize = () => {
        windowSize.value = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    };

    onMounted(() => {
        window.addEventListener("resize", updateSize);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", updateSize);
    });

    return windowSize;
}