<template>
  <div class="w-[400px] h-[600px] relative">
    <div class="loading"><Loading :progress="progress" /></div>
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :args="[45, 0.67, 0.1, 1000]"
        :position="[1, 5, 15]"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls />
      <Suspense>
        <TresMesh ref="boxRef">
          <GirlDemo @loadProgress="handleProgress" />
        </TresMesh>
      </Suspense>
      <TresAmbientLight :position="[1, 5, 15]" color="#d3adf7" :intensity="3" />
    </TresCanvas>
  </div>
</template>
<script setup lang="ts">
import { shallowRef, ref } from "vue";
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import * as THREE from "three";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import GirlDemo from "./girlDemo.vue";
import Loading from "../../style/loading/index.vue";
defineOptions({
  name: "girlPage"
});
const boxRef = shallowRef<THREE.Object3D>();

const { onLoop } = useRenderLoop();
const progress = ref("0%");
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta;
  }
});
const gl = {
  clearColor: "#1f1f1f",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
};

const handleProgress = loadProgress => {
  progress.value = loadProgress;
};
</script>
<style lang="scss" scoped>
.loading {
  position: absolute;
  color: #fff;
  padding: 20px;
  user-select: none;
  text-align: center;
  width: 100%;
  height: 100%;
  background: #000;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
