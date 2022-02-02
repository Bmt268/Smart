<template>
  <div class="notes">
    <div class="notes_content">
      <el-table
        :data="noteslist"
        style="width: 100%"
        :header-cell-style="headstyle"
        row-class-name="class_options"
      >
        <el-table-column type="index" label="排序" width="100">
        </el-table-column>
        <el-table-column prop="date" label="时间"> </el-table-column>
        <el-table-column label="课堂笔记">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.url"
              :preview-src-list="[scope.row.url]"
            >
            </el-image>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="handleclick(scope)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="handleEdit(scope)"
                  >查看</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getClassRoomRecords, deleteRecordApi } from "@/api/home.js";
export default {
  data() {
    return {
      noteslist: [],
      headstyle: {
        background: "#F7F7F9",
        height: "74px",
        fontSize: "14px",
        color: "#0D0B22",
        textAlign: "center",
      },
      roomid: "",
    };
  },
  mounted() {
    this.roomid = localStorage.getItem("roomid");
    this.getClassRoomRecordsFun();
  },
  methods: {
    getClassRoomRecordsFun() {
      getClassRoomRecords({ roomId: this.roomid }).then((res) => {
        this.noteslist = res.data;
      });
    },
    // 点击删除
    handleclick(scope) {
      deleteRecordApi({ id: scope.row.id }).then((res) => {
        if (res.code != 200) {
          this.$message("无法删除");
        } else {
          this.$message("删除成功");
          this.getClassRoomRecordsFun();
        }
      });
    },
  },
};
</script>

<style lang="less">
.notes {
  .notes_content {
    .class_options td {
      height: 74px;
      background: #fff;
      text-align: center;
      line-height: 74px;
      padding: 0 24px;
    }
    .el-icon-more {
      cursor: pointer;
      color: #e5423e;
    }
    .el-dropdown-menu {
      text-align: center;
    }
    .el-button--text {
      color: #797471;
      text-align: center;
    }
    .el-table .cell {
      line-height: 30px !important;
    }
  }
}
</style>