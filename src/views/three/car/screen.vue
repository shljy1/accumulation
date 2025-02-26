<template>
  <TresMesh ref="tmSceen" :position="[0, 0, -16]">
    <TresPlaneGeometry :args="[16, 10]" />
    <TresMeshBasicMaterial :map="texture" />
    <TresMesh :scale="[16.05, 10.05, 1]" :position="[0, 0, -0.01]">
      <TresPlaneGeometry />
      <TresMeshBasicMaterial color="black" />
    </TresMesh>
  </TresMesh>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import * as THREE from "three";
import { useVideoTexture } from "@tresjs/cientos";

const texture = ref();
texture.value = await useVideoTexture("/threeDemo/su7_car/vlg.mp4", {
  loop: true
});
texture.value.colorSpace = THREE.SRGBColorSpace;

const tmSceen = ref();
</script>
