<template>
  <div class="welcome-body flex justify-center bg-cover bg-center h-screen">
    <div class="frosted-glass flex justify-center items-center fixed">
      <h1 class="title pl-3 text-white">shljy</h1>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.welcome-body {
  background-image: url(/src/assets/welcome/sakura.jpg);
}

.frosted-glass {
  width: 72vw;
  height: 20vh;
  margin-top: 10vh;
  box-shadow:
    0 0.3px 0.7px rgba(0, 0, 0, 0.126),
    0 0.9px 1.7px rgba(0, 0, 0, 0.179),
    0 1.8px 3.5px rgba(0, 0, 0, 0.224),
    0 3.7px 7.3px rgba(0, 0, 0, 0.277),
    0 10px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  transition: 0.5s ease;
}
.frosted-glass:hover {
  box-shadow:
    0 0.7px 1px rgba(0, 0, 0, 0.157),
    0 1.7px 2.6px rgba(0, 0, 0, 0.224),
    0 3.5px 5.3px rgba(0, 0, 0, 0.28),
    0 7.3px 11px rgba(0, 0, 0, 0.346),
    0 20px 30px rgba(0, 0, 0, 0.5);
}
.frosted-glass .title {
  font-size: 3.6em;
  font-family: Lato, sans-serif;
  font-weight: 200;
  letter-spacing: 0.75em;
}
</style>
