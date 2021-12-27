<template>
  <div class="catenav">
    <h1>{{ cated.title }}</h1>
    <div class="cate">{{ cated.contentRoute }}</div>
    <div class="arrange">排课</div>
  </div>
</template>

<script>
export default {
  props: {
    cated: {
      type: Object,
    },
  },
};
</script>

<style lang="less">
.catenav {
  height: 102px;
  position: relative;
  h1 {
    margin-left: 32px;
    margin-top: 24px;
    font-size: 24px;
    color: #0d0b22;
  }
  .cate {
    margin-top: 16px;
    margin-left: 32px;
    color: #6e6d7a;
    font-size: 14px;
  }
  .arrange {
    width: 116px;
    height: 44px;
    background: #e5423e;
    box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
    border-radius: 4px;
    line-height: 44px;
    color: #ffffff;
    font-size: 18px;
    text-align: center;
    position: absolute;
    right: 56px;
    bottom: 38px;
  }
}
</style>