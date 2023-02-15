<template>
  <div class="body1">
    <div class="box">
      <div class="pre-box" ref="preRef">
        <h1>WELCOME</h1>
        <p>JOIN US!</p>
        <div class="img-box">
          <img
            :src="require('../../assets/imgs/77.jpeg')"
            alt=""
            ref="imgRef"
          />
        </div>
      </div>
      <div class="register-from">
        <div class="title-box">
          <h1>注册</h1>
        </div>
        <form action="##">
          <div class="input-box">
            <input type="text" v-model="loginForm.nickname" placeholder="用户名" />
            <input type="text" v-model="loginForm.account" placeholder="账号" />
            <input type="password" v-model="loginForm.password" placeholder="密码" />
            <input type="password" v-model="password1" placeholder="确认密码" />
          </div>
          <div class="btn-box">
            <button @click.prevent="userRegister">注册</button>
            <p @click="mySwitch()">已有账号?去登录</p>
          </div>
        </form>
      </div>

      <div class="login-from">
        <div class="title-box">
          <h1>登录</h1>
        </div>
        <form action="##">
          <div class="input-box">
            <input type="text" v-model="loginForm.account" placeholder="用户名" />
            <input type="password" v-model="loginForm.password" placeholder="密码" />
            <!-- <input type="color"> -->
          </div>
          <div class="btn-box">
            <button @click="Login()">登录</button>
            <p @click="mySwitch()">没有账号?去注册</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {reqUserRegister,UserLogin,UserLoginOut} from '@/api'
export default {
  name: "TabLogin",
  data() {
    return {
      flag: true,
      imgUrl: require("../../assets/imgs/99.jpeg"),
      imgUrl1: require("../../assets/imgs/77.jpeg"),
      password1: "",
      loginForm:{
         account:"",
         nickname:"",
         password:""
      }
    };
  },
  created() {

  },
  methods: {
    mySwitch() {
      let preRef = this.$refs.preRef;
      let imgRef = this.$refs.imgRef;
      if (this.flag) {
        preRef.style.transform = "translateX(100%)";
        preRef.style.backgroundColor = "#c9e0ed";
        imgRef.src = this.imgUrl;
      } else {
        preRef.style.transform = "translateX(0%)";
        preRef.style.backgroundColor = "#edd4dc";
        imgRef.src = this.imgUrl1;
      }
      this.flag = !this.flag;
    },
    // 用户注册
    async userRegister() {
      try {
        const { account,nickname, password, password1 } = this.loginForm;
        (await this.$store.dispatch("UsersRegister", this.loginForm));
      } catch (error) {}
    },
    // 用户登录
    async Login() {
      event.preventDefault();
      try {
        const { account, password } = this.loginForm;
        let Form = {account, password}
        account && password && (await this.$store.dispatch("UsersLogin",Form));
        this.$router.push("/Home")
      } catch (error) {
      }
        // this.$router.push('/User')

    },
    
  },
};
</script>

<style lang="less" scoped>
.input {
  outline: none;
}
.body1 {
  position: relative;
  display: flex;
  top: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(to right, pink, skyblue);
  .box {
    width: 900px;
    height: 500px;
    display: flex;
    position: relative;
    // background-color: #fff;
    margin: auto;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
    .pre-box {
      width: 50%;
      height: 100%;
      position: absolute;
      border-radius: 4px;
      background-color: #edd4dc;
      box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
      transition: 0.5s ease-in-out;
      h1 {
        margin-top: 80px;
        text-align: center;
        // letter-spacing: 5px;
        text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
        color: white;
      }
      p {
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 20px 0;
        font-weight: bold;
        color: white;
        text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
      }
      .img-box {
        width: 200px;
        height: 200px;
        margin: 20px auto;
        border-radius: 50%;
        overflow: hidden;
        text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);

        img {
          width: 100%;
        }
      }
    }
  }
}

.login-from,
.register-from {
  flex: 1;
  height: 10px;
}
.title-box {
  height: 140px;
  line-height: 220px;
  h1 {
    text-align: center;
    letter-spacing: 5px;
    color: white;
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  }
}

.input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  width: 60%;
  height: 40px;
  margin-bottom: 20px;
  text-indent: 4px;
  border: 1px solid #b0cfe9;
  border-radius: 4px;
}
input:focus {
  color: #b0cfe9;
}
input:focus::placeholder {
  opacity: 0;
}
.btn-box {
  display: flex;
  justify-content: center;
  p {
    // transform: translateY(-8px);
    height: 50px;
    line-height: 6px;
    font-size: 14px;
    color: white;
  }
  button {
    width: 100px;
    height: 30px;
    margin: 0 7px;
    line-height: 30px;
    border-radius: 4px;
    border: none;
    background-color: #69b3f0;
    color: white;
  }
  button:hover {
    cursor: pointer;
    border: 1px solid white;
    opacity: 0.7;
  }
}
</style>