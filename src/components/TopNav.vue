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
        <i class="el-icon-arrow-down" @click="handleClose"></i>
      </div>

      <!-- 用户弹窗 -->
      <div class="user_detail" v-show="!hidden">
        <!-- 上 -->
        <div class="user_name">
          <!-- 左 -->
          <div class="user_img">
            <img :src="username.headimg" alt="" />
            <div class="camera">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-camera-solid avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <!-- 右 -->
          <div class="info">
            <div class="name">{{ username.name }}</div>
            <div class="company">{{ username.address }}</div>
          </div>
        </div>
        <div class="line"></div>
        <!-- 中 -->
        <div class="user_info">
          <div class="iname">
            <div class="fullname">姓名 :</div>
            <div class="aname" @click="show = !show" v-if="show">
              {{ username.name }}
            </div>
            <input type="text" v-else />
            <div
              class="el-icon-edit-outline"
              @click="show = !show"
              v-if="show"
            ></div>
            <div class="save" @click="show = !show" v-else>保存</div>
          </div>
          <div class="ititle">
            <div class="protitle">职称 :</div>
            <div class="leader">
              {{ username.role == 1 ? "老师" : "园长" }}
            </div>
          </div>
          <div class="iclass">
            <div class="res_class">负责班级 :</div>
            <div class="real_class">{{ username.room[0] }}</div>
          </div>
          <div class="iphone">
            <div class="phone">联系方式 :</div>
            <div class="number">{{ username.eid }}</div>
          </div>
        </div>
        <div class="line"></div>
        <!-- 下 -->
        <div class="more">
          <div class="get">
            <div class="discount">获取优惠</div>
            <img src="@/assets/image/home/ewm.png" alt="" />
          </div>
          <div class="package">
            <div class="set">更多套餐</div>
            <div class="forward">
              <a href="https://ku-61.com/web/#/home">前往官网</a>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <!-- 底 -->
        <div class="exit" @click="handleExit">退出账号</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getClasses, getUserInfo, changeHead } from "@/api/home";

export default {
  data() {
    return {
      options: [],
      value: "",
      input: "",
      username: {},
      imageUrl: "",
      hidden: true,
      show: true,
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    handleExit() {
      localStorage.clear();
      this.$router.push({ path: "/user/login" });
    },
    handleClose() {
      this.hidden = !this.hidden;
    },
    // 切换头像
    changeHeadFun() {
      changeHead().then((res) => {
        console.log(res);
      });
    },
  },

  mounted() {
    this.getClassesFun();
    this.getUserInfoFun();
    this.changeHeadFun();
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
  height: 500px;
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
    align-items: center;
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
      height: 44px;
      .name {
        font-size: 16px;
        color: #0d0b22;
        font-weight: bold;
      }
      .company {
        font-size: 14px;
        color: #6e6d7a;
        margin-top: 5px;
      }
    }
  }
  .line {
    width: 248px;
    height: 1px;
    background: #bfbfbf;
    margin-top: 28px;
  }
  .user_info {
    margin-top: 27px;
    .iname {
      display: flex;
      .fullname {
        font-size: 14px;
        color: #6e6d7a;
      }
      .aname {
        margin-left: 37px;
        font-size: 14px;
        color: #0d0b22;
        cursor: pointer;
      }
      .el-icon-edit-outline {
        margin-left: 13px;
        margin-top: 3px;
        color: #6e6d7a;
        cursor: pointer;
      }
      input {
        width: 80px;
        border-bottom: 1px solid #ccc;
        margin-left: 10px;
      }
      .save {
        width: 57px;
        height: 23px;
        background: rgba(247, 247, 249);
        text-align: center;
        line-height: 23px;
        margin-left: 13px;
        color: rgba(95, 100, 129);
        cursor: pointer;
      }
    }
    .ititle {
      margin-top: 24px;
      display: flex;
      .protitle {
        color: #6e6d7a;
        font-size: 14px;
      }
      .leader {
        margin-left: 37px;
        color: #0d0b22;
        font-size: 14px;
      }
    }
    .iclass {
      margin-top: 24px;
      display: flex;
      .res_class {
        color: #6e6d7a;
        font-size: 14px;
      }
      .real_class {
        margin-left: 8px;
        color: #0d0b22;
        font-size: 14px;
      }
    }
    .iphone {
      margin-top: 24px;
      display: flex;
      .phone {
        color: #6e6d7a;
        font-size: 14px;
      }
      .number {
        margin-left: 8px;
        color: #0d0b22;
        font-size: 14px;
      }
    }
  }

  .more {
    .get {
      display: flex;
      margin-top: 27px;
      align-items: center;

      .discount {
        color: #6e6d7a;
        font-size: 14px;
      }
      img {
        width: 32px;
        height: 32px;
        margin-left: 133px;
      }
    }
    .package {
      display: flex;
      align-items: center;
      .set {
        color: #6e6d7a;
        font-size: 14px;
        margin-top: 7px;
      }
      .forward {
        width: 90px;
        height: 28px;
        background: #e65452;
        border-radius: 4px;
        font-size: 12px;
        margin-top: 16px;
        margin-left: 75px;
        text-align: center;
        line-height: 28px;
        a {
          color: #ffffff;
        }
      }
    }
  }
  .exit {
    margin-top: 17px;
    color: #6e6d7a;
    font-size: 14px;
    cursor: pointer;
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