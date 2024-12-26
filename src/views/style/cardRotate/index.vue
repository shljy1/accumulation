<template>
  <div class="cardRotate-body">
    <div class="card">
      <div class="box">
        <div class="img-box">
          <img src="@/assets/welcome/sakura.jpg" alt="" />
        </div>
        <div class="text">
          <div>
            <h2>sakura</h2>
            <p>樱花红陌上，柳叶绿池边。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "cardRotatePage"
});
</script>
<style lang="scss" scoped>
.cardRotate-body {
  height: 250px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  .card {
    position: relative;
    width: 300px;
    height: 168px;
    margin: 20px;
    transform-style: preserve-3d;
    perspective: 1000px;
    .box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: 2s ease;
      .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transform: rotateY(180deg);
        div {
          color: #fff;
          padding: 20px;
          background: linear-gradient(90deg, #6f65e0, #24c6dc);
          transform: translateZ(100px);
          h2 {
            font-size: 20px;
            letter-spacing: 2px;
          }
          p {
            font-size: 15px;
            text-align: justify;
            margin-top: 5px;
          }
        }
      }
    }
  }
  .card:hover .box {
    transform: rotateY(180deg);
  }
}
</style>
