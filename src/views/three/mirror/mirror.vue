<template>
  <primitive :object="nodes.Macbook">
    <Html
      transform
      wrapper-class="webpage"
      :distance-factor="11"
      :position="[0, 10.5, -13.6]"
      occlude
      :rotation-x="-0.256"
    >
      <iframe
        class="rounded-lg w-[1024px] h-[670px]"
        src="https://tresjs.org"
        frameborder="0"
      />
    </Html>
  </primitive>
  <primitive :object="model" />
</template>

<script setup lang="ts">
import { Html, useGLTF } from "@tresjs/cientos";
import { ColladaLoader } from "three/addons/loaders/ColladaLoader.js";
import * as THREE from "three";
let model;
const loadingManager = new THREE.LoadingManager(function () {});
const loader = new ColladaLoader(loadingManager);
await loader.load("/threeDemo/girl/elf.dae", function (collada) {
  model = collada.scene;
  model.scale.set(0.4, 0.4, 0.4);
  model.position.x = 2;
  model.position.y = -1;
});
const { nodes } = await useGLTF(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf",
  { draco: true }
);
nodes.Macbook.position.y = -1;
nodes.Macbook.position.x = -1;
</script>
