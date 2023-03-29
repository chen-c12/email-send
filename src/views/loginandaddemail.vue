<template>
  <div>
    <img src="../img/bg.jpg" alt="" />
    <div class="panel">
      <div class="content login">
        <div class="switch">
          <span :class="{ active: active === 'add' }" @click="go('add')"
            >添加邮箱</span
          >
          <span>/</span>
          <span
            :class="{ active: active === 'rootlogin' }"
            @click="go('rootlogin')"
            >管理登录</span
          >
        </div>
        <div class="form" id="fromLogin">
          <!-- 管理员登录 -->
          <!-- 如果按钮选择的是管理员登录就展示这个里面的内容 -->
          <template v-if="active === 'rootlogin'">
            <div class="input">
              <input
                :class="{ hasValue: rootform.username }"
                v-model="rootform.username"
                type="text"
              />
              <label for="email">用户名</label>
            </div>
            <div class="input">
              <input
                :class="{ hasValue: rootform.password }"
                v-model="rootform.password"
                type="password"
              />
              <label for="email">用户密码</label>
            </div>
            <button type="submit" @click="login" class="btn">登录</button>
          </template>
          <!-- 添加邮箱 -->
          <!-- 如果按钮选择的是添加邮箱就展示这个里面的内容 -->
          <template v-if="active === 'add'">
            <div class="input">
              <input
                :class="{ hasValue: addform.email }"
                v-model="addform.email"
                type="text"
                name="Username"
                id="Username"
              />
              <label for="email">添加邮箱</label>
              <button class="codebtn" @click="sendemailcode(addform.email)">
                验证码
              </button>
            </div>
            <div class="input">
              <input
                :class="{ hasValue: addform.emailcode }"
                v-model="addform.emailcode"
              />
              <!-- type="text"
                name="emailcode"
                id="emailcode" -->
              <label>验证码</label>
            </div>
            <button
              type="submit"
              @click="addEmail(addform.email, addform.emailcode)"
              class="btn"
            >
              添加邮箱
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { loginroot } from "../api/login.js";
import { sendcode, addemailandsendcode } from "@/api/sendemailcode.js";
export default {
  name: "App",
  components: {},
  data() {
    return {
      // 判断在登录仲系添加邮箱
      active: "add",
      // 登录数据
      rootform: {
        username: "admin",
        password: "123456",
      },
      // 添加邮箱数据
      addform: {
        email: "",
        emailcode: "",
      },
    };
  },
  methods: {
    go(type) {
      this.active = type;
    },
    // 添加邮箱方法
    addEmail(email, emailcode) {
      // console.log(this.addform.email);
      // 如果验证码为空
      if (this.addform.emailcode == "") {
        this.$message({
          message: "请填写验证码，亲",
          type: "warning",
        });
      } else {
        // 邮箱可以为空
        if (this.addform.email == "") {
          this.$message({
            message: "哎呀~邮箱不可以为空",
            type: "warning",
          });
        } else if (this.addform.email.match(/^\w+@\w+\.\w+$/i)) {
          addemailandsendcode(email, emailcode)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: "添加成功了，亲",
                  type: "success",
                });
              }
              // 邮箱重复了
              else if (res.data == "邮箱重复了") {
                this.$message({
                  message: "邮箱已经存在了，亲",
                  type: "warning",
                });
              }
              // 验证码错误
              else if (res.data == "验证码错误") {
                this.$message({
                  message: "验证码错误了，亲",
                  type: "warning",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.$message({
            message: "邮箱格式不对，亲",
            type: "warning",
          });
          // axios
          //   .put(`http://124.220.198.6:8888/${this.addform.email}`)
          //   .then((response) => {
          //     // console.log(response);
          //     if (this.addform.email.match(/^\w+@\w+\.\w+$/i)) {
          //       if (response.data.code == 200) {
          //         this.$message({
          //           message: "添加成功了，亲",
          //           type: "success",
          //         });
          //         this.addform.email = "";
          //       } else {
          //         this.$message({
          //           message: "添加失败哟~可能已经添加过啦",
          //           type: "warning",
          //         });
          //       }
          //     } else {
          //       this.$message({
          //         message: "哎呀~邮箱格式写错啦",
          //         type: "warning",
          //       });
          //     }
          //   })
          // .catch((error) => {
          //   console.log(error);
          // });
        }
      }
    },

    // 发送验证码
    sendemailcode(email) {
      // 格式正确
      if (this.addform.email.match(/^\w+@\w+\.\w+$/i)) {
        console.log(email);
        sendcode(email)
          .then((res) => {
            console.log(email);
            console.log(res);
          })
          .catch((error) => {
            console.log("===>" + error);
          });
      } else if (this.addform.email == "") {
        this.$message({
          message: "哎呀~邮箱不可以为空",
          type: "warning",
        });
      } else {
        this.$message({
          message: "哎呀~邮箱格式不对",
          type: "warning",
        });
      }
    },

    // 登录方法
    login() {
      // console.log(this.rootform);
      loginroot(this.rootform)
        .then((res) => {
          const that = this;
          console.log(res);
          // 登录成功
          if (res.code == 888) {
            // console.log(res.data.tokenValue);res.data.tokenName+
            sessionStorage.setItem('token',res.data.tokenValue)
            console.log(res.data.tokenValue);
            that.$router.push("/databaselist");
          } else {
            this.$message({
              message: "你不是管理员你不配登录,想登录稳我",
              type: "warning",
            });
          }
        })
        .catch((err) => {
          // console.log("报错");
          console.log(err);
        });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  /* 100%的窗口高度 */
  height: 100vh;
  /* 弹性布局 水平 + 垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 引入字体 */
  font-family: miaowu;
  /* 渐变背景 */
  background: linear-gradient(45deg, rgb(181, 154, 254), rgb(245, 189, 253))
    fixed;
}
.container {
  /* 相对定位 */
  position: relative;
  width: 70rem;
}

.container img {
  width: 70rem;
}
.panel {
  width: 30%;
  margin: 10rem 0 0;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
}
.container {
  /* 相对定位 */
  position: relative;
  width: 70rem;
}

.container img {
  width: 70rem;
}

.switch span {
  color: #ccc;
  font-size: 1.4rem;
  /* 鼠标放上变小手 */
  cursor: pointer;
}
.switch span.active {
  color: rgb(181, 154, 254);
}

.panel {
  width: 30%;
  margin: 10rem 0 0;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
}

.form {
  width: 12rem;
  margin: 3rem 0 0;
}

.form .input {
  position: relative;
  opacity: 1;
  height: 2rem;
  width: 100%;
  margin: 2rem 0;
  transition: 0.4s;
}

.form input {
  outline: none;
  width: 100%;
  border: none;
  border-bottom: 0.1rem solid rgb(181, 154, 254);
  position: relative;
  line-height: 35px;
  background-color: transparent;
  z-index: 1;
}

.form label {
  position: absolute;
  left: 0;
  top: 20%;
  font-size: 1.2rem;
  color: rgb(129, 101, 207);
  transition: 0.3s;
}

.hasValue ~ label,
input:focus ~ label {
  top: -50%;
  font-size: 0.9rem;
}

.form span {
  display: block;
  color: rgb(110, 89, 167);
  font-size: 0.8rem;
  cursor: pointer;
}

.form .btn {
  border: none;
  outline: none;
  margin: 2.5rem 0 0;
  width: 100%;
  height: 3rem;
  border-radius: 3rem;
  background: linear-gradient(45deg, rgb(181, 154, 254), rgb(245, 189, 253));
  box-shadow: 0 0 8px rgb(181, 154, 254);
  cursor: pointer;
  color: white;
  font-family: miaowu;
}

#live2dcanvas {
  border: 0 !important;
}
.codebtn {
  position: absolute;
  right: -64px;
  bottom: 0px;
  border-radius: 3rem;
  background: linear-gradient(45deg, rgb(181, 154, 254), rgb(245, 189, 253));
  box-shadow: 0 0 8px rgb(181 154 254);
  cursor: pointer;
  color: white;
  font-family: miaowu;
  outline: none;
  border: none;
  margin: 2.5rem 0 0;
  font-size: 2px;
  height: 23px;
  width: 63px;
}
</style>
