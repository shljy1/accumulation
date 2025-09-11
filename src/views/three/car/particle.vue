<template>
  <TresPoints :position="[-15, 0, 0]" :scale="0.02">
    <TresBufferGeometry
      :position="[positionArray, 3]"
      :color_list="[colorListArray, 3]"
    />
    <TresShaderMaterial v-bind="smConfig" />
  </TresPoints>
</template>

<script lang="ts" setup>
import * as THREE from "three";

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
const canvas = document.createElement("canvas");
const _canvas = document.createElement("canvas");
const _ctx = _canvas.getContext("2d")!;
_canvas.width = 1500;
_canvas.height = 400;

let _text = ["s", "h", "l", "j", "y"];
for (let i = 0; i < _text.length; i += 1) {
  const text = _text[i];
  const fontSize = randomNum(230, 360);
  const deg = randomNum(-30, 30);
  _ctx.font = `${fontSize}px Simhei`;
  _ctx.textBaseline = "top";
  _ctx.fillStyle = randomColor(80, 150);
  _ctx.save();
  _ctx.translate(300 * i + 150, 150);
  _ctx.rotate((deg * Math.PI) / 180);
  _ctx.fillText(text, -150 + 50, -150);
  _ctx.restore();
}

const w = 1500;
const h = 400;
canvas.width = w;
canvas.height = h;
const ctx = canvas.getContext("2d");
//const _canvas = await useTexture(['图片路径'])可以直接导入图片
ctx?.drawImage(_canvas, 0, 0);
const data = ctx?.getImageData(0, 0, w, h).data;
const info = [];
const colorList = [];
if (data) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixelIndex = (y * w + x) * 4;

      if (data[pixelIndex + 3] > 0) {
        const r = data[pixelIndex] / 255;
        const g = data[pixelIndex + 1] / 255;
        const b = data[pixelIndex + 2] / 255;

        const z = Math.random() * 100;
        info.push(x, -y, z);
        colorList.push(r, g, b);
      }
    }
  }
}
const positionArray = new Float32Array(info);
const colorListArray = new Float32Array(colorList);

const smConfig = {
  uniforms: {
    zPos: { value: 1 },
    useCustomColor: { value: false },
    customColor: { value: new THREE.Color("#ff0000") }
  },
  vertexShader: `
		attribute vec3 color_list;
		varying vec3 vColor;
		uniform float zPos;
		void main() {
			vec3 pos = position;
			pos.z *= zPos;
			vColor = color_list;
			vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
			vec4 viewPosition = viewMatrix * modelPosition;
			gl_PointSize = 0.001 * (1.0 - viewPosition.z);
			gl_Position = projectionMatrix * viewPosition;
		}`,
  fragmentShader: `
			varying vec3 vColor;
			uniform bool useCustomColor;
			uniform vec3 customColor;
			void main() {
			if(useCustomColor){
				gl_FragColor = vec4(customColor, 1.0);
			}else{
				gl_FragColor = vec4(vColor, 1.0);
			}
		}`,
  transparent: true,
  depthTest: false,
  blending: THREE.AdditiveBlending
} as any;
</script>
