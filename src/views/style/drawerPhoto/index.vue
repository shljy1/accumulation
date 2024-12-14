<template>
  <div class="drawerPhoto-body">
    <div class="box">
      <div class="box-img">
        <img src="@/assets/img/1.jpg" alt="" />
      </div>
      <div class="box-img">
        <img src="@/assets/img/2.jpg" alt="" />
      </div>
      <div class="box-img">
        <img src="@/assets/img/3.jpg" alt="" />
      </div>
      <div class="box-img">
        <img src="@/assets/img/1.jpg" alt="" />
      </div>
      <div class="box-img">
        <img src="@/assets/img/2.jpg" alt="" />
      </div>
      <div class="box-img">
        <img src="@/assets/img/3.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.drawerPhoto-body {
  width: 800px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  .box {
    width: 700px;
    height: 300px;
    display: flex;
    flex-direction: row;
    .box-img {
      width: 50px;
      height: 300px;
      transition: 0.5s;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        //object-position: 50% 20%;
      }
    }
    .box-img:hover {
      width: 200px;
    }
    .box-img:nth-child(1) img {
      object-position: left;
    }
    .box-img:nth-child(2) img {
      object-position: 20% 50%;
    }
    .box-img:nth-child(3) img {
      object-position: 40% 50%;
    }
    .box-img:nth-child(4) img {
      object-position: 60% 50%;
    }
    .box-img:nth-child(5) img {
      object-position: 80% 50%;
    }
    .box-img:nth-child(6) {
      width: 200px;
    }
    .box-img:hover ~ .box-img:nth-child(6) {
      width: 50px;
    }
    .box-img:hover ~ .box-img:nth-child(6) img {
      object-position: right;
    }
  }
}
</style>
