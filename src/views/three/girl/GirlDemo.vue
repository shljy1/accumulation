<script setup lang="ts">
import { ColladaLoader } from "three/addons/loaders/ColladaLoader.js";
import { useGLTF } from "@tresjs/cientos";
import * as THREE from "three";
let scene;
scene = new THREE.Scene();
const loadingManager = new THREE.LoadingManager(function () {});
const loader = new ColladaLoader(loadingManager);
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );
const archer = await useGLTF("/src/assets/threeDemo/archer/scene.gltf");
await loader.load("/src/assets/threeDemo/girl/elf.dae", function (collada) {
  const model = collada.scene;
  const archerModel = archer.scene;
  scene.add(model);
  scene.add(archerModel);
  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);

  // 计算模型中心
  const center = box.getCenter(new THREE.Vector3());
  // 将模型移动到相机视野的中心
  model.position.sub(center);
  archerModel.position.z = -0.4;
  archerModel.position.x = -0.8;
  archerModel.position.y = -0.2;
  archerModel.rotation.y = 0.2;
});
</script>

<template>
  <primitive :object="scene" />
</template>
