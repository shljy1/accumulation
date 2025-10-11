<script setup lang="ts">
import * as THREE from "three";
import { onUnmounted } from "vue";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import diffuseImage from "@/assets/welcome/sakura.jpg";
let scene;
scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

/* Tex */
const dissolveTex = textureLoader.load(
  `https://file.threehub.cn/` + "images/dissolve/dissolveTex.png"
);
dissolveTex.colorSpace = THREE.SRGBColorSpace;
const dissolveRampTex = textureLoader.load(
  `https://file.threehub.cn/` + "images/dissolve/dissolveRamp.png"
);
dissolveRampTex.colorSpace = THREE.SRGBColorSpace;
const diffuseTex = textureLoader.load(diffuseImage);
diffuseTex.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.PlaneGeometry(4, 3, 32, 32);

// Material
const shaderMaterial = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
    `,
  fragmentShader: /* glsl */ `
    uniform sampler2D uDissloveTex;
    uniform sampler2D uRamTex;
    uniform sampler2D uDiffuseTex;
    uniform float uClip;
    varying vec2 vUv;
    
    float customSmoothstep(float min, float max, float x) {
      return (x - min) / (max - min);
    }

    vec4 map(in vec4 value, in vec4 inMin, in vec4 inMax, in vec4 outMin, in vec4 outMax) {
      return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
    }
    
    void main() {
  
      vec4 DissloveTex = texture2D(uDissloveTex, vUv);
      DissloveTex = map(DissloveTex, vec4(0.), vec4(1.), vec4(0.1), vec4(1.));

      if((DissloveTex.r - uClip) < 0.) {
        discard;
      }
     
      float dissloveValue = clamp(customSmoothstep(uClip, uClip+.1, DissloveTex.r), 0., 1.);
      vec4 RamTex = texture2D(uRamTex, vec2(dissloveValue));
      vec4 diffuse = texture2D(uDiffuseTex, vUv);

      vec3 color = vec3(clamp( diffuse.rgb  + RamTex.rgb, 0., 1.));

      gl_FragColor = vec4(color, 1.0);

      #include <tonemapping_fragment>
	    #include <colorspace_fragment>
    }
    `,
  uniforms: {
    uDissloveTex: new THREE.Uniform(dissolveTex),
    uRamTex: new THREE.Uniform(dissolveRampTex),
    uDiffuseTex: new THREE.Uniform(diffuseTex),
    uClip: new THREE.Uniform(0)
  }
});

const gui = new GUI({ container: document.querySelector("#dissolveGui") });
gui
  .add(shaderMaterial.uniforms.uClip, "value")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Clip");

onUnmounted(() => {
  if (gui) {
    gui.destroy();
  }
});
// Mesh
const mesh = new THREE.Mesh(geometry, shaderMaterial);
scene.add(mesh);
</script>

<template>
  <primitive :object="scene" />
</template>
