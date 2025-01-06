<template>
  <div class="flex items-center justify-center w-48 h-48 bg-gray-200">
    <div class="relative w-[150px] h-[150px]">
      <svg class="relative w-full h-full">
        <circle cx="75" cy="75" r="70" />
        <circle :style="computedStyle" cx="75" cy="75" r="70" />
      </svg>
      <div
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      >
        <h3>
          <span>{{ percent }}</span>
        </h3>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
defineOptions({
  name: "countdownPage"
});
let timer;
onMounted(() => {
  let _percent = 60;
  const countDown = () => {
    _percent -= 1;
    if (_percent == 0) {
      clearInterval(timer);
      timer = 0;
    }
    computedStyle.value = { strokeDashoffset: 440 - 440 * (_percent / 60) };
    percent.value = _percent + "s";
    return countDown;
  };
  timer = setInterval(countDown(), 1000);
});
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
const computedStyle = ref({ strokeDashoffset: 0 });
const percent = ref("60s");
</script>
<style lang="scss" scoped>
circle {
  width: 100%;
  width: 100%;
  fill: none;
  stroke-width: 10;
  stroke: #000;
  stroke-dasharray: 440;
  stroke-dashoffset: 440;
  transition: 1s linear;
}
circle:nth-child(1) {
  stroke-dashoffset: 0;
  stroke: #f3f3f3;
}
circle:nth-child(2) {
  stroke-dashoffset: 0;
  stroke: #a78bfa;
  transform: rotate(-90deg);
  transform-origin: center;
}
</style>
