<template>
  <div id="embedpano" class="w-[1280px] h-[720px] relative" />
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

// krpano.js 在 window 上挂载的全局方法
declare global {
  interface Window {
    embedpano?: (params: Record<string, any>) => void;
    removepano?: (id: string) => void;
  }
}

onMounted(() => {
  if (window.embedpano) {
    window.embedpano({
      target: "embedpano",
      id: "embedpano1",
      bgcolor: "transparent",
      // xml 已放到 public/krpano 下，xml 内部的相对路径会基于该目录解析
      xml: "/krpano/threejs_thirdpersoncontrols.xml",
      sameorigin: false,
      onready: () => {}
    });
  } else {
    console.error("krpano.js 未加载，请检查 index.html 中的 script 标签");
  }
});

// 路由离开时销毁全景实例，释放 WebGL 资源
onUnmounted(() => {
  window.removepano?.("embedpano");
});

defineOptions({
  name: "krPanoPage"
});
</script>
<style lang="scss" scoped></style>
