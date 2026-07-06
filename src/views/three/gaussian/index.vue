<template>
  <div class="w-[800px] h-[600px] relative">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :args="[45, 0.67, 0.1, 1000]"
        :position="[1, 5, 15]"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls />
      <Suspense>
        <TresMesh ref="boxRef">
          <Person />
        </TresMesh>
      </Suspense>
      <TresAmbientLight :position="[1, 5, 15]" color="#d3adf7" :intensity="3" />
    </TresCanvas>
  </div>
</template>
<script setup lang="ts">
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import Person from "./person.vue";
defineOptions({
  name: "gaussianPage"
});

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
