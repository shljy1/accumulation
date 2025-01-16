<script setup lang="ts">
import { ContactShadows, OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
import Mirror from "./mirror.vue";
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from "three";

const gl = {
  clearColor: "#434343",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
};
</script>

<template>
  <div class="w-[1080px] h-[720px] relative">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 3, 5]" />
      <OrbitControls />
      <Suspense>
        <Mirror />
      </Suspense>
      <ContactShadows :blur="3.5" :resolution="512" :opacity="1" />
      <TresAmbientLight :intensity="1" />
      <TresDirectionalLight
        :intensity="2"
        :position="[2, 3, 0]"
        :cast-shadow="true"
        :shadow-camera-far="50"
        :shadow-camera-left="-10"
        :shadow-camera-right="10"
        :shadow-camera-top="10"
        :shadow-camera-bottom="-10"
      />
    </TresCanvas>
  </div>
</template>
