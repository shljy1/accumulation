<script setup lang="ts">
import * as THREE from "three";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
let scene;
scene = new THREE.Scene();

const loadResources = async () => {
  const viewer = new GaussianSplats3D.DropInViewer({
    gpuAcceleratedSort: false,
    sharedMemoryForWorkers: false
  });
  await viewer.addSplatScenes(
    [
      {
        path: `${import.meta.env.BASE_URL}threeDemo/splats/person.compressed.ply`,
        splatAlphaRemovalThreshold: 5,
        rotation: [1, 0, 0, 0],
        position: [0, -1, 0]
      }
    ],
    false
  );
  scene.add(viewer);
};

loadResources();
</script>

<template>
  <primitive :object="scene" />
</template>
