<template>
  <div class="background">
    <header>
      <div class="fat">
        <div v-if="activeName==='first'" class="detailList">
          <p>{{ Category.avatar }}</p>
          <p>{{ Category.categoryName }}</p>
          <p>{{ Category.description }}</p>
        </div>
        <div v-else class="detailList">
          <p>{{ Category.avatar }}</p>
          <p>{{ Category.tagName }}</p>
          <p> 标签 </p>
        </div>
      </div>
    </header>
    <nav></nav>
    <main>
      <div
        class="card"
        v-for="category in categoryList"
        :key="category.id"
        @click="LookArticle(category)"
      >
        <span class="span1">{{ category.title }}</span
        ><br />
        <span class="span2">{{ category.summary }}</span>
        <span class="span3"
          ><i class="el-icon-view"></i>{{ category.viewCounts }}</span
        >
        <div>
          <div class="Tag1">{{ category.author }}</div>
          <div class="Tag2" v-for="tag in category.tags" :key="tag.id">{{ tag.tagName }}</div>
          <div class="Tag3">{{ category.createDate }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { CategorysDetail, HomeList, TagList } from "@/api";
export default {
  name: "ArticleList",
  data() {
    return {
      id: "",
      Category: {},
      activeName:"",
      pageList: {
        page: "1",
        pageSize: "10",
        categoryId: "",
        tagId: "",
      },
      categoryList: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.activeName = this.$route.params.activeName;

    if (this.activeName === "first") {
      this.pageList.CategoryId = this.$route.params.id;
      this.GetCategorysDetail();
    } else {
      this.pageList.tagId = this.$route.params.id;
      this.GetTagList();
    }
    this.GetHomeList();
  },
  methods: {
    // 文章分类列表头部
    GetCategorysDetail() {
      var id = this.id;
      CategorysDetail(id).then((res) => {
        this.Category = res.data;
      });
    },
    // 获取文章分类列表
    GetHomeList() {
      var data = this.pageList;
      HomeList(data).then((res) => {
        this.categoryList = res.data;
      });
    },
    // 获取标签列表头部
    GetTagList() {
      var id = this.id;
      TagList(id).then((res) => {
        this.Category = res.data;
      });
    },
    // 获取标签文章列表

    // 查看文章内容
    LookArticle(category) {
      this.$router.push({ path: "/article", query: { id: category.id } });
    },
  },
};
</script>

<style lang="less" scoped>
.background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(245, 245, 245);
}
header {
  width: 100%;
  height: 200px;
  background-color: rgb(255, 255, 255);
  position: fixed;
}
.fat {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 641px;
  .detailList {
    width: 200px;
    height: 180px;
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

main {
  position: relative;
  height: 500px;
  overflow-y: auto;
  top: 210px;
  .card {
    position: relative;
    left: 350px;
    width: 800px;
    height: 120px;
    background-color: #fff;
    margin-top: 12px;
    box-shadow: 1px 1px 1px rgb(174, 174, 174);
    // background: url(../../assets/imgs/小清心.webp) no-repeat;
    .span1 {
      font-weight: 1000;
      margin-top: 10px;
      position: absolute;
      left: 20px;
    }
    .span2 {
      position: absolute;
      margin-top: 20px;
      left: 20px;
    }
    .span3 {
      position: absolute;
      left: 700px;
    }
    div {
      position: relative;
      display: flex;
      margin-top: 30px;
      z-index: 1;
      .Tag1 {
        position: absolute;
        left: 20px;
        font-size: 14px;
        color: rgb(172, 172, 172);
      }
      .Tag2 {
        position: relative;
        left: 80px;
        margin-left: 10px;
        color: rgb(104, 194, 59);
        border-radius: 12px;
        border: 1px solid rgb(145, 226, 102);
      }
      .Tag3 {
        position: absolute;
        font-weight: 13px;
        color: rgb(172, 172, 172);
        right: 20px;
      }
    }
  }
}
</style>