<template>
  <div class="w-[500px] h-[300px]">
    <canvas
      ref="domRef"
      width="120"
      height="40"
      class="cursor-pointer"
      @click.capture="draw"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
defineOptions({
  name: "verifyPage"
});
const domRef = ref<HTMLCanvasElement>();
const width = ref<number>(120);
const height = ref<number>(40);
onMounted(() => {
  draw();
});
const randomNum = (min: number, max: number) => {
  const num = Math.floor(Math.random() * (max - min) + min);
  return num;
};

const randomColor = (min: number, max: number) => {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return `rgb(${r},${g},${b})`;
};
const draw = () => {
  let imgCode = "";

  const NUMBER_STRING = "0123456789";

  const ctx = domRef.value!.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = randomColor(180, 230);
  ctx.fillRect(0, 0, width.value, height.value);
  for (let i = 0; i < 4; i += 1) {
    const text = NUMBER_STRING[randomNum(0, NUMBER_STRING.length)];
    imgCode += text;
    const fontSize = randomNum(18, 41);
    const deg = randomNum(-30, 30);
    ctx.font = `${fontSize}px Simhei`;
    ctx.textBaseline = "top";
    ctx.fillStyle = randomColor(80, 150);
    ctx.save();
    ctx.translate(30 * i + 15, 15);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(text, -15 + 5, -15);
    ctx.restore();
  }
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(randomNum(0, width.value), randomNum(0, height.value));
    ctx.lineTo(randomNum(0, width.value), randomNum(0, height.value));
    ctx.strokeStyle = randomColor(180, 230);
    ctx.closePath();
    ctx.stroke();
  }
  for (let i = 0; i < 41; i += 1) {
    ctx.beginPath();
    ctx.arc(
      randomNum(0, width.value),
      randomNum(0, height.value),
      1,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.fillStyle = randomColor(150, 200);
    ctx.fill();
  }
};
</script>
