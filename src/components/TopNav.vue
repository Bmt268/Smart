<template>
  <div class="top-nav">
    <!-- 班级选择 -->
    <el-select v-model="value" placeholder="请选择" class="class_name">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
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

      <!-- 用户 -->
      <div class="user">
        <img src="@/assets/image/user.jpg" alt="" />
        <span>张一山</span>
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      input: "",
    };
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
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.1);
}
.class_name {
  margin: 12px;
  width: 114px;
  height: 40px;
  border-radius: 4px;
  color: #0d0b22;
}

.right {
  display: flex;
  justify-content: space-between;
}
.search {
  font-size: 16px;
}

.search_wrap {
  position: relative;
  margin-right: 20px;
}
.search_wrap img {
  position: absolute;
  top: 12px;
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
}
input::placeholder {
  font-size: 16px;
}
.user {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.user span {
  padding-left: 16px;
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