<template>
  <div class="rotate-body">
    <div class="rotate-container">
      <div class="card-box-in">
        <div class="card">
          <img src="@/assets/img/1.jpg" alt="" />
        </div>
        <div class="card">
          <img src="@/assets/img/2.jpg" alt="" />
        </div>
        <div class="card">
          <img src="@/assets/img/3.jpg" alt="" />
        </div>
        <div class="card">
          <img src="@/assets/img/1.jpg" alt="" />
        </div>
        <div class="card">
          <img src="@/assets/img/2.jpg" alt="" />
        </div>
        <div class="card">
          <img src="@/assets/img/3.jpg" alt="" />
        </div>
      </div>
      <!-- <div class="card-box">
        <div class="card">
          <img src="@/assets/img/1.jpg" alt="" />
        </div>
        <div class="card">
          <img src="@/assets/img/2.jpg" alt="" />
        </div>
        <div class="card">
          <img src="@/assets/img/3.jpg" alt="" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.rotate-body {
  height: 400px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000;
  .rotate-container {
    width: 200px;
    height: 300px;
    perspective: 1000px;
    position: relative;
    // .card-box {
    //   position: absolute;
    //   width: 100%;
    //   height: 100%;
    //   transform-style: preserve-3d;
    //   transform: rotateY(0) translateZ(-500px);
    //   animation: cardRotate 15s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    //   .card img {
    //     width: 100%;
    //     height: 100%;
    //   }
    //   .card {
    //     position: absolute;
    //     left: 0;
    //     right: 0;
    //     top: 0;
    //     bottom: 0;
    //     width: 100%;
    //     height: 100%;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     -webkit-box-reflect: below 15px -webkit-linear-gradient(transparent 50%, rgba(255, 255, 255, 0.3));
    //   }

    //   .card:nth-child(1) {
    //     transform: rotateY(0) translateZ(500px);
    //   }

    //   .card:nth-child(2) {
    //     transform: rotateY(120deg) translateZ(500px);
    //   }

    //   .card:nth-child(3) {
    //     transform: rotateY(240deg) translateZ(500px);
    //   }

    //   @keyframes cardRotate {
    //     4% {
    //       transform: translateZ(-500px) rotateY(0);
    //     }
    //     36% {
    //       transform: translateZ(-500px) rotateY(-120deg);
    //     }
    //     68% {
    //       transform: translateZ(-500px) rotateY(-240deg);
    //     }
    //     100% {
    //       transform: translateZ(-500px) rotateY(-360deg);
    //     }
    //   }
    // }
    .card-box-in {
      position: absolute;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transform: rotateY(0) translateZ(-500px);
      animation: cardRotateIn 30s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      .card img {
        width: 100%;
        height: 100%;
      }
      .card {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-box-reflect: below 15px -webkit-linear-gradient(transparent 50%, rgba(255, 255, 255, 0.3));
      }

      .card:nth-child(1) {
        transform: rotateY(0) translateZ(173px);
      }

      .card:nth-child(2) {
        transform: rotateY(60deg) translateZ(173px);
      }

      .card:nth-child(3) {
        transform: rotateY(120deg) translateZ(173px);
      }

      .card:nth-child(4) {
        transform: rotateY(180deg) translateZ(173px);
      }

      .card:nth-child(5) {
        transform: rotateY(240deg) translateZ(173px);
      }

      .card:nth-child(6) {
        transform: rotateY(300deg) translateZ(173px);
      }

      @keyframes cardRotateIn {
        4% {
          transform: translateZ(-500px) rotateY(0);
        }
        20% {
          transform: translateZ(-500px) rotateY(60deg);
        }
        36% {
          transform: translateZ(-500px) rotateY(120deg);
        }
        52% {
          transform: translateZ(-500px) rotateY(180deg);
        }
        68% {
          transform: translateZ(-500px) rotateY(240deg);
        }
        84% {
          transform: translateZ(-500px) rotateY(300deg);
        }
        100% {
          transform: translateZ(-500px) rotateY(360deg);
        }
      }
    }
  }
}
</style>
