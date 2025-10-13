<script setup lang="ts">
import { ColladaLoader } from "three/addons/loaders/ColladaLoader.js";
import { useGLTF } from "@tresjs/cientos";
import * as THREE from "three";
const emit = defineEmits(["loadProgress"]);
let scene;
scene = new THREE.Scene();
const loadingManager = new THREE.LoadingManager(function () {});
const loader = new ColladaLoader(loadingManager);
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

const [archer, collada]: Array<any> = await Promise.all([
  useGLTF("/threeDemo/archer/scene.gltf"),
  new Promise((resolve, reject) => {
    loader.load(
      "/threeDemo/girl/elf.dae",
      resolve,
      function (xhr) {
        emit("loadProgress", ((xhr.loaded / xhr.total) * 100).toFixed(2) + "%");
      },
      reject
    );
  })
]);

const model = collada.scene;
const archerModel = archer.scene;
scene.add(model);
scene.add(archerModel);
model.updateMatrixWorld(true);
const box = new THREE.Box3().setFromObject(model);

const center = box.getCenter(new THREE.Vector3());
model.position.sub(center);
archerModel.position.z = -0.4;
archerModel.position.x = -0.8;
archerModel.position.y = -0.2;
archerModel.rotation.y = 0.2;

document.querySelector(".loading").remove();
</script>

<template>
  <primitive :object="scene" />
</template>
