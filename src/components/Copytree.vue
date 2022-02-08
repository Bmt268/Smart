<template>
  <div class="copy_tree">
    <div class="modify_content">
      <div class="conten_top">
        <div class="new_build">选择素材</div>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <div class="file_tree">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node }">
            <img :src="publicimg" alt="" />
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
      <div class="btn">
        <div class="cancel" @click="handleClose">取消</div>
        <div class="makesure" @click="handleOpen">打开</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCateGoryTree, copyCourseware } from "@/api/home.js";
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dataid: "",
      publicimg: require("@/assets/image/publicFolder.png"),
    };
  },
  props: {
    citem: {
      type: Object,
    },
  },
  mounted() {
    this.getCateGoryTreeFun();
  },
  methods: {
    handleClose() {
      this.$emit("clickClose");
    },
    getCateGoryTreeFun() {
      getCateGoryTree().then((res) => {
        this.data = res.data;
      });
    },
    copyCoursewareFun() {
      copyCourseware({ categoryId: this.dataid, id: this.citem.id }).then(
        (res) => {
          console.log(res);
        }
      );
    },
    handleOpen() {
      this.copyCoursewareFun();
      this.handleClose();
    },
    handleNodeClick(data) {
      this.dataid = data.id;
    },
  },
};
</script>

<style lang="less">
.copy_tree {
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
    height: 525px;
    background: #ffffff;
    box-shadow: 0px 3px 12px 0px rgba(28, 25, 24, 0.3);
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
    .file_tree {
      height: 360px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 0;
      }
      .el-tree {
        color: #0d0b22;
        font-size: 18px;
        .el-tree-node__expand-icon {
          color: #0d0b22;
          font-size: 22px;
        }
        .custom-tree-node {
          img {
            width: 40px;
            height: 40px;
            object-fit: cover;
            margin-right: 33px;
          }
        }
        .el-tree-node__content {
          height: 80px;
          .custom-tree-node {
            display: flex;
            align-items: center;
          }
        }
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 84px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      .cancel {
        width: 82px;
        height: 44px;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        border: 1px solid #bfbfbf;
        margin-right: 80px;
        color: #0d0b22;
        font-size: 18px;
        text-align: center;
        line-height: 44px;
        cursor: pointer;
      }
      .makesure {
        width: 82px;
        height: 44px;
        background: #e5423e;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        text-align: center;
        line-height: 44px;
        font-size: 18px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>