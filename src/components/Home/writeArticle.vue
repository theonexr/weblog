<template>
  <div class="scrollview">
    <el-form ref="pubFormRef" :model="form1" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form1.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <!-- <quill-editor v-model="form1.body"></quill-editor> -->
        <Editor v-model="form1.body"></Editor>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import bus from "@/util/bus.js"
import Editor from "../../components/Home/Editor.vue";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      form1: {
        title: "",
        body: "",
      },
    };
  },
  mounted() {
    this.$emit("getForm", this.form1);
  },
};
</script>
<style lang="less" scoped>
/deep/.el-form {
  width: 800px;
  height: 800px;
}

.scrollview {
  top: 15px;
  position: relative;
  overflow-y: scroll;
  min-height: 1000px;
}
</style>