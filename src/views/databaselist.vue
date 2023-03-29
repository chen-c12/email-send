<template>
  <div>
    <div class="cen">数据管理中心</div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border=""
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="id" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱名" width="250" align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        show-overflow-tooltip
        width="200"
        align="center"
      >
      </el-table-column>
      <!-- 操作 -->
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delemail(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagebtn">
      <div>
        <el-pagination
          :page-sizes="[5, 4, 3, 2, 1]"
          :pageSize="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
        >
        </el-pagination>
      </div>
      <div>
        <el-button @click="delselemail" type="danger">删除选中的</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  databaseshowpage,
  delemailbyid,
  delemailsel,
  databaseshow
} from "../api/datashow.js";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      total: null,
      pageSize: 5,
      pagenum: 1,
      selemails: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
      this.selemails = [];
      val.forEach((element) => {
        this.selemails.push(element.id);
      });
      // this.selemails = val;
    },
    //删除选择的邮箱
    delselemail() {
      console.log(this.selemails);
      // let ids = JSON.stringify(this.selemails);
      // console.log(ids);
      // const ids = { ...this.selemails };
      if (this.selemails == "") {
        this.$message({
          message: "请选择邮箱",
          type: "warning",
        });
      } else {
        delemailsel(this.selemails).then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            databaseshowpage(this.pagenum, this.pageSize).then((res) => {
              this.total = res.data.total;
              this.tableData = res.data.records;
            });
          } else {
            this.$message({
              message: "删除失败",
              type: "warning",
            });
          }
        });
      }
    },

    // 删除单条的
    delemail(row) {
      console.log(row.id);
      console.log(typeof row.id);
      delemailbyid(row.id).then((res) => {
        console.log(res);
        databaseshowpage(this.pagenum, this.pageSize).then((res) => {
          this.total = res.data.total;
          this.tableData = res.data.records;
        });
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          databaseshowpage(this.pagenum, this.pageSize).then((res) => {
            this.total = res.data.total;
            this.tableData = res.data.records;
          });
        } else {
          this.$message({
            message: "删除失败",
            type: "warning",
          });
        }
      });
    },
    // 每页格式改变时
    handleSizeChange(val) {
      this.pageSize = val;
      databaseshowpage(this.pagenum, this.pageSize).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.records;
      });
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.pagenum = val;
      databaseshowpage(this.pagenum, this.pageSize).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.records;
      });
    },
  },
  mounted() {
    // databaseshowpage(this.pagenum, this.pageSize).then((res) => {
    //   // console.log("分");
    //   // console.log(res);
    //   this.total = res.data.total;
    //   this.tableData = res.data.records;
    // });
    databaseshow().then((res)=>{
      console.log(res.token);
    })
  },
};
</script>

<style>
.cen {
  margin-left: 460px;
  font-size: 30px;
}
.pagebtn {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

</style>