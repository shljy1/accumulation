<template>
  <div class="glassCard-body">
    <div class="box">
      <div data-text="路飞" style="--r: -15" class="glass">
        <img src="@/assets/img/1.jpg" alt="" />
      </div>
      <div data-text="索隆" style="--r: 0" class="glass">
        <img src="@/assets/img/2.jpg" alt="" />
      </div>
      <div data-text="山治" style="--r: 15" class="glass">
        <img src="@/assets/img/3.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "glassCardPage"
});
</script>
<style lang="scss" scoped>
.glassCard-body {
  width: 600px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  .box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .glass {
      position: relative;
      padding: 10px;
      width: 180px;
      height: 200px;
      background: linear-gradient(#fff2, transparent);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s;
      border-radius: 10px;
      margin: 0 -45px;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transform: rotate(calc(var(--r) * 1deg));
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .glass::before {
      content: attr(data-text);
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
  .box:hover .glass {
    transform: rotate(0deg);
    margin: 0 10px;
    cursor: pointer;
  }
}
</style>
