<template>
  <div class="solidPhoto-body">
    <div class="boxs">
      <div class="box front">
        <img src="@/assets/img/1.jpg" alt="" />
      </div>
      <div class="box back">
        <img src="@/assets/img/1.jpg" alt="" />
      </div>
      <div class="box top">
        <img src="@/assets/img/2.jpg" alt="" />
      </div>
      <div class="box bottom">
        <img src="@/assets/img/2.jpg" alt="" />
      </div>
      <div class="box left">
        <img src="@/assets/img/3.jpg" alt="" />
      </div>
      <div class="box right">
        <img src="@/assets/img/3.jpg" alt="" />
      </div>

      <div class="in-box in-front">
        <img src="@/assets/img/1.jpg" alt="" />
      </div>
      <div class="in-box in-back">
        <img src="@/assets/img/1.jpg" alt="" />
      </div>
      <div class="in-box in-top">
        <img src="@/assets/img/2.jpg" alt="" />
      </div>
      <div class="in-box in-bottom">
        <img src="@/assets/img/2.jpg" alt="" />
      </div>
      <div class="in-box in-left">
        <img src="@/assets/img/3.jpg" alt="" />
      </div>
      <div class="in-box in-right">
        <img src="@/assets/img/3.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.solidPhoto-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 500px;
  background-color: #000;
  position: relative;
  .boxs {
    position: absolute;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    animation: rotateAnimate 10s linear infinite;
    .front {
      transform: translateZ(100px);
    }
    .back {
      transform: translateZ(-100px) rotateY(180deg);
    }
    .top {
      transform: translateY(100px) rotateX(90deg);
    }
    .bottom {
      transform: translateY(-100px) rotateX(270deg);
    }
    .left {
      transform: translateX(-100px) rotateY(90deg);
    }
    .right {
      transform: translateX(100px) rotateY(270deg);
    }

    .in-front {
      transform: translateZ(50px);
    }
    .in-back {
      transform: translateZ(-50px) rotateY(180deg);
    }
    .in-top {
      transform: translateY(50px) rotateX(90deg);
    }
    .in-bottom {
      transform: translateY(-50px) rotateX(270deg);
    }
    .in-left {
      transform: translateX(-50px) rotateY(90deg);
    }
    .in-right {
      transform: translateX(50px) rotateY(270deg);
    }
  }
  .boxs:hover {
    .front {
      transform: translateZ(200px);
    }
    .back {
      transform: translateZ(-200px) rotateY(180deg);
    }
    .top {
      transform: translateY(200px) rotateX(90deg);
    }
    .bottom {
      transform: translateY(-200px) rotateX(270deg);
    }
    .left {
      transform: translateX(-200px) rotateY(90deg);
    }
    .right {
      transform: translateX(200px) rotateY(270deg);
    }
    // .in-front {
    //   transform: translateZ(150px);
    // }
    // .in-back {
    //   transform: translateZ(-150px) rotateY(180deg);
    // }
    // .in-top {
    //   transform: translateY(150px) rotateX(90deg);
    // }
    // .in-bottom {
    //   transform: translateY(-150px) rotateX(270deg);
    // }
    // .in-left {
    //   transform: translateX(-150px) rotateY(90deg);
    // }
    // .in-right {
    //   transform: translateX(150px) rotateY(270deg);
    // }
  }
  .box {
    position: absolute;
    width: 200px;
    height: 200px;
    transition: transform 1s ease-in;
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
  }
  .in-box {
    position: absolute;
    width: 100px;
    height: 100px;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
}
@keyframes rotateAnimate {
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
}
</style>
