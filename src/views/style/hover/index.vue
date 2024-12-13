<template>
  <div class="hover-body">
    <div class="box">
      <div class="box-img">
        <img src="@/assets/welcome/sakura.jpg" alt="" />
      </div>
      <div class="box-text">
        <div>
          <h2>sakura</h2>
          <p>樱花红陌上，柳叶绿池边</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.hover-body {
  position: relative;
  .box {
    position: relative;
    width: 300px;
    height: 169px;
    margin: 25px;
    transition: 0.5s;
    overflow: hidden;
    cursor: pointer;
    .box-img::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 50%;
      background: linear-gradient(
        to top,
        rgba(235, 161, 255, 0.5),
        transparent
      );
      opacity: 0;
      transition: 0.5s;
    }
  }
  .box:hover {
    transform: scale(1.25);
    box-shadow: 0 25px 40px rgba(0, 0, 0, 0.5);
    .box-img::before {
      opacity: 1;
    }
    .box-text {
      h2 {
        transform: translateY(0);
        transition-delay: 0.3s;
      }
      p {
        transform: translateY(0);
        transition-delay: 0.4s;
      }
    }
  }
  .box-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .box-text {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    align-items: flex-end;
    color: #fff;
    h2 {
      font-size: 20px;
      margin-bottom: 10px;
      transform: translateY(200px);
      transition: 0.5s;
    }
    p {
      font-size: 13px;
      line-height: 20px;
      transform: translateY(200px);
      transition: 0.5s;
    }
  }
}
</style>
