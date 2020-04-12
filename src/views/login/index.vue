<template>
  <div class="login">
    <div class="slideShadow" v-show="showSlide">
      <transition>
        <div class="slideSty animated bounce">
          <slide-verify
            @success="onSuccess"
            @fail="onFail"
            :sliderText="text"
            :w="350"
            :h="175"
            ref="slideDiv"
          ></slide-verify>
          <div class="iconBtn">
            <i class="el-icon-circle-close" @click="showSlide = false"></i>
            <i class="el-icon-refresh" @click="refresh"></i>
          </div>
        </div>
      </transition>
    </div>
    <div class="loginBox">
      <div class="loginCon">
        <h2 class="loginH2">
          <strong>SNote</strong>
        </h2>
        <div class="titleDiv">
          <div v-show="!isSign">
            <el-link
              :underline="false"
              style="margin-top:8px;color:#FF6100;font-size:30px;font-weight: bolder;"
              @click="signUp"
            >Sign up now</el-link>
            <p>Sign up your own account to enjoy SNote!</p>
            <i>
              <el-link
                :underline="false"
                style="color:#eee;font-size: 60px;margin-bottom: 70%;"
                class="el-icon-d-arrow-right"
                @click="signUp"
              ></el-link>
            </i>
          </div>
          <div v-show="isSign">
            <el-link
              :underline="false"
              style="margin-top:8px;color:#FF6100;font-size:30px;font-weight: bolder;"
              @click="isSign=false"
            >Log in now</el-link>
            <i>
              <el-link
                :underline="false"
                style="color:#eee;font-size: 60px;margin-bottom: 70%;"
                class="el-icon-d-arrow-left"
                @click="signUp"
              ></el-link>
            </i>
            <p>Log in your own account to use SNote!</p>
          </div>
        </div>

        <!-- 登录 -->
        <el-form v-show="!isSign" ref="loginForm" :rules="rules" :model="ruleForm">
          <el-form-item prop="user">
            <el-input
              placeholder="Please input account name"
              prefix-icon="el-icon-user"
              v-model="ruleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="Please input password"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="loginBtn" @click="loginYz('loginForm')">
            <strong>LOG IN</strong>
          </el-button>
        </el-form>

        <!-- Sign up 点击触发 -->
        <el-form v-show="isSign" ref="signForm" :rules="signrules" :model="signruleForm">
          <el-form-item prop="user">
            <el-input
              placeholder="Please input account name"
              prefix-icon="el-icon-user"
              v-model="signruleForm.user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="Please input password"
              prefix-icon="el-icon-lock"
              v-model="signruleForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              placeholder="Please input phone number"
              prefix-icon="el-icon-mobile-phone"
              v-model="signruleForm.phone"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              placeholder="Please input email address"
              prefix-icon="el-icon-message"
              v-model="signruleForm.email"
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="loginBtn" @click="registerYZ('signForm')">
            <strong>SIGN IN</strong>
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SlideVerify from "@/components/SlideVerify";
import { register } from "@/api/login";
export default {
  data() {
    return {
      isSign: false,
      notifyObj: null,
      text: "Swipe right!",
      showSlide: false,
      // login
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please input account name!",
            trigger: "blur"
          },
          {
            min: 3,
            max: 15,
            message: "3 to 5 characters in length!",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Please input password!", trigger: "blur" }
        ]
      },
      // sign
      signruleForm: {
        user: "",
        password: "",
        phone: "",
        email: ""
      },
      signrules: {
        user: [
          {
            required: true,
            message: "Please input account name!",
            trigger: "blur"
          },
          {
            min: 3,
            max: 15,
            message: "3 to 5 characters in length!",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Please input password!", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            message: "Please input phone number!",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Please input email address!",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    //this.shopTip()
  },
  methods: {
    signUp() {
      // console.log("Test")
      this.isSign = !this.isSign;
    },

    //注册用户验证
    registerYZ(form) {
      // console.log("Test")
      this.$refs[form].validate(valid => {
        if (valid) {
          debugger;
          let data = {
            username: this.signruleForm.user,
            password: this.signruleForm.password,
            email: this.signruleForm.email,
            phone: this.signruleForm.phone
          };
          register(data)
            .then(res => {
              //if (res.success) {
                this.$message({
                  message: "Registration success!",
                  type: "success"
                });
                this.isSign = !this.isSign;
                this.$refs.signForm.resetFields(); //清空表单
              //}
            }).catch((error) => {
              // console.log(error)
              this.$message({
                message: "Registration failed!",
                type: "error"
              });
            });
        } else {
          return;
        }
      });
    },

    onSuccess() {
      this.showSlide = false;
      this._login();
    },
    onFail() {
      this.$message.error("Verification Failed!");
    },
    refresh() {
      this.$refs.slideDiv.reset();
    },
    loginYz(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.showSlide = true;
        } else {
          return;
        }
      });
    },
    _login() {
      // this.$router.push({path:'/Home'})
      this.$store
        .dispatch("user/_login", this.ruleForm)
        .then(res => {
          debugger;
          // if (!res.data.success) {
          this.refresh();
          //} else {
          this.$router.push(this.$route.query.redirect);
          if (this.notifyObj) {
            this.notifyObj.close();
          }
          this.notifyObj = null;
          // }
        })
        .catch(error => {
          this.refresh();
          //this.$message.error(error);
        });
    }

    // shopTip() {
    //   this.notifyObj = this.$notify({
    //     title: 'Tips:',
    //     message:
    //       'name：admin,password：123456',
    //     duration: 0,
    //     iconClass: 'el-icon-s-opportunity'
    //   })
    // }
  },
  components: {
    SlideVerify
  }
};
</script>
<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  background: url(../../assets/pageBg/login_work.jpg) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
}

.loginBox {
  height: 455px;
  width: 550px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  margin-top: -287px;
}

.loginH2 {
  font-size: 38px;
  color: #ff6100;
  text-align: center;
}

.loginCon {
  margin-top: 30px;
  background: #eee;
  border-radius: 4px;

  .titleDiv {
    padding: 0 28px;
    background: #fff;
    position: relative;
    height: 100px;
    border-radius: 4px 4px 0 0;

    h3 {
      font-size: 22px;

      color: #555;
      font-weight: initial;
      padding-top: 23px;
    }

    p {
      font-size: 16px;
      color: #888;
      padding-top: 12px;
    }

    i {
      font-size: 65px;
      color: #ddd;
      position: absolute;
      right: 27px;
      top: 20px;
    }
  }

  .el-form {
    padding: 25px 25px 30px 25px;
    background: #eee;
    border-radius: 0 0 4px 4px;
  }
}

.loginBtn {
  width: 100%;
  background: #ff6100;
}

.el-button--primary {
  color: #fff;
  border-color: #ff6100;
}

.slideShadow {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.slideSty {
  position: absolute;
  width: 380px;
  height: 311px;
  background: #e8e8e8;
  border: 1px solid #dcdcdc;
  left: 50%;
  top: 50%;
  margin-left: -188px;
  margin-top: -176px;
  z-index: 99;
  border-radius: 5px;
}

.iconBtn {
  padding: 9px 0 0 19px;
  color: #5f5f5f;
  border-top: 1px solid #d8d8d8;
  margin-top: 17px;

  i {
    font-size: 22px;
    cursor: pointer;
  }

  i:last-child {
    margin-left: 7px;
  }
}
</style>
<style>
.slideSty .slide-verify {
  margin: 13px auto 0 auto;
  width: 350px !important;
}

.slideSty .slide-verify-slider {
  width: 100% !important;
}

.slideSty .slide-verify-refresh-icon {
  display: none;
}
</style>