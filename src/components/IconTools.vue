<template>
  <div class="icon_tools">
    <!-- 左边 -->
    <div class="icon_left">
      <div class="collect" :class="bookCollect ? 'active' : ''">
        <i class="el-icon-star-on"></i>
        <span @click="handleAdd">{{ bookCollect ? "已收藏" : "收藏" }}</span>
      </div>
      <!-- 分享弹窗 -->
      <div class="share_pop" v-show="!isshow">
        <div class="el-icon-close" @click="isshow = true"></div>
        <span>扫码前往小程序分享</span>
        <img :src="icode" alt="" />
      </div>
      <div class="share" @click="handleshare">
        <i class="el-icon-share"></i>
        <span>分享</span>
      </div>
      <div class="print" @click="bindprint">
        <i class="el-icon-printer"></i>
        <span>打印</span>
      </div>
    </div>
    <!-- 右边 -->
    <div class="icon_right" @click="fullscreen">
      <i class="el-icon-full-screen"></i>
      <span>全屏</span>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
import printJS from "print-js";

import {
  newAddCellection,
  newDleCellection,
  getMaterialQRcode,
} from "@/api/home.js";
export default {
  props: {
    cicon: {
      type: Object,
    },
    bookCollect: {
      type: Number,
    },
  },
  data() {
    return {
      icode: "",
      isshow: true,
    };
  },
  methods: {
    // 打印
    bindprint() {
      printJS({
        printable: this.cicon.url,
        type: "image",
        imageStyle: "width:100%;margin-bottom:20px;",
      });
    },
    // 分享
    handleshare() {
      this.getMaterialQRcodeFun();
      this.isshow = !this.isshow;
    },
    // 收藏
    newAddCellectionFun() {
      let params = {
        sourceId: this.cicon.contentId,
        sourceType: this.cicon.contentType,
        title: this.cicon.title,
      };
      newAddCellection(params).then((res) => {
        console.log(res);
        this.$message({
          message: "已收藏",
          type: "success",
        });
        this.$emit("handleAdd");
      });
    },
    newDleCellectionFun() {
      let params = {
        sourceId: this.cicon.contentId,
        sourceType: this.cicon.contentType,
        title: this.cicon.title,
      };
      newDleCellection(params).then((res) => {
        console.log(res);
        this.$message({
          message: "取消收藏",
          type: "success",
        });
        this.$emit("handleAdd");
      });
    },
    handleAdd() {
      this.bookCollect
        ? this.newDleCellectionFun()
        : this.newAddCellectionFun();
    },
    fullscreen() {
      // 全屏切换
      const element = document.querySelector(".mat_img");
      screenfull.request(element);
      screenfull.toggle();
    },
    getMaterialQRcodeFun() {
      let params = {
        mid: this.cicon.contentId,
        type: this.cicon.contentType,
      };
      getMaterialQRcode(params).then((res) => {
        console.log(res);
        this.icode = res.data.url;
      });
    },
  },
};
</script>

<style lang="less">
.icon_tools {
  display: flex;
  justify-content: space-between;
  padding: 13px 24px;
  .icon_left {
    display: flex;
    position: relative;

    div {
      margin-right: 40px;
      cursor: pointer;
    }
    span {
      color: #000000;
      font-weight: 500;
    }
    .active {
      color: red;
      span {
        color: red;
      }
    }
    .share_pop {
      position: absolute;
      left: 0;
      top: -374px;
      z-index: 10;
      width: 300px;
      height: 344px;
      background: #ffffff;
      box-shadow: 0px 3px 12px 0px rgba(28, 25, 24, 0.1);
      text-align: center;
      .el-icon-close {
        position: absolute;
        top: 14px;
        right: 15px;
        font-size: 25px;
        color: #6e6d7a;
        margin-right: 0;
        font-weight: 600;
      }

      span {
        margin-top: 48px;
        display: block;
        font-size: 20px;
        color: #0d0b22;
      }
      img {
        width: 200px;
        height: 200px;
        margin-top: 26px;
      }

      &::after {
        content: "";
        display: block;
        width: 40px;
        height: 40px;
        background-color: #fff;
        position: absolute;
        bottom: -12px;
        left: 43%;
        transform: translateX(-50%) rotate(-135deg);
      }
    }
  }
  .icon_right {
    cursor: pointer;
  }
}
</style>