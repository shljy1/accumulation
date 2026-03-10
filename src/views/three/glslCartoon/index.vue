<template>
  <div>
    <div class="w-[500px] h-[500px] relative">
      <div class="absolute z-[999] right-0" />
      <TresCanvas v-bind="gl">
        <TresPerspectiveCamera :position="[0, 0, 1.5]" :look-at="[0, 0, 0]" />
        <OrbitControls />
        <Suspense>
          <Cartoon />
        </Suspense>
        <TresAmbientLight :intensity="2" />
      </TresCanvas>
    </div>
    <div>动画源自www.shadertoy.com</div>
  </div>
</template>
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import Cartoon from "./cartoon.vue";
defineOptions({
  name: "glslCartoonPage"
});
const gl = {
  clearColor: "#000000",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
};
</script>
<style lang="scss" scoped></style>
