<template>
  <div class="w-[400px] h-[600px]">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :args="[45, 0.67, 0.1, 1000]"
        :position="[1, 5, 15]"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls />
      <Suspense>
        <TresMesh ref="boxRef">
          <CarDemo />
          <Screen />
        </TresMesh>
      </Suspense>
      <TresAmbientLight :position="[1, 5, 15]" color="#d3adf7" :intensity="3" />
    </TresCanvas>
  </div>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import * as THREE from "three";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import CarDemo from "./carDemo.vue";
import Screen from "./screen.vue";
defineOptions({
  name: "carPage"
});
const boxRef = shallowRef<THREE.Object3D>();

// const { onLoop } = useRenderLoop();

// onLoop(({ delta, elapsed }) => {
//   if (boxRef.value) {
//     boxRef.value.rotation.y += delta;
//   }
// });
const gl = {
  clearColor: "#1f1f1f",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
};
</script>
<style lang="scss" scoped></style>
