<template>
  <div class="w-[500px] h-[500px] relative">
    <div id="hexagramGui" class="absolute z-[999] right-0" />
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 0, 1.5]" :look-at="[0, 0, 0]" />
      <OrbitControls />
      <Suspense>
        <Hexagram />
      </Suspense>
      <TresAmbientLight :intensity="2" />
    </TresCanvas>
  </div>
</template>
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import Hexagram from "./hexagram.vue";
defineOptions({
  name: "hexagramPage"
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
