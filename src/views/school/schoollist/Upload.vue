<template>
  <div class="upload">
    <div class="upload_content">
      <div class="content_top">
        <div class="new_build">导入课件资源(建议小于100M)</div>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <div class="file_tree">
        <div class="file_title">
          已选资源 (<span>{{ courselist.length }}</span
          >/5)
        </div>
        <div
          class="file_content"
          v-for="(item, index) in courselist"
          :key="item.uid"
        >
          <div class="file_num">
            <div class="numbers">0{{ index + 1 }}</div>
            <i class="el-icon-circle-close" @click="handleDelete(index)"></i>
          </div>
          <div class="file_name">
            <div class="course_name">课件名称:</div>
            <input type="text" v-model="item.filename" />
          </div>
          <div class="file_label">
            <div class="course_name">课件标签:</div>
            <input type="text" v-model="item.label" />
          </div>
          <div class="file_brief">
            <div class="course_name">课件简介:</div>
            <textarea
              placeholder="请输入该课件简介~"
              v-model="item.intro"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-upload
          class="upload-demo"
          action="#"
          :http-request="httpRequest"
          multiple
          :limit="5"
          :file-list="courselist"
          :show-file-list="false"
        >
          <div class="cancel">继续添加</div>
        </el-upload>
        <div class="makesure" @click="handleImport">开始导入</div>
      </div>
    </div>
  </div>
</template>

<script>
import uploadSource from "@/common/alioss.js";
import { batchUploadSource } from "@/api/home.js";
export default {
  data() {
    return {};
  },
  props: {
    courselist: {
      type: Array,
    },
    parentId: {
      type: [String, Number],
    },
  },
  methods: {
    handleClose() {
      this.$emit("clickClose");
    },
    handleDelete(index) {
      this.$store.commit("deletelist", index);
    },
    getType(name) {
      console.log(this.courselist);
      let typelist = [
        { name: "image/jpeg", type: 4 },
        { name: "video/mp4", type: 0 },
        { name: "image/png", type: 4 },
        { name: "image/gif", type: 4 },
      ];
      let obj = typelist.filter((item) => {
        return item.name == name;
      });
      console.log(obj);
      return obj[0].type;
    },
    // 上传到阿里云
    handleImport() {
      if (this.courselist.length == 0) {
        this.$message({
          type: "warning",
          message: "请上传至少一个文件",
        });
        return;
      } else if (this.courselist.length > 5) {
        this.$message({
          type: "warning",
          message: "最多上传五个文件",
        });
        return;
      }
      this.$parent.course = false;
      this.$emit("uploadList");
      let filelist = this.courselist.map((item) => {
        return {
          fileName: item.filename.split(".")[0],
          fileSize: item.size,
          intro: item.intro,
          label: item.label,
          name: item.filename,
          overrun: false,
          type: this.getType(item.type),
          uploadStatu: item.status,
        };
      });
      uploadSource(this.courselist, this).then((res) => {
        filelist.forEach((item, index) => {
          item.fileUrl = res[index].res.requestUrls[0].split("?")[0];
        });
        this.batchUploadSourceFun(filelist);

        console.log(filelist);
      });
    },
    // 阿里云服务器和后端衔接
    batchUploadSourceFun(res) {
      batchUploadSource({
        categoryId: this.parentId,
        fileList: res,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$emit("autoClose");
        }
      });
    },
    httpRequest(res) {
      let list = [];
      list.push(res.file);
      list.forEach((item) => {
        item.intro = "";
        item.label = "";
        item.filename = item.name;
        item.status = "loading";
      });
      this.$store.commit("changelist", list);
    },
  },
};
</script>

<style lang="less">
.upload {
  background: #333333;
  background: rgba(51, 51, 51, 0.6);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  .upload_content {
    width: 700px;
    height: 730px;
    background: #ffffff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 40px;
    .content_top {
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
      height: 525px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0;
      }
      .file_title {
        margin-top: 30px;
        color: #0d0b22;
        font-size: 20px;
        span {
          color: #e5423e;
        }
      }
      .file_content {
        width: 620px;
        height: 348px;
        background: #f6f6f6;
        margin-top: 30px;
        overflow: hidden;
        padding: 0 30px;
        .file_num {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          align-items: center;

          font-size: 20px;
          .el-icon-circle-close {
            color: #6e6d7a;
          }
        }
        .file_name {
          display: flex;
          margin-top: 20px;
          .course_name {
            color: #6e6d7a;
            font-size: 18px;
            margin-right: 20px;
          }
          input {
            width: 431px;
            border-bottom: 1px solid #bfbfbf;
            background: none;
            font-size: 18px;
            padding-bottom: 8px;
          }
        }
        .file_label {
          display: flex;
          margin-top: 43px;
          .course_name {
            color: #6e6d7a;
            font-size: 18px;
            margin-right: 20px;
          }
          input {
            width: 431px;
            border-bottom: 1px solid #bfbfbf;
            background: none;
            font-size: 18px;
            padding-bottom: 8px;
          }
        }
        .file_brief {
          display: flex;
          margin-top: 43px;
          .course_name {
            color: #6e6d7a;
            font-size: 18px;
            margin-right: 20px;
          }
          textarea {
            width: 431px;
            height: 110px;
            box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
            border-radius: 4px;
            border: 1px solid #bfbfbf;
            background: none;
            font-size: 18px;
            padding: 12px;
            box-sizing: border-box;
          }
        }
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 124px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      .cancel {
        width: 120px;
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
        width: 120px;
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