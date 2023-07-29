<template>
  <div class="wrapper">
    <v-btn
      elevation="3"
      fab
      color="orange darken-3"
      style="position:fixed; right:25px; top:20px; color:white;"
      @click="clickGotoWorldmap"
    >
      <v-icon>
        mdi-map-search
      </v-icon>
    </v-btn>

    <transition name="slide">
      <form v-if="active" @submit.prevent="logInSubmit" class="ticket">
        <p class="title">Welcome to NUVO</p>
        <div class="ticket__content">
          <input
            v-model="user.username"
            v-validate="'required'"
            data-vv-name="User ID"
            type="text"
            placeholder="ID"
            autofocus
          />
          <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >
            Username is required!
          </div>
          <v-icon> mdi-ticket-account </v-icon>
          <input
            v-model="user.password"
            v-validate="'required'"
            data-vv-name="Password"
            type="password"
            placeholder="password"
            autofocus
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >
            Password is required!
          </div>
          <v-icon> mdi-key </v-icon>
        </div>
        <span>Doesn't have an account?</span>
        <a @click="signUpPage">Sign-up</a>
        <button>
          <span class="state">Log-in</span>
        </button>
      </form>
    </transition>
  </div>
</template>

<script lang="ts">
import swal from "sweetalert2";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class Login extends Vue {
  private active = true;
  private user: any = { username: "", password: "" };
  private loading = false;
  private message = "";

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  created() {
    if (this.isLoggedIn) {
      this.$router.push("/profile");
    }
  }

  clickGotoWorldmap() {
    this.$router.push({ name: "WorldMap" });
  }
  signUpPage() {
    this.$router.push("/signup");
  }

  logInSubmit() {
    this.active = !this.active;

    this.loading = true;
    this.$validator.validateAll().then((isValid: boolean) => {
      if (!isValid) {
        console.log("validate 오류");
        this.loading = false;
        swal.fire({
          text: "입력 형식에 맞춰주세요!",
          icon: "warning"
        });
        setTimeout(() => {
          this.active = !this.active;
        }, 1000);
        return;
      }

      if (this.user.username && this.user.password) {
        this.login(this.user).then(
          data => {
            console.log("success!");
            swal.fire({
              text: this.user.username + "님 반갑습니다!",
              icon: "success"
            });
            this.$router.push("/worldmap");
          },
          error => {
            this.loading = false;
            setTimeout(() => {
              this.active = !this.active;
            }, 1000);
            this.message = error;
            swal.fire({
              text: "아이디 혹은 비밀번호가 틀렸습니다",
              icon: "error"
            });
          }
        );
      }
    });
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
  background: #5a4e4d;
}

.ticket {
  position: relative;
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  margin: 10px auto 0;
  padding: 20px;
  border-radius: 10px;
  background: #fbfbfb;
  box-shadow: 2px 2px 15px 0px #ab9b0d;
}
@media (min-width: 500px) {
  .ticket {
    position: relative;
    width: 25%;
    height: 500px;
    box-sizing: border-box;
    margin: 10px auto 0;
    padding: 20px;
    border-radius: 10px;
    background: #fbfbfb;
    box-shadow: 2px 2px 15px 0px #ab9b0d;
  }
}
.ticket:before,
.ticket:after {
  content: "";
  position: absolute;
  left: 0;
  height: 4px;
  width: 100%;
}
.ticket:before {
  top: -4px;
  background: radial-gradient(
      circle,
      transparent,
      transparent 50%,
      #fbfbfb 50%,
      #fbfbfb 100%
    ) -7px -8px/16px 16px repeat-x;
}
.ticket:after {
  bottom: -3px;
  background: radial-gradient(
      circle,
      transparent,
      transparent 50%,
      #fbfbfb 50%,
      #fbfbfb 100%
    ) -7px -2px/16px 16px repeat-x;
}
.ticket__content {
  box-sizing: border-box;
  height: 70%;
  width: 100%;
  border: 6px solid #d8d8d8;
}
.ticket input {
  display: block;
  padding: 15px 10px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ddd;
  transition: border-width 0.2s ease;
  border-radius: 2px;
  color: #ccc;
}
.ticket input + i.v-icon.v-icon.v-icon {
  color: #fff;
  font-size: 1em;
  position: absolute;
  margin-top: -47px;
  opacity: 0;
  left: 0;
  transition: all 0.1s ease-in;
}
.ticket input:focus {
  outline: none;
  color: #444;
  border-color: #8593ae;
  border-left-width: 35px;
}
.ticket input:focus + i.v-icon.v-icon {
  opacity: 1;
  left: 30px;
  transition: all 0.25s ease-out;
}

.ticket .title {
  color: #444;
  font-size: 1.2em;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.ticket button {
  width: 100%;
  padding: 10px 10px;
  background: #000000;
  color: #fff;
  display: block;
  border: none;
  border-radius: 10px;
  margin-top: 10px;
  border: 0px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 2px 2px;
  transform: rotateZ(0deg);
  transition: all 0.1s ease-out;
  border-bottom-width: 7px;
}

.ticket:not(.loading) button:hover {
  box-shadow: 0px 1px 3px #444;
}
.ticket:not(.loading) button:focus {
  border-bottom-width: 4px;
}
.ticket.loading button {
  max-height: 100%;
  padding-top: 50px;
  top: -50%;
}
.ticket.ok button {
  background-color: #8bc34a;
}

/* transition slide 효과 */
.slide-leave-active,
.slide-enter-active {
  transition: 0.9s;
}
.slide-enter {
  transform: translateY(100%);
}
.slide-leave-to {
  transform: translateY(100%);
}
</style>
