<template>
  <div>等待编写</div>
</template>
<script setup lang="ts">
defineOptions({
  name: "testPage"
});
</script>
<style lang="scss" scoped></style>

<!-- <template>
  <div>等待编写</div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
defineOptions({
  name: "testPage"
});
let timer;
const sequence = fibonacci();
onMounted(() => {
  timer = setInterval(() => {
    console.log(sequence.next().value);
  }, 1000);
});

function* fibonacci() {
  let current = 0;
  let next = 1;
  while (true) {
    const reset = yield current;
    [current, next] = [next, next + current];
    if (reset) {
      current = 0;
      next = 1;
    }
  }
}
</script>
<style lang="scss" scoped></style> -->
