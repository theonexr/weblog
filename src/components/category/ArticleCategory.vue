<template>
  <div>
    <div class="categoryTab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="文章分类" name="first">
          <div class="fat">
            <div
              class="detailList"
              v-for="detail in detailList"
              :key="detail.id"
              @click="GoCategorysList(detail)"
            >
              <p>{{ detail.avatar }}</p>
              <p>{{ detail.categoryName }}</p>
              <p>{{ detail.description }}</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="标签" name="second">
          <div class="fat">
            <div
              class="detailList"
              v-for="TabTag in TabTagsList"
              :key="TabTag.id"
              @click="GoTabTagsList(TabTag)"
            >
              <p>{{}}</p>
              <p>{{ TabTag.avatar }}</p>
              <p>{{ TabTag.tagName }}</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { AllDetail, TabTags } from "@/api";
export default {
  data() {
    return {
      activeName: "first",
      detailList: [],
      TabTagsList: [],
    };
  },
  created() {
    this.GetCategoryList();
    this.GetTabTags();
  },
  methods: {
    // 获取文章分类列表
    GetCategoryList() {
      AllDetail().then((res) => {
        this.detailList = res.data;
        // console.log(this.detailList);
      });
    },
    // 获取标签分类列表
    GetTabTags() {
      TabTags().then((res) => {
        this.TabTagsList = res.data;
        // console.log(this.TabTagsList);
      });
    },
    // 跳转分类文章页面
    GoCategorysList(detail) {
      const id = detail.id;
      const activeName = this.activeName;
      this.$router.push({
        name: "ArticleList",
        params: { id: id, activeName: activeName },
      });
      // CategorysDetail(id)
      // .then((res)=>{
      //   console.log(res);
      // })
    },
    // 跳转标签文章页面
    GoTabTagsList(TabTag) {
      const id = TabTag.id;
      const activeName = this.activeName;
      this.$router.push({
        name: "ArticleList",
        params: { id: id, activeName: activeName },
      });
    },
    handleClick() {},
  },
};
</script>

<style lang="less" scoped>
.categoryTab {
  width: 900px;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.2);
  .fat {
    display: flex;
    flex-wrap: wrap;
    .detailList {
      width: 200px;
      height: 200px;
      background-color: #fff;
      margin: 12px;
      text-align: center;
      p {
        margin-top: 25px;
      }
      p:nth-child(1) {
        position: relative;
        line-height: 50px;
        width: 50px;
        height: 50px;
        background-color: skyblue;
        left: 75px;
      }
      p:nth-child(2) {
        font-size: 19px;
        font-weight: 600;
      }
      p:nth-child(3) {
        font-size: 13px;
      }
    }
  }
}
</style>