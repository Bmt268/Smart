<template>
  <div class="sch">
    <!-- 顶部 -->
    <div class="top">
      <span>园所资源 > 园所公共课件 > 春天</span>
      <div class="uploading">
        <div class="source">上传资源</div>
        <div class="up_right">
          <div class="theme">新建主题</div>
          <div class="up">上传</div>
        </div>
      </div>
      <div class="tab_btm">
        <img src="@/assets/image/tab_btm.png" alt="" />
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="content_item">
        <img src="" alt="" />
        <span>附件</span>
      </div>
      <div class="content_item">
        <img src="" alt="" />
        <span>附件</span>
      </div>

      <div class="content_item">
        <img src="" alt="" />
        <span>附件</span>
      </div>
      <div class="content_item">
        <img src="" alt="" />
        <span>附件</span>
      </div>
      <div class="content_item">
        <img src="" alt="" />
        <span>附件</span>
      </div>
      <div class="content_item">
        <img src="" alt="" />
        <span>附件</span>
      </div>
      <div class="content_item">
        <img src="" alt="" />
        <span>附件</span>
      </div>
      <div class="content_item">
        <img src="" alt="" />
        <span>附件</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.sch {
  padding: 32px;
}
.top {
  span {
    font-size: 14px;
  }
  .uploading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .source {
      font-size: 18px;
      color: #e5423e;
    }
    .up_right {
      display: flex;
      justify-content: center;
      .theme {
        width: 120px;
        height: 44px;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        border: 1px solid #bfbfbf;
        font-size: 18px;
        line-height: 44px;
        text-align: center;
      }
      .up {
        margin-left: 40px;
        width: 120px;
        height: 44px;
        background: #e5423e;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        font-size: 18px;
        color: #fff;
        line-height: 44px;
        text-align: center;
      }
    }
  }
  .tab_btm {
    img {
      width: 84px;
      height: 12px;
      margin-left: 33px;
      margin-top: 28px;
    }
  }
}
.content {
  background-color: #f5f5fb;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .content_item {
    width: 414px;
    height: 320px;
    background: #ffffff;
    border-radius: 4px;
    text-align: center;
    line-height: 320px;
    margin: 24px;
    span {
      font-size: 18px;
    }
  }
}
</style>