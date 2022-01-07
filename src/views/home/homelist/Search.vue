<template>
  <div class="search_detail">
    <div class="select">
      <div class="select_list" v-for="(item, index) in selectwrap" :key="index">
        <div class="list_title">{{ item.title + " :" }}</div>
        <div class="list_content">
          <div
            class="class"
            v-for="(item1, index) in item.child"
            :key="index"
            @click="handleSelect(item1)"
            :class="{ selector: item1.selector }"
          >
            {{ item1.title }}
          </div>
        </div>
      </div>
      <div class="select_box" v-show="selectcheck.length != 0">
        <div class="box_title">您已选择:</div>
        <div class="box_content">
          <div
            class="box_check"
            v-for="(item, index) in selectcheck"
            :key="index"
          >
            <span>{{ item.title }}</span>
            <i class="el-icon-close" @click="handleRemove(index, item)"></i>
          </div>
        </div>
        <div class="box_empty" @click="handleClear">清空</div>
      </div>
    </div>
    <div class="detail">
      <div class="detail_title">
        以下是所有与<span>“{{ name }}”</span>相关素材
      </div>
      <div class="source">
        <material
          v-for="item in sourceList"
          :key="item.contentId"
          :citem="item"
          @handleRead="handleRead"
        ></material>
      </div>
    </div>
  </div>
</template>

<script>
import Material from "@/components/Material";
import { getGlobalTag, searchMaterial } from "@/api/home";

export default {
  data() {
    return {
      selectwrap: [],
      selectcheck: [],
      name: "",
      offset: 0,
      tags: [],
      type: [],
      sourceList: [],
    };
  },
  components: {
    Material,
  },
  mounted() {
    this.getGlobalTagFun();
    this.name = this.$route.query.keyword;
    this.searchMaterialFun();
    this.$bus.$on("searchInput", (res) => {
      console.log(res);
      this.name = res;
      this.searchMaterialFun();
    });
  },
  // computed: {
  //   selectcheck() {
  //     let arr = [];
  //     let arr1 = [];
  //     arr = this.selectwrap.map((res) => {
  //       return res.child;
  //     });
  //     arr1 = arr.map((res1) => {
  //       return res1.filter((res2) => {
  //         return res2.selector == true;
  //       });
  //     });
  //     console.log(arr1);
  //     console.log(arr1.flat());
  //     return arr1.flat();
  //   },
  // },
  methods: {
    // 参数处理
    handleData() {
      let tag = [];
      this.selectwrap.forEach((res) => {
        let arr = res.child
          .filter((res1) => {
            return res1.selector;
          })
          .map((res2) => {
            return res2.title;
          });
        if (arr.length > 0) {
          tag.push(arr);
        }
      });

      console.log(tag);
      let flag = false;
      tag[0] &&
        tag[0].forEach((res) => {
          if (["图片", "绘本", "游戏", "视频", "活动", "音频"].includes(res)) {
            flag = true;
          } else {
            flag = false;
          }
        });
      flag ? (this.tags = tag.splice(0, 1)) : (this.tags = tag);
      let type = [];
      this.selectwrap.forEach((res) => {
        let arr = res.child
          .filter((res1) => {
            return res1.selector;
          })
          .map((res2) => {
            return res2.title;
          });
        if (arr.length > 0) {
          type.push(arr);
        }
      });
      this.type = type[0]
        ? type[0].map((res) => {
            switch (res) {
              case "图片":
                return 1;
              case "绘本":
                return 2;
              case "游戏":
                return 10;
              case "视频":
                return 9;
              case "活动":
                return 0;
              case "音频":
                return 3;
            }
          })
        : [];
      console.log(this.type);

      this.searchMaterialFun();
    },
    // 分类数据
    getGlobalTagFun() {
      getGlobalTag().then((res) => {
        res.data.forEach((res1) => {
          res1.child.forEach((res2) => {
            res2.selector = false;
          });
        });
        this.selectwrap = res.data;
        // console.log(this.selectwrap);
      });
    },
    // 点击选择
    handleSelect(item1) {
      item1.selector = !item1.selector;
      let index = this.selectcheck.findIndex((res) => {
        return res.title == item1.title;
      });
      console.log(index);
      if (index != -1) {
        this.selectcheck.splice(index, 1);
      } else {
        this.selectcheck.push(item1);
      }
      this.handleData();
    },
    // 点击删除
    handleRemove(index, item) {
      this.selectcheck.splice(index, 1);
      this.selectwrap.forEach((res) => {
        res.child.forEach((res1) => {
          if (res1.title == item.title) {
            res1.selector = false;
          }
        });
      });
      this.handleData();
    },

    // 清空
    handleClear() {
      this.selectcheck = [];
      // this.selectcheck.splice(0, this.selectcheck.length);
      this.selectwrap.forEach((res) => {
        res.child.forEach((res1) => {
          res1.selector = false;
        });
      });
    },
    // 搜索素材
    searchMaterialFun() {
      let params = {
        name: this.name,
        num: 20,
        offset: 0,
        searchKeyword: true,
        tags: this.tags,
        type: this.type,
      };
      searchMaterial(params).then((res) => {
        console.log(res);
        this.sourceList = res.data.list;
      });
    },
    // 详情跳转
    handleRead(citem) {
      localStorage.setItem("readList", JSON.stringify(this.sourceList));
      this.$router.push({
        path: "/materialdetail",
        query: {
          id: citem.contentId,
          type: citem.contentType,
        },
      });
    },
  },
};
</script>

<style lang="less">
.search_detail {
  padding: 32px;
  background: #f5f5fb;
  .select {
    border-radius: 4px;
    .select_list {
      display: flex;
      height: 74px;
      background: #ffffff;
      padding: 0 24px;
      line-height: 74px;
      border-bottom: 1px dashed #bfbfbf;
      &:last-child {
        border-bottom: none;
      }
      .list_title {
        width: 120px;
        color: #6e6d7a;
      }
      .list_content {
        display: flex;
        .class {
          margin-right: 60px;
          color: #6e6d7a;
        }
        .selector {
          color: #bfbfbf;
        }
      }
    }
    .select_box {
      position: relative;
      display: flex;
      height: 74px;
      background: #ffffff;
      padding: 0 24px;
      line-height: 74px;
      .box_title {
        width: 120px;
        color: #6e6d7a;
      }
      .box_content {
        display: flex;
        .box_check {
          height: 44px;
          background: #e5423e;
          box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
          border-radius: 4px;
          line-height: 44px;
          margin-top: 15px;
          text-align: center;
          color: #fff;
          padding: 0 22px;
          margin-right: 40px;
          .el-icon-close {
            margin-left: 10px;
            font-size: 18px;
            cursor: pointer;
          }
        }
      }
      .box_empty {
        position: absolute;
        right: 29px;
        bottom: 15px;
        width: 82px;
        height: 44px;
        background: #f0f2f5;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        line-height: 44px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  .detail {
    .detail_title {
      margin-top: 60px;
      font-size: 18px;
      font-weight: bold;
      span {
        color: #e5423e;
      }
    }
    .source {
      margin-top: 22px;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>