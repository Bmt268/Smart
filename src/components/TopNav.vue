<template>
  <div class="top-nav">
    <div class="right">
      <!-- 搜索框 -->
      <div class="search_wrap">
        <input
          v-model="input"
          placeholder="搜索“幼升小、特色课等”"
          class="search"
        />
        <img src="@/assets/image/icon/search2x.png" alt="" />
      </div>

      <!-- 班级选择 -->
      <el-select v-model="value" placeholder="请选择" class="class_name">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.room_id"
        >
        </el-option>
      </el-select>

      <!-- 历史 -->
      <div class="history">
        <i class="el-icon-time"></i>
        <div>历史</div>
      </div>

      <!-- 用户 -->
      <div class="user">
        <img :src="username.headimg" alt="" />
        <span>{{ username.name }}</span>
        <i class="el-icon-arrow-down"></i>
      </div>

      <!-- 用户弹窗 -->
      <div class="user_detail">
        <!-- 上 -->
        <div class="user_name">
          <!-- 左 -->
          <div class="user_img">
            <img src="@/assets/image/user.jpg" alt="" />
            <div class="camera">
              <i class="el-icon-camera-solid"></i>
            </div>
          </div>
          <!-- 右 -->
          <div class="info">
            <span class="name">张一山</span>
            <span class="company">天津</span>
          </div>
        </div>
        <!-- 中 -->
        <!-- 下 -->
        <!-- 底 -->
      </div>
    </div>
  </div>
</template>

<script>
import { getClasses, getUserInfo } from "@/api/home";

export default {
  data() {
    return {
      options: [],
      value: "",
      input: "",
      username: {},
    };
  },
  methods: {
    getClassesFun() {
      getClasses().then((res) => {
        // console.log(res);
        this.options = res.data;
      });
    },
    getUserInfoFun() {
      getUserInfo().then((res) => {
        // console.log(res);
        this.username = res.data;
      });
    },
  },
  mounted() {
    this.getClassesFun();
    this.getUserInfoFun();
  },
};
</script>

<style lang="less" scoped>
.top-nav {
  padding: 0 32px;
  width: 100%;
  height: 66px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #fff;
  box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.1);
}
.class_name {
  margin: 12px;
  width: 150px;
  height: 40px;
  border-radius: 4px;
  color: #0d0b22;
}
.history {
  margin: 12px;
  padding-right: 20px;
  border-right: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
  line-height: 24px;
  .el-icon-time {
    font-size: 20px;
  }
}

.right {
  display: flex;
  justify-content: space-between;
}

.search_wrap {
  position: relative;
  margin-right: 20px;
  line-height: 66px;
}
.search_wrap img {
  position: absolute;
  top: 24px;
  right: 30px;
  width: 16px;
  height: 16px;
}
.search {
  width: 320px;
  height: 40px;
  background: #f3f3f4;
  border-radius: 20px;
  padding-left: 30px;
  font-size: 16px;
}
input::placeholder {
  font-size: 16px;
}
.user {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.user img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.user span {
  padding-left: 16px;
}
.user_detail {
  width: 294px;
  height: 478px;
  background: #fff;
  box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.1);
  border-radius: 5px;
  padding: 30px;
  position: fixed;
  top: 80px;
  right: 23px;
  z-index: 5;

  &::after {
    content: "";
    display: block;
    width: 40px;
    height: 40px;
    background-color: #fff;
    position: absolute;
    top: -5px;
    left: 85%;
    transform: translateX(-50%) rotate(-135deg);
  }
  .user_name {
    display: flex;
    .user_img {
      width: 44px;
      height: 44px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .camera {
        width: 16px;
        height: 16px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        right: 0;
        line-height: 16px;
        .el-icon-camera-solid {
          transform: scale(0.6);
        }
      }
    }
    .info {
      margin-left: 23px;
      display: flex;
      flex-wrap: wrap;
      .name {
        font-size: 16px;
        color: #0d0b22;
      }
      .company {
        font-size: 14px;
        color: #6e6d7a;
      }
    }
  }
}
</style>
<style lang="less">
.top-nav {
  .el-input__inner {
    border: 1px solid #bfbfbf;
    font-size: 16px;
  }
  input::placeholder {
    font-size: 16px;
  }
  .el-icon-arrow-down {
    font-size: 16px;
  }
}
</style>