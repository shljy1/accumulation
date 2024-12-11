<template>
  <div class="font-rain">
    <div id="rain" class="font-rain-canvas" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
onMounted(() => {
  const main = document.getElementById("rain");
  for (let i = 0; i < 20; ++i) {
    let a = document.createElement("p");
    main.appendChild(a);
    build(20, a);
  }
});

onUnmounted(() => {
  timer.map(i => {
    cancelAnimationFrame(i);
  });
});
let timer = [];
let num = 0;
function r(from, to) {
  return ~~(Math.random() * (to - from + 1) + from);
}
function pick() {
  return arguments[r(0, arguments.length - 1)];
}
function getChar() {
  return String.fromCharCode(
    pick(r(0x3041, 0x30ff), r(0x2000, 0x206f), r(0x0020, 0x003f))
  );
}
function loop(fn, delay) {
  let _num = num;
  let stamp = Date.now();
  function _loop() {
    if (Date.now() - stamp >= delay) {
      fn();
      stamp = Date.now();
    }
    _timer = requestAnimationFrame(_loop);
    timer[_num] = _timer;
  }

  let _timer = requestAnimationFrame(_loop);
  timer.push(_timer);
  num++;
}

function traverse(fn, body) {
  body.forEach((n, i) => {
    let last = i == body.length - 1;
    if (n) fn(n, i, last);
  });
}
function build(row = 20, a) {
  let root = document.createDocumentFragment();
  let chars = [];
  for (let i = 0; i < row; ++i) {
    let c = document.createElement("span");
    c.textContent = getChar();
    c.style = `
      display: block;
      width: 38px ;
      height: 24px ;
      font-size: 20px; 
      color: #9bff9b11;
      text-align: center;
      font-family: "Helvetica Neue", Helvetica, sans-serif;
    `;
    root.appendChild(c);
    chars.push(c);
    if (Math.random() < 0.5) {
      loop(() => (c.textContent = getChar()), r(1e3, 5e3));
    }
  }

  let body = [];
  let options = {
    size: r(10, 30),
    offset: r(0, 100)
  };
  let { offset, size } = options;
  for (let i = 0; i < size; ++i) {
    let item = chars[offset + i - size + 1];
    body.push(item);
  }
  options.offset = (offset + 1) % (chars.length + size - 1);

  a.appendChild(root);

  let len = body.length;
  let delay = r(50, 100);
  loop(() => {
    body = [];
    let { offset, size } = options;
    for (let i = 0; i < size; ++i) {
      let item = chars[offset + i - size + 1];
      body.push(item);
    }
    options.offset = (offset + 1) % (chars.length + size - 1);

    traverse((c, i, last) => {
      c.style = `
        color: hsl(136, 100%, ${(85 / len) * (i + 1)}%);
        display: block;
        width: 38px ;
        height: 24px ;
        font-size: 20px; 
        text-align: center;
        font-family: "Helvetica Neue", Helvetica, sans-serif;
      `;
      if (last) {
        c.textContent = getChar();
        c.style = `
          color: hsl(136, 100%, 85%);
          text-shadow:
            0 0 .5em #fff,
            0 0 .5em currentColor;
        `;
      }
    }, body);
  }, delay);
}
</script>

<style scoped>
.font-rain {
  height: 480px;
  width: 800px;
  display: flex;
  align-items: center;
  background: #000;
}
.font-rain-canvas {
  display: flex;
}
p {
  line-height: 1;
}
</style>
