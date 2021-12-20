<template>
  <div class="base">
    <!-- 上 -->
    <div class="base_nav">
      <!-- 索引栏 -->
      <div class="base_top">
        <div class="el-icon-back" @click="backlast"></div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>集体教学</el-breadcrumb-item>
          <el-breadcrumb-item>基础阅读</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 上内容 -->
      <div class="top_content">
        <div class="top_left">
          <img :src="topwrap.category_image" alt="" />
        </div>
        <div class="top_right">
          <div class="reading">{{ topwrap.name }}.</div>
          <div class="read_arr">一键排课</div>
          <div class="read_intro">{{ topwrap.description }}</div>
        </div>
      </div>
      <!-- 班级选择 -->
    </div>
    <!-- 下 -->
    <div class="base_content"></div>
  </div>
</template>

<script>
import { getSerialsDetail } from "@/api/home";
export default {
  data() {
    return {
      id: "",
      topwrap: {},
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getSerialsDetailFun();
  },
  methods: {
    backlast() {
      this.$router.back();
    },
    getSerialsDetailFun() {
      getSerialsDetail({ project: this.id }).then((res) => {
        console.log(res);
        this.topwrap = res.data;
      });
    },
  },
};
</script>

<style lang="less">
.base {
  .base_nav {
    .base_top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 30px;
      margin-left: 35px;

      .el-icon-back {
        width: 21px;
        height: 16px;
        color: #6e6d7a;
        font-weight: 600;
        cursor: pointer;
      }
      .el-breadcrumb {
        margin-left: 32px;
      }
    }
    .top_content {
      display: flex;
      margin-top: 32px;
      padding-left: 32px;
      .top_left {
        img {
          width: 175px;
          height: 233px;
          border-radius: 4px;
        }
      }
      .top_right {
        margin-left: 47px;
        position: relative;
        .reading {
          font-size: 24px;
          color: #0d0b22;
          font-weight: bold;
        }
        .read_arr {
          position: absolute;
          top: 15px;
          right: 34px;
          width: 116px;
          height: 44px;
          box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
          border-radius: 4px;
          line-height: 44px;
          text-align: center;
          color: #ffffff;
          background: #e5423e;
          cursor: pointer;
        }
        .read_intro {
          margin-top: 40px;
          width: 1467px;
          height: 135px;
          font-size: 18px;
          font-weight: 400;
          color: #0d0b22;
        }
      }
    }
  }
  .base_content {
  }
}
</style>