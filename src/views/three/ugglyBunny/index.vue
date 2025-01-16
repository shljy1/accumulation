<template>
  <div class="w-60 h-60">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 2, 8]" :look-at="[0, 2, 0]" />
      <OrbitControls />
      <Suspense>
        <UgglyBunny />
      </Suspense>
      <TresDirectionalLight
        color="#b37feb"
        :position="[3, 3, 3]"
        :intensity="1"
      />
      <TresAmbientLight :intensity="2" />
    </TresCanvas>
  </div>
</template>
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import UgglyBunny from "./UgglyBunny.vue";
defineOptions({
  name: "ugglyBunnyPage"
});
const gl = {
  clearColor: "#b37feb",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
};
</script>
<style lang="scss" scoped></style>
