<template>
  <div class="commentPage">
    <div class="Article">
      <h1>{{ articleList.title }}</h1>
      <div class="photo"><img src="../../assets/imgs/77.jpeg" alt="" /></div>
      <div class="userInfo">
        <div class="author">{{ articleList.author }}</div>
        <div class="createDate">
          <div>{{ articleList.createDate }}</div>
          <div>阅读{{ articleList.viewCounts }}</div>
          <div>评论{{ articleList.weight }}</div>
        </div>
      </div>
      <!-- 文本 -->
      <div class="content" v-html="content" ref="articleContent"></div>
    </div>
    <div class="span">
      <div class="float">
        <div>标签:</div>
        <div class="tag" v-for="tag in articleList.tags" :key="tag.id">
          {{ tag.tagName }}
        </div>
      </div>
      <br />
      <div>文章分类:{{ categoryName }}</div>
    </div>
    <div class="comment">
      <div>
        <img src="../../assets/imgs/77.jpeg" alt="" />
        <input
          type="text"
          v-model="value"
          ref="inputRef"
          placeholder="你的评论..."
          maxlength="50"
        />
        <input type="button" value="评论" @click="CommentArticle()" />
      </div>
    </div>
    <div class="commitList">
      <h1>{{ commitList.length }}条评论</h1>
      <div v-for="commit in commitList" :key="commit.id">
        <div class="users">
          <img src="../../assets/imgs/77.jpeg" alt="" />
          <div class="userInfo">
            <div class="author" ref="aut">{{ commit.author.nickname }}</div>
            <div class="createDate">
              <div>{{ commit.createDate }}</div>
            </div>
            <div class="replay" @click="CommentOthers(commit)">
              <span>回复</span>
            </div>
          </div>
        </div>
        <div class="content1">{{ commit.content }}</div>
        <div class="reqList" v-if="commit.childrens != ''">
          <ul>
            <li v-for="rep in commit.childrens" :key="rep.id">
              <!-- @click="CommentOthers(rep)" -->
              <span
                >{{ rep.author.nickname }}:
                <span v-show="commit.author.nickname !== rep.toUser.nickname"
                  >@{{ rep.toUser.nickname }}</span
                >
              </span>
              {{ rep.content }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CommentList } from "@/api";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: "",
      value: "",
      parentId1: "",
      toUserId1: "",
      commitList: [],
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["body", "category"]),
    articleList() {
      return this.user.articleList;
    },
    content() {
      return this.body.content || [];
    },
    // CommentList() {
    //   return this.user.CommentList;
    // },
    // ChildrenLength(){
    //   return this.CommentList[0].childrens.length
    // }
    categoryName() {
      return this.category.categoryName || [];
    },
  },
  watch: {
    // CommentList(NewValue, OldValue) {
    //   this.commitList = NewValue;
    // },
  },
  created() {
    this.id = this.$route.query.id;
    // 获取文章详情
    this.$store.dispatch("GetArticleList", this.id);
    this.GetCommentList();
  },
  mounted() {
    this.ContentImg();
  },
  methods: {
    // 获取评论列表
    GetCommentList() {
      const id = this.id;
      CommentList(id).then((res) => {
        this.commitList = res.data;
      });
    },
    // 点击评论文章
    CommentArticle() {
      if (this.value != "") {
        const data = {
          articleId: this.$route.query.id, //文章id
          content: this.value, //评论内容
          parentId: this.parentId1, //父评论id
          toUserId: this.toUserId1, //被评论用户id
        };

        this.$store.dispatch("GetCommentCreate", data);
        this.value = "";
        this.parentId1 = "";
        this.$nextTick(() => {
          this.$refs.inputRef.placeholder = "你的评论...";
          this.$store.dispatch("GetCommentList", this.id);
          this.GetCommentList();
        });
      } else {
      }
    },
    //点击后评论别人/子评论
    CommentOthers(commit) {
      // this.toUserId1 = commit.id;
      this.$nextTick(() => {
        this.$refs.inputRef.focus();
        this.$refs.inputRef.placeholder = `@${commit.author.nickname}`;
      });
      if (commit.level == 1) {
        this.parentId1 = commit.id;
        console.log(commit.author.id);
        this.toUserId1 = `${commit.author.id}`;
      } else {
        this.parentId1 = "";
      }
    },
    // 文本图片处理
    ContentImg() {
      const articleContent = this.$refs.articleContent;
      const imgs = articleContent.querySelectorAll("img");
    },
  },
};
</script>

<style lang="less" scoped>
.commentPage {
  height: 580px;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
}
.Article {
  position: relative;
  left: 45px;
  width: 750px;
  height: 400px;
  background-color: #fff;
  border-radius: 7px;
  h1 {
    position: absolute;
    left: 18px;
  }
  .photo {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: transparent;
    left: 30px;
    top: 80px;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .userInfo {
    position: absolute;
    height: 50px;
    width: 730px;
    background-color: transparent;
    top: 80px;
    left: 100px;
    .author {
      position: absolute;
      font-weight: 700;
    }
    .createDate {
      position: absolute;
      top: 32px;
      display: flex;
      color: rgb(188, 188, 188);
      font-size: 13px;
    }
  }
  .content {
    position: absolute;
    width: 744px;
    left: 4px;
    height: 257px;
    background-color: #fff;
    top: 140px;
    box-shadow: 2px 2px 2px rgb(219, 218, 218), 2px -1px 2px rgb(224, 221, 221),
      -2px -1px 2px rgb(232, 230, 230);
    text-align: start;
    word-wrap: break-word;
    word-break: normal;
    /deep/ p img {
      width: 20px;
      height: 20px;
      transition: 0.5s;
    }
    /deep/ p img:active {
      width: 600px;
      height: 250px;
      transition: 0;
    }
  }
}
.span {
  position: relative;
  left: 50px;
  .float {
    display: flex;
    margin-top: 5px;
    .tag {
      width: 50px;
      margin-left: 10px;
      text-align: center;
      border: 1px solid rgb(163, 252, 169);
      border-radius: 5px;
    }
  }
}
.comment {
  position: relative;
  width: 730px;
  height: 110px;
  background-color: #fff;
  border-radius: 8px;
  line-height: 80px;
  left: 45px;
  padding-left: 20px;

  img {
    margin-top: 15px;
    margin-right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  input[type="text"] {
    position: absolute;
    border-radius: 8px;
    border-color: rgb(228, 231, 236);
    top: 15px;
    width: 600px;
    height: 50px;
    text-align: start;
    word-wrap: break-word;
    word-break: normal;
  }
  input[type="button"] {
    position: absolute;
    bottom: 5px;
    right: 50px;
    color: #5be772;
    border: 1px solid #5be772;
    border-radius: 6px;
    background-color: transparent;
  }
  input[type="button"]:hover {
    position: absolute;
    bottom: 5px;
    right: 50px;
    font-weight: 600;
    color: #5be772;
    border: 1px solid #5be772;
    border-radius: 6px;
    background-color: transparent;
    box-shadow: 1px 1px 1px #5be772;
  }
}
// 可滚动，隐藏滚动条
// .Article::-webkit-scrollbar {
//   display: none;
// }
.commitList {
  position: relative;
  padding-left: 15px;
  left: 45px;
  width: 735px;
  background-color: #fff;
  border-radius: 7px;
  h1 {
    font-size: 19px;
  }
  div {
    margin-top: 10px;
    .users {
      display: flex;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .userInfo {
        position: absolute;
        left: 70px;
        margin-top: 6px;
        font-size: 15px;
        .author {
          color: #fb7299;
        }
        .createDate {
          color: #9499a0;
        }
        .replay {
          position: absolute;
          right: -40px;
          top: 30px;
          font-size: 12px;
          color: #9499a0;
        }
        .replay:hover {
          position: absolute;
          right: -40px;
          top: 30px;
          font-size: 12px;
          color: #fb7299;
          cursor: pointer;
        }
      }
    }
    .content1 {
      font-style: 15px;
      font-weight: 600;
    }
    .reqList {
      span {
        font-style: 12px;
        color: #9499a0;
      }
      
      ul {
        width: 80%;
        border: 1px solid #9499a0;
        border-radius: 7px;
        li {
          word-wrap: break-word;
          word-break: normal;
          font-size: 15px;
          font-weight: 600;
          list-style: none;
          margin-top: 8px;
          border-bottom: 1px solid #e1e3e7;
          span {
            color: skyblue;
          }
        }
      }
    }
  }
}
</style>