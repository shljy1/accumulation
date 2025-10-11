<template>
  <div class="w-[800px] h-[600px] relative">
    <div id="dissolveGui" class="absolute z-[999] right-0" />
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />
      <OrbitControls />
      <Suspense>
        <Dissolve />
      </Suspense>
      <TresAmbientLight :intensity="2" />
    </TresCanvas>
  </div>
</template>
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import Dissolve from "./dissolve.vue";
defineOptions({
  name: "dissolvePage"
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
