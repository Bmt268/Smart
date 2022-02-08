<template>
  <div class="modify_link">
    <div class="modify_content">
      <div class="conten_top">
        <div class="new_build">新建主题</div>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <div class="theme_content">
        <div class="theme_name">主题名称:</div>
        <input type="text" v-model="themevalue" />
      </div>
      <div class="makesure" @click="handleSuppot">确认</div>
    </div>
  </div>
</template>

<script>
import { setCourseCategory } from "@/api/home.js";
export default {
  data() {
    return {
      themevalue: "",
    };
  },
  props: {
    parentId: {
      type: [String, Number],
    },
  },
  methods: {
    handleClose() {
      this.$emit("clickClose");
    },
    setCourseCategoryFun() {
      setCourseCategory({
        parentId: this.parentId,
        title: this.themevalue,
      }).then((res) => {
        console.log(res);
        this.$emit("update");
        this.handleClose();
      });
    },
    handleSuppot() {
      this.setCourseCategoryFun();
    },
  },
};
</script>

<style lang="less">
.modify_link {
  background: #333333;
  background: rgba(51, 51, 51, 0.6);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  .modify_content {
    width: 700px;
    height: 320px;
    background: #ffffff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    .conten_top {
      display: flex;
      line-height: 80px;
      border-bottom: 1px solid #bfbfbf;
      align-items: center;
      justify-content: space-between;
      .new_build {
        color: #0d0b22;
        font-size: 20px;
      }
      .el-icon-close {
        font-size: 30px;
        cursor: pointer;
      }
    }
    .theme_content {
      display: flex;
      line-height: 40px;
      margin-top: 50px;
      margin-left: 10px;
      .theme_name {
        color: #6e6d7a;
        font-size: 18px;
        letter-spacing: 1px;
        margin-right: 20px;
      }
      input {
        width: 443px;
        border-bottom: 1px solid #bfbfbf;
        padding: 0 12px;

        font-size: 18px;
      }
    }
    .makesure {
      width: 120px;
      height: 44px;
      background: #e5423e;
      box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
      border-radius: 4px;
      font-size: 18px;
      color: #ffffff;
      text-align: center;
      line-height: 44px;
      margin: 0 auto;
      margin-top: 60px;
    }
  }
}
</style>