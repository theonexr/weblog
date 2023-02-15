<template>
  <div class="TaoWa">
    <div class="scrollview">
      <ul>
        <li
          v-for="article in HomeList"
          :key="article.id"
          @click="LookArticle(article)"
        >
          <span class="span1">{{ article.title }}</span
          ><br />
          <span class="span2">{{ article.summary }}</span>
          <span class="span3"
            ><i class="el-icon-view"></i>{{ article.viewCounts }}</span
          >
          <div>
            <div class="Tag1">{{ article.author }}</div>
            <div class="Tag2" v-for="tag in article.tags" :key="tag.id">{{ tag.tagName }}</div>
            <div class="Tag3">{{ article.createDate }}</div>
          </div>
        </li>
      </ul>
      <div class="right">
        <div class="synopsis"></div>
        <div :class="{ hotSpan: currentActive, change: !currentActive }">
          <h3>最热标签</h3>
          <h4 v-if="currentActive" @click="currentActive = !currentActive">
            收起
          </h4>
          <h4 v-else @click="currentActive = !currentActive">查看全部</h4>
          <hr />
          <div v-for="span in HotList" :key="span.id">
            <span>{{ span.tagName }}</span>
          </div>
        </div>
        <div class="hotArt">
          <h3>最热文章</h3>
          <hr />
          <div v-for="HotArtic in HotArticleList" :key="HotArtic.id">
            <span>{{ HotArtic.title }}</span>
          </div>
        </div>
        <div class="Art">
          <h3>文章归档</h3>
          <hr />
          <div v-for="Archives in ListArchivesList" :key="Archives.id">
            <span>{{
              Archives.year +
              "年" +
              Archives.month +
              "月" +
              Archives.count +
              "日"
            }}</span>
          </div>
        </div>
        <div class="NewArt">
          <h3>最新文章</h3>
          <hr />
          <div v-for="New in NewArticleList" :key="New.id">
            <span>{{ New.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";
import { getToken } from "@/util/token";
export default {
  data() {
    return {
      currentActive: false,
      currentPage4: 1,
      pageList: {
        page: "1",
        pageSize: "10",
      },
    };
  },
  computed: {
    ...mapState(["List", "user"]),
    HomeList() {
      return this.List.HomeList;
    },
    HotList() {
      return this.List.SpanList;
    },
    HotArticleList() {
      return this.List.HotArticleList;
    },
    NewArticleList() {
      return this.List.NewArticleList;
    },
    ListArchivesList() {
      return this.List.ListArchivesList;
    },
    Token() {
      return this.user.token;
    },
  },
  created() {
    this.$store.dispatch("GetHomeList", this.pageList);
    this.$store.dispatch("GetHotSpan");
    this.$store.dispatch("GetHotArticle");
    this.$store.dispatch("GetNewArticle");
    this.$store.dispatch("GetListArtchives");
  },
  watch: {
    // 监听页码变化，切换分页
    "pageList.page"(NewValue, OldValue) {
      // console.log(NewValue);
      this.$store.dispatch("GetHomeList", this.pageList);
    },
    // 监听分页数据量变化
    "pageList.pageSize"(NewValue, OldValue) {
      // console.log(NewValue);
      this.$store.dispatch("GetHomeList", this.pageList);
    },
  },
  methods: {
    LookArticle(article) {
      var id = article.id
      this.$router.push({ path: "/article", query: { id: id } });
    },
    handleSizeChange(val) {
      this.pageList.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageList.page = val;
    },
  },
};
</script>

<style lang="less" scoped>
.TaoWa {
  position: relative;
  height: 600px;
}
.scrollview {
  top: -15px;
  position: relative;
  overflow-y: scroll;
  height: 550px;
}
ul {
  li {
    position: relative;
    list-style: none;
    border-radius: 15px;
    background: url(../../assets/imgs/小清心.webp) no-repeat;
    width: 600px;
    height: 100px;
    right: 40px;
    box-shadow: 3px 3px 3px rgb(131, 130, 130);
    margin-bottom: 20px;
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
      left:510px;
    }
    div {
      // position: absolute;
      // right: 20px;
      // font-size: 13px;
      // margin-top: 53px;
      position: relative;
      display: flex;
      // justify-content: space-between;
      margin-top: 30px;
      z-index: 1;
      .Tag1 {
        position: absolute;
        left: 20px;
      }
      .Tag2 {
        position: relative;
        margin-left: 10px;
        left: 80px;
        color: rgb(104, 194, 59);
        border-radius: 12px;
        border: 1px solid rgb(221, 241, 210);
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
.right {
  position: absolute;
  top: 18px;
  left: 620px;
  height: 1200px;
  width: 300px;
  margin-bottom: 10px;
  text-align: center;
  // background-color: rgb(255, 255, 255);
  // box-shadow: 2px 3px 3px rgb(172, 172, 172);
  .synopsis {
    position: relative;
    height: 170px;
    width: 300px;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 3px 3px rgb(172, 172, 172);
    border-radius: 15px;
    margin-bottom: 10px;
  }
  .hotSpan {
    border-radius: 15px;
    height: 160px;
    width: 300px;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 3px 3px rgb(172, 172, 172);
    position: relative;
    transition: 0.7s;
    h3 {
      position: absolute;
      font-size: 19px;
      font-weight: 800;
      left: 17px;
      top: 10px;
    }
    h4 {
      width: 80px;
      color: rgb(120, 182, 247);
      position: absolute;
      top: 10px;
      right: 15px;
    }
    hr {
      position: absolute;
      top: 50px;
      width: 96%;
      color: rgb(236, 239, 246);
      left: 2%;
    }
    div {
      position: relative;
      top: 75px;
      span {
        float: left;
        color: rgb(204, 233, 213);
        border: 1px solid rgb(194, 228, 203);
        border-radius: 9px;
        background-color: rgb(239, 248, 242);
        padding: 3px;
        margin-bottom: 7px;
        margin-left: 20px;
        transition: 0.3s;
        opacity: 1;
      }
    }
  }
  h4:hover {
    border: 1px solid rgb(120, 182, 247);
    border-radius: 8px;
  }
  .change {
    height: 70px;
    width: 300px;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 3px 3px rgb(172, 172, 172);
    position: relative;
    transition: 0.7s;
    h3 {
      position: absolute;
      font-size: 19px;
      font-weight: 800;
      left: 17px;
      top: 10px;
    }
    h4 {
      width: 80px;
      color: rgb(120, 182, 247);
      position: absolute;
      top: 10px;
      right: 15px;
    }
    hr {
      position: absolute;
      top: 50px;
      width: 96%;
      color: rgb(236, 239, 246);
      left: 2%;
    }
    div {
      position: relative;
      top: 75px;
      span {
        position: absolute;
        float: left;
        color: rgb(204, 233, 213);
        border: 1px solid rgb(194, 228, 203);
        border-radius: 9px;
        background-color: rgb(239, 248, 242);
        padding: 3px;
        margin-left: 20px;
        transition: 0.3s;
        opacity: 0;
      }
    }
  }
  // #box:target .hotSpan {
  //   height: 100px;
  //   width: 300px;
  //   background-color: rgb(255, 255, 255);
  //   box-shadow: 2px 3px 3px rgb(172, 172, 172);
  //   margin-bottom: 10px;
  // }
  .Art,
  .NewArt,
  .hotArt {
    width: 300px;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 3px 3px rgb(172, 172, 172);
    h3 {
      position: relative;
      font-size: 19px;
      font-weight: 800;
      left: -89px;
      top: 16px;
    }
    hr {
      width: 96%;
      color: rgb(236, 239, 246);
      left: 2%;
    }
    div {
      span {
        color: rgb(95, 184, 120);
        position: relative;
        left: -90px;
      }
    }
  }
  // .NewArt {
  //   width: 300px;
  //   background-color: rgb(255, 255, 255);
  //   box-shadow: 2px 3px 3px rgb(172, 172, 172);
  // }
  .Art span {
    margin-left: 60px;
    font-size: 14px;
    word-break: normal;
  }
}
.footer {
  border: 1px solid rgb(206, 223, 226);
  border-radius: 4px;
  position: absolute;
  background: linear-gradient(to right, rgb(233, 172, 172), rgb(138, 138, 211));
  left: 0;
}
</style>