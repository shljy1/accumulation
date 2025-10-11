<template>
  <div class="w-80 h-80">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 0, 1]" :look-at="[0, 0, 0]" />
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
import Hexagram from "./Hexagram.vue";
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
