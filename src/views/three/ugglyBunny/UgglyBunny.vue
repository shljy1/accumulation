<script setup lang="ts">
import { ref } from "vue";
import { useAnimations, useGLTF } from "@tresjs/cientos";
import { Text3D } from "@tresjs/cientos";
const { scene: model, animations } = await useGLTF(
  "https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf"
);

const { actions } = useAnimations(animations, model);

const currentAction = ref(actions.Greeting);

currentAction.value.play();
</script>

<template>
  <primitive :object="model" />
  <Text3D
    :position="[0, -2, 0]"
    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
  >
    hello
    <TresMeshMatcapMaterial color="#d4ff00" />
  </Text3D>
</template>
