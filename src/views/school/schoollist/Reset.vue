<template>
  <div class="modify_link">
    <div class="modify_content">
      <div class="conten_top">
        <div class="new_build">重命名</div>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <div class="theme_content">
        <div class="theme_name"><span>*</span>课件名称:</div>
        <input type="text" v-model="title" />
      </div>
      <div class="theme_content">
        <div class="theme_name"><span>*</span>课件标签:</div>
        <input type="text" v-model="tag" />
      </div>
      <div class="theme_content">
        <div class="theme_intro">课件简介:</div>
        <textarea placeholder="请输入该课件简介~" v-model="intro"></textarea>
      </div>
      <div class="makesure" @click="handleSuppot">确认提交</div>
    </div>
  </div>
</template>

<script>
import { setCoursewareRename } from "@/api/home.js";
export default {
  data() {
    return {
      title: "",
      tag: "",
      intro: "",
      id: "",
    };
  },
  props: {
    freshname: {
      type: Object,
    },
  },
  mounted() {
    this.id = this.freshname.id;
    this.intro = this.freshname.intro;
    this.tag = this.freshname.tag;
    this.title = this.freshname.title;

    console.log(this.freshname);
  },
  methods: {
    handleClose() {
      this.$emit("clickClose");
    },
    setCoursewareRenameFun() {
      setCoursewareRename({
        id: this.id,
        intro: this.intro,
        title: this.title,
        tag: this.tag,
      }).then((res) => {
        console.log(res);
        this.$emit("update");
        this.handleClose();
      });
    },
    handleSuppot() {
      this.setCoursewareRenameFun();
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
    height: 730px;
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
      margin-top: 20px;
      margin-left: 10px;
      span {
        color: #e5423e;
      }
      .theme_name {
        color: #6e6d7a;
        font-size: 18px;
        letter-spacing: 1px;
        margin-right: 20px;
      }
      .theme_intro {
        color: #6e6d7a;
        font-size: 18px;
        letter-spacing: 1px;
        margin-right: 20px;
        margin-left: 7px;
      }
      input {
        width: 431px;
        border-bottom: 1px solid #bfbfbf;
        padding: 0 12px;
        font-size: 18px;
      }
      textarea {
        width: 431px;
        height: 334px;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        border: 1px solid #bfbfbf;
        margin-top: 10px;
        padding: 12px;
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