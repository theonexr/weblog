<template>
  <div class="Body">
    <ul>
      <li v-for="archives in archivesList" :key="archives.id" @click="GoArticle(archives)">
        <span class="span1">{{ archives.title }}</span
        ><br />
        <span class="span2">{{ archives.summary }}</span>
        <span class="span3"
          ><i class="el-icon-view"></i>{{ archives.viewCounts }}</span
        >
        <div>
          <div class="Tag1">{{ archives.author }}</div>
          <div class="Tag2" v-for="tag in archives.tags" :key="tag.id">
            {{ tag.tagName }}
          </div>
          <div class="Tag3">{{ archives.createDate }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ArchivesList } from "@/api";
export default {
    props:['date'],
  data() {
    return {
      archivesList: [],
      date1: {
        year: "",
        month: "",
      },
    };
  },
  created() {
    this.date1 = this.date
    this.GetArchivesList();
  },
  watch:{
    "date1.year"(){
        this.GetArchivesList();
    },
    "date1.month"(){
        this.GetArchivesList();
    }
  },
  methods: {
    // 获取文章归档列表
    GetArchivesList() {
      var date1 = this.date1;
      ArchivesList(date1).then((res) => {
        console.log(res);
        this.archivesList = res.data;
      });
    },
    // 前往文章列表
    GoArticle(archives){
        var id = archives.id
        this.$router.push({ path: "/article", query: { id: id } })
    }
  },
};
</script>

<style lang="less" scoped>
// 可滚动，隐藏滚动条
.Body::-webkit-scrollbar {
  display: none;
}
.Body {
  position: relative;
  top: 30px;
  width: 900px;
  height: 570px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.2);
  //   .date {
  //     position: absolute;
  //     width: 150px;
  //     height: 250px;
  //     background-color: white;
  //     left: -10px;
  //   }

  ul {
    li {
      list-style: none;
      position: relative;
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
}
</style>