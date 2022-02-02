<template>
  <div class="login">
    <div class="login-card">
      <input type="text" v-model="phone" placeholder="请输入手机号" />
      <input type="text" v-model="vcode" placeholder="请输入验证码" />
      <div class="btn-login" @click="handleClick">登录</div>
    </div>
  </div>
</template>

<script>
import { getLoginInfo } from "@/api/common.js";
export default {
  data() {
    return {
      phone: "",
      vcode: "",
    };
  },
  methods: {
    // 点击登录
    handleClick() {
      if (!this.phone) {
        this.$message.error("请输入手机号码");
        return false;
      }
      if (!/^1[3-9]\d{9}$/.test(this.phone) && this.phone) {
        this.$message.error("手机号码有误，请重填");
        return false;
      }
      if (this.vcode === "") {
        this.$message.error("请输入验证码");
        return false;
      }
      this.login();
    },
    login() {
      getLoginInfo({
        phone: this.phone,
        vcode: this.vcode,
      }).then((res) => {
        if (res.errcode == 50001) {
          this.$message.error("验证码错误");
        } else {
          localStorage.setItem("uid", res.data.uid);
          localStorage.setItem("role", res.data.role);
          window.localStorage.wmUserInfo = JSON.stringify({
            userId: res.data.eid,
            userTag: "tag",
            projectVersion: "1.0.1",
          });
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  height: 100vh;
  .login-card {
    margin-top: 2rem;
    width: 4.2rem;
    height: 4rem;
    background: #ffffff;
    box-shadow: 0px 0px 0.5rem 0.2rem rgba(191, 191, 191, 0.4);
    border-radius: 0px 0px 12px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.6rem;
    input {
      height: auto;
      font-size: 0.16rem;
      background: transparent;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid rgba(191, 191, 191, 0.4);
      outline: none;
      padding: 0.2rem 0 0.12rem 0;
      box-sizing: content-box;
      font-family: PingFangSC-Regular;
      color: #0d0b22;
      width: 100%;
      margin-bottom: 0.3rem;
      width: 80%;
      &::placeholder {
        font-size: 0.16rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #6e6d7a;
      }
    }
    .btn-login {
      width: 3.2rem;
      line-height: 0.5rem;
      background: #e5423e;
      border-radius: 0.25rem;
      color: #fff;
      text-align: center;
      font-size: 0.2rem;
      margin-top: 0.3rem;
      cursor: pointer;
    }
  }
}
</style>
<style lang="less">
.el-message__icon {
  font-size: 0.3rem !important;
}
.el-icon-error {
  font-size: 0.3rem !important;
}
</style>