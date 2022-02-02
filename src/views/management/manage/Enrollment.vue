<template>
  <div class="enrollment">
    <div class="window">
      <div class="website">
        <!-- 上 -->
        <div class="web_top">
          <div class="line"></div>
          <div class="web_title">园所定制官网</div>
          <div class="line"></div>
        </div>
        <!-- 中 -->
        <div class="web_img">
          <img :src="management.domainImg" alt="" class="base_img" />
          <div class="img_title">{{ management.schoolName }}</div>
          <div class="template">模板</div>
        </div>
        <!-- 下 -->
        <div class="web_bottom">官网模板</div>
      </div>
      <div class="website">
        <!-- 上 -->
        <div class="web_top">
          <div class="line"></div>
          <div class="web_title">园所宣传手册</div>
          <div class="line"></div>
        </div>
        <!-- 中 -->
        <div class="web_img">
          <img src="@/assets/image/home/matimg.png" alt="" />
          <div class="template">模板</div>
        </div>
        <!-- 下 -->
        <div class="web_bottom">宣传册模板</div>
      </div>
    </div>
    <div class="build">立刻创建</div>
  </div>
</template>

<script>
import { getEnrollmentStatus } from "@/api/home.js";

export default {
  data() {
    return {
      client: "",
      management: {},
    };
  },
  mounted() {
    this.client = localStorage.getItem("client");
    this.getEnrollmentStatusFun();
  },
  methods: {
    getEnrollmentStatusFun() {
      getEnrollmentStatus({ client: this.client }).then((res) => {
        this.management = res.data;
      });
    },
  },
};
</script>

<style lang="less">
.enrollment {
  width: 1746px;
  height: 757px;
  background: #ffffff;
  box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.06);
  border-radius: 4px;
  .window {
    padding: 51px 189px;
    display: flex;
    .website {
      width: 668px;
      height: 507px;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #e8e8e8;
      margin-right: 32px;
      .web_top {
        margin: 33px 175px 24px 175px;
        display: flex;
        align-items: center;
        .line {
          width: 40px;
          height: 2px;
          background-color: #dddcdc;
        }
        .web_title {
          margin: 0 32px;
          color: #6e6d7a;
          font-size: 28px;
          font-weight: 500;
        }
      }
      .web_img {
        width: 617px;
        height: 357px;
        margin: 0 25px;
        position: relative;
        .base_img,
        img {
          width: 100%;
          height: 100%;
          border-radius: 25px;
          overflow: hidden;
        }
        .img_title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
        }
        .template {
          width: 61px;
          height: 33px;
          position: absolute;
          top: 0;
          right: 0;
          background: #e5423e;
          color: #ffffff;
          text-align: center;
          line-height: 33px;
          border-radius: 0 20px 0 20px;
        }
      }
      .web_bottom {
        margin-left: 296px;
        margin-top: 8px;
        font-size: 16px;
        color: #b8b8b8;
      }
    }
  }
  .build {
    width: 1368px;
    height: 80px;
    border-radius: 16px;
    border: 1px solid #e5423e;
    margin-left: 189px;
    font-size: 26px;
    line-height: 80px;
    text-align: center;
    color: #e5423e;
    cursor: pointer;
  }
}
</style>