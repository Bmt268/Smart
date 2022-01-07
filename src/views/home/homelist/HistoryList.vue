<template>
  <div class="history_list">
    <!-- 顶部 -->
    <div class="history_top">历史记录</div>
    <!-- 内容 -->
    <div class="history_content">
      <div class="list_wrap">
        <div class="list_title">一周内</div>
        <div class="list_content">
          <div
            class="list_package"
            v-for="(item, index) in history_week"
            :key="index"
            @click="handleDetail(item)"
          >
            <img
              :src="item.contentType == 3 ? musicimg : item.coverImageUrl"
              alt=""
            />
            <div class="package_title">
              <h3>{{ item.title }}</h3>
              <span>{{ type[item.contentType] }}</span>
            </div>
            <div class="list_intro">
              {{ item.intro }}
            </div>
            <div class="list_delete" @click.stop="handleDelete(item)">删除</div>
          </div>
        </div>
      </div>
      <div class="list_wrap">
        <div class="list_title">更早</div>
        <div class="list_content">
          <div
            class="list_package"
            v-for="(item, index) in history_list"
            :key="index"
            @click="handleDetail(item)"
          >
            <img
              :src="item.contentType == 3 ? musicimg : item.coverImageUrl"
              alt=""
            />
            <div class="package_title">
              <h3>{{ item.title }}</h3>
              <span>{{ type[item.contentType] }}</span>
            </div>
            <div class="list_intro">
              {{ item.intro }}
            </div>
            <div class="list_delete" @click.stop="handleDelete(item)">删除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecentRecords, deleteMaterialRecord } from "@/api/home.js";
export default {
  data() {
    return {
      history_list: [],
      history_week: [],
      type: ["活动", "图片", "绘本", "音乐", "", "", "", "", "游戏", "视频"],
      musicimg: require("@/assets/image/home/music.png"),
    };
  },
  methods: {
    //   获取素材历史浏览
    getRecentRecordsFun() {
      getRecentRecords({ type: 2 }).then((res) => {
        console.log(res);
        this.history_list = res.data.earlierRecords;
        this.history_week = res.data.weekRecords;
      });
    },
    handleDetail(item) {
      localStorage.setItem("readList", JSON.stringify(this.history_list));
      this.$router.push({
        path: "/materialdetail",
        query: {
          id: item.contentId,
          type: item.contentType,
          specialId: item.special_id,
        },
      });
    },
    // 删除
    handleDelete(item) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMaterialRecord({ id: item.id }).then((res) => {
            console.log(res);
            this.getRecentRecordsFun();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getRecentRecordsFun();
  },
};
</script>

<style lang="less">
.history_list {
  .history_top {
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: #0d0b22;
    font-size: 18px;
    padding-left: 35px;
    background: #ffffff;
  }
  .history_content {
    width: 100%;
    background: #f5f5fb;
    padding: 32px;
    box-shadow: 0px 3px 12px 0px rgba(28, 25, 24, 0.1);

    .list_wrap {
      width: 100%;
      background: #ffffff;
      border-radius: 4px;
      .list_title {
        padding-top: 34px;
        margin-left: 48px;
        font-size: 18px;
      }
      .list_content {
        display: flex;
        flex-wrap: wrap;
        .list_package {
          position: relative;
          width: 312px;
          height: 404px;
          background: #ffffff;
          box-shadow: 0px 3px 12px 0px rgba(28, 25, 24, 0.1);
          border-radius: 4px;
          margin-top: 42px;
          margin-left: 48px;
          img {
            width: 312px;
            height: 234px;
            object-fit: contain;
            display: block;
            cursor: pointer;
          }
          .package_title {
            display: flex;
            margin-top: 23px;
            margin-left: 22px;
            margin-right: 22px;
            justify-content: space-between;

            h3 {
              width: 200px;
              font-size: 18px;
              color: #0d0b22;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            span {
              font-size: 16px;
              color: #6e6d7a;
            }
          }
          .list_intro {
            margin: 9px 22px 18px 20px;
            font-size: 16px;
            color: #6e6d7a;
            letter-spacing: 0.8px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-clamp: 2;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .list_delete {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 52px;
            text-align: center;
            line-height: 52px;
            color: #e5423e;
            font-size: 16px;
            border-top: 2px solid #eeeeee;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>