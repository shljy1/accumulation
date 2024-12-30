<template>
  <div class="w-60 h-60 flex justify-center items-center bg-black">
    <div
      class="loading w-40 h-40 rounded-full border-t-4 border-t-indigo-500 relative"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "loadingPage"
});
</script>
<style lang="scss" scoped>
.loading {
  animation: spin 3s linear infinite;
}
.loading::before {
  content: "";
  position: absolute;
  left: 10px;
  top: 10px;
  right: 10px;
  bottom: 10px;
  border-radius: 50%;
  border-right-width: 4px;
  border-right-color: #22d3ee;
  animation: spin 3s linear infinite;
}

.loading::after {
  content: "";
  position: absolute;
  left: 20px;
  top: 20px;
  right: 20px;
  bottom: 20px;
  border-radius: 50%;
  border-bottom-width: 4px;
  border-bottom-color: #c779d0;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
