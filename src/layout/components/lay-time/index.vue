<template>
  <div class="lay-time-body">
    <div class="clock">
      <p>{{ times }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const times = ref<string>("");
onMounted(() => {
  myTime();
  setInterval(() => {
    myTime();
  }, 1000);
});
const myTime = () => {
  let time = new Date();
  let hh: number | string = time.getHours();
  let mm: number | string = time.getMinutes();
  let ss: number | string = time.getSeconds();
  hh = hh >= 10 ? hh : "0" + hh;
  mm = mm >= 10 ? mm : "0" + mm;
  ss = ss >= 10 ? ss : "0" + ss;
  times.value = hh.toString() + ":" + mm.toString() + ":" + ss.toString();
};
</script>
<style lang="scss" scoped>
.lay-time-body {
  .clock {
    display: flex;
  }

  .clock p {
    color: #722ed1;
    font-family: "Kanit";
    font-weight: 900;
    text-shadow:
      0 0.5px 0 #d3adf7,
      0 1px 0 #b37feb,
      0 1.5px 0 #9254de,
      0 0 5px rgb(227 55 206 / 5%),
      0 -1px 3px rgb(167 39 201 / 20%),
      0 9px 9px rgb(230 156 231 / 30%);
  }
}
</style>
