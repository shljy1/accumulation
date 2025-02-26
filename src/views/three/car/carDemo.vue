<script setup lang="ts">
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useTexture } from "@tresjs/core";
import { useGLTF } from "@tresjs/cientos";
import { Mesh, Object3D } from "three";
import * as THREE from "three";
const flatModel = (scene: Object3D) => {
  const modelArr: Mesh[] = [];
  scene.traverse(child => {
    modelArr.push(child as Mesh);
  });
  return modelArr;
};
const res: any = await useGLTF(
  "/threeDemo/su7_car/sm_car.gltf",
  { draco: false },
  (gltfLoader: any) => {
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);
  }
);
const pTexture = await useTexture([
  "/threeDemo/su7_car/t_car_body_AO.raw.jpg",
  "/threeDemo/su7_car/t_cat_car_body_bc.webp",
  "/threeDemo/su7_car/t_gm_car_body_bc.webp"
]);

pTexture[0].colorSpace = THREE.LinearSRGBColorSpace;
pTexture[0].minFilter = THREE.NearestFilter;
pTexture[0].magFilter = THREE.NearestFilter;
pTexture[0].channel = 1;
for (let i = 0; i < pTexture.length; i++) {
  pTexture[i].flipY = false;
}

const carModel = flatModel(res.scene);

const body = carModel[2] as THREE.Mesh;
const bodyMat = body.material as THREE.MeshStandardMaterial;
bodyMat.envMapIntensity = 4;
bodyMat.color = new THREE.Color("#26d6e9");
carModel.forEach((item: THREE.Mesh) => {
  if (item.isMesh) {
    const mat = item.material as THREE.MeshStandardMaterial;
    mat.aoMap = pTexture[0];
  }
});
const wheel = carModel[35] as THREE.Mesh;
wheel.children.forEach(child => {
  const mesh = child as THREE.Mesh;
  const mat = mesh.material as THREE.MeshStandardMaterial;
  mat.envMapIntensity = 4;
});
// materials.Car_body.color.set(new THREE.Color('#e0b023'))
res.materials.Car_body.color.set("#ffffff");
res.materials.Car_body.map = pTexture[2];
res.materials.Car_body.envMapIntensity = 2;
</script>

<template>
  <primitive :object="res.scene" />
</template>
