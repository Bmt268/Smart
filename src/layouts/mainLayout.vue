<template>
  <div id="ku">
    <div class="aside">
      <div class="avatar">
        <img src="" alt="" />
      </div>
      <nav>
        <router-link to="/home">
          <img
            class="hide"
            src="@/assets/image/icon/icon-home-gray.png"
            alt=""
          />
          <img class="active" src="@/assets/image/icon/icon-home.png" alt="" />
          <span>首页</span>
        </router-link>
        <router-link to="/school">
          <img
            class="hide"
            src="@/assets/image/icon/icon-schoolSourceUpload-gray.png"
            alt=""
          />
          <img
            class="active"
            src="@/assets/image/icon/icon-schoolSourceUpload.png"
            alt=""
          />
          <span>园所资源</span>
        </router-link>
        <router-link to="/AIClass">
          <img
            class="hide"
            src="@/assets/image/icon/icon-ai-class-gray.png"
            alt=""
          />
          <img
            class="active"
            src="@/assets/image/icon/icon-ai-class.png"
            alt=""
          />
          <span>AI课表</span>
        </router-link>
        <router-link to="/mycollect">
          <img
            class="hide"
            src="@/assets/image/icon/icon-collect-gray.png"
            alt=""
          />
          <img
            class="active"
            src="@/assets/image/icon/icon-collect.png"
            alt=""
          />
          <span>我的收藏</span>
        </router-link>
        <router-link to="/management">
          <img
            class="hide"
            src="@/assets/image/icon/icon-manage-teacher-gray.png"
            alt=""
          />
          <img
            class="active"
            src="@/assets/image/icon/icon-manage-teacher.png"
            alt=""
          />
          <span>管理</span>
        </router-link>
      </nav>
    </div>
    <div class="content">
      <top-nav></top-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
export default {
  components: {
    TopNav,
  },
};
</script>

<style lang="less" scoped>
#ku {
  display: flex;
  .aside {
    width: 110px;
    height: 100vh;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    .avatar {
      width: 36px;
      height: 36px;
      margin: 0.16rem 0;
      border-radius: 50%;
      overflow: hidden;
      background-color: red;
    }
    nav {
      font-size: 12px;
      width: 100%;
      .router-link-active {
        color: red;
        .active {
          display: block;
        }
        .hide {
          display: none;
        }
      }
      a {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        margin: 20px 0;
        padding: 12px 0;
        color: #6e6d7a;
        .active {
          display: none;
        }
        .hide {
          display: block;
        }
        img {
          width: 29px;
          height: 29px;
          margin-bottom: 10px;
        }
        cursor: pointer;
        &:hover {
          background-color: #f7f7f9;
        }
      }
    }
  }
  .content {
    width: 100%;
  }
}
</style>