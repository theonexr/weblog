<template>
  <div class="back">
    <star />
    <div class="Nav">
      <div class="photo">
        <img src="../../assets/imgs/logo1.webp" alt="" />
      </div>
      <div
        v-if="isWriteArticle"
        class="WriteArticle"
        @click="dialogFormVisible = true"
      >
        发布
      </div>
      <div v-else class="WriteArticle" @click="WriteArticle">写文章</div>
      <div v-if="Token == null" class="user">
        <img src="../../assets/imgs/99.jpeg" alt="" />
        {{ name }}
        <div @click="GoLogin"><Mybtn class="Out"></Mybtn></div>
      </div>
      <div v-else class="user">
        <img src="../../assets/imgs/77.jpeg" alt="" />
        {{ userInfo.nickname }}
        <div @click="layOut"><Mybtn class="Out"></Mybtn></div>
      </div>
    </div>
    <div class="Tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="首页" name="first">
          <router-view @getForm="ShowForm"></router-view>
        </el-tab-pane>
        <el-tab-pane label="文章分类" name="second">
          <ArticleCategory />
        </el-tab-pane>
        <el-tab-pane label="标签" name="third"></el-tab-pane>
        <el-tab-pane label="文章归档" name="fourth">
          <span>{{ date.year + "年"+ date.month + "月" }}</span>
          <ArchivesList :date="date" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 归档日期 -->
    <div class="date" v-show="activeName==='fourth'">
      <div class="block">
        <span class="demonstration">请选择归档日期</span>
        <el-date-picker v-model="value1" type="month" placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>

    <el-dialog title="摘要 分类 标签" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.summary" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.category"
            value-key="id"
            placeholder="请选择文章分类"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.categoryName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox
              v-for="tag in tagsList"
              :key="tag.id"
              :label="tag.id"
              >{{ tag.tagName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible1()">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import bus from "@/util/bus.js";
import { mapState, mapGetters } from "vuex";
import ArticleCategory from "../../components/category/ArticleCategory.vue";
import ArchivesList from "../../components/ArchivesList";
import star from "../../components/Demo/star.vue";
import Mybtn from "../../components/Demo/Mybtn.vue";
import { AllCategorys, AllTags, PublishArticle } from "@/api";
import { getToken } from "@/util/token";
export default {
  components: { star, Mybtn, ArticleCategory, ArchivesList },
  data() {
    return {
      isWriteArticle: "",
      name: "未登录",
      activeName: "first",
      categoryList: [],
      tagsList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form1: "",
      form: {
        summary: "",
        category: {},
        tags: [],
      },
      formLabelWidth: "120px",
      value1: "",
      date: {
        year: "",
        month: "",
      },
    };
  },
  created() {
    this.GetAllCategorys();
    this.GetAllTags();
    this.ShowForm();
  },
  mounted() {
    const writeArticleRef = this.$refs.writeArticleRef;
  },
  updated() {
    // 路由跳转写文章时切换发布按钮
    this.isWriteArticle = this.$route.path.includes("/writeArticle");
  },
  computed: {
    ...mapState(["List", "user"]),
    Token() {
      return this.user.token;
    },
    userInfo() {
      return this.user.userInfo;
    },
  },
  watch: {
    value1(NewValue, OldValue) {
      // console.log(this.value1.getFullYear(), this.value1.getMonth() + 1);
      this.date.year = this.value1.getFullYear()
      this.date.month = this.value1.getMonth() + 1
    },
    $route(to,from){
      if(to.path=='/article'){
        this.activeName = 'first'
      }
    }
  },
  methods: {
    // 获取子组件表单数据
    ShowForm(val) {
      // console.log(val);
      this.form1 = val;
      // console.log(this.form1);
    },
    handleClick(tab, event) {},
    GoLogin() {
      this.$router.push("/Login");
    },
    layOut() {
      this.$store.dispatch("UserLoginOut1", { AuthorizationL: this.token });
    },
    // 获取所有分类
    GetAllCategorys() {
      AllCategorys().then((res) => {
        // console.log(res.data);
        this.categoryList = res.data;
      });
    },
    // 获取所有标签
    GetAllTags() {
      AllTags().then((res) => {
        this.tagsList = res.data;
      });
    },
    // 发布文章
    WriteArticle() {
      this.activeName = 'first'
      this.$router.push("/writeArticle");
    },
    async dialogFormVisible1() {
      this.dialogFormVisible = false;
      const { summary, category, tags } = this.form;
      const { title, body } = this.form1;
      // 处理tags为json数组
      var a;
      var tagsId = [];
      tags.forEach(function (item, index) {
        a = { id: item };
        tagsId.push(a);
      });
      // console.log(category);
      const data = {
        id: "",
        title: title,
        body: {
          content: body,
          contentHtml: body,
        },
        category: category,
        summary: summary,
        tags: tagsId,
      };
      // await this.$store.dispatch("PublishArticle1",  data );
      PublishArticle(data)
        .then((res) => {
          if ((res.code = 200)) {
            this.$router.push("/Tab");
            this.form.summary = "";
            this.form.category = {};
            this.form.tags = [];
            this.$message({
              type: "success",
              message: "文章发布成功了!",
            });
          }
        })
        .catch((res) => {
          this.$message({
            type: "info",
            message: "哎呀!出了一点问题!",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.back {
  width: 100%;
  height: 100%;
  // overflow-x: hidden;
  // overflow-y: auto;
  background-color: transparent;
  transition: 0.5s;
}
.date {
  position: absolute;
  left: 60px;
  top: 126px;
  width: 230px;
  height: 80px;
  background-color: #fff;
  border-radius: 7px;
  text-align: center;
}
.Nav {
  position: absolute;
  width: 100%;
  height: 110px;
  background: url(../../assets/imgs/header3.webp) no-repeat;
  background-size: 100% 100%;
  // background-attachment: fixed; /* 不设置的话页面滑动时，背景会不铺满*/
  .photo {
    position: absolute;
    background-color: aqua;
    width: 120px;
    height: 60px;
    margin-left: 10px;
    bottom: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .WriteArticle {
    position: absolute;
    background-color: transparent;
    color: #fff;
    text-align: center;
    line-height: 50px;
    width: 100px;
    height: 50px;
    right: 30%;
    bottom: 5px;
    font-size: 16px;
    font-weight: 700;
  }
  .WriteArticle:hover {
    width: 100px;
    height: 50px;
    color: skyblue;
    position: absolute;
    background-color: transparent;
    text-align: center;
    line-height: 50px;
    right: 30%;
    bottom: 5px;
    font-size: 16px;
    font-weight: 700;
  }
  .user {
    position: absolute;
    right: 10%;
    top: 45px;
    width: 120px;
    height: 120px;
    color: #fff;
    font-weight: 800;
    transition: 0.7s;
    z-index: 1;
    img {
      width: 50%;
      height: 50%;
      border-radius: 50%;
    }
    .Out {
      position: absolute;
      bottom: 0px;
      // color: green;
      z-index: 1;
      opacity: 0;
    }
  }
  .user:hover .Out {
    transition: 0.7s;
    opacity: 1;
  }
}
.Tab {
  position: fixed;
  top: 71px;
  height: 100%;
  width: 100%;
  margin-left: 300px;
  // .scrollview,
  // .commentPage {
  //   top: -15px;
  //   height: 1000px;
  // }
}

/deep/.el-tabs__nav-wrap::after {
  width: 0;
}
/deep/.el-tabs__item {
  color: #fff;
  font-weight: 600;
}
/deep/.el-tabs__item:hover {
  color: skyblue;
}
</style>