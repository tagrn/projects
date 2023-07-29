<template>
  <v-container fill-height>
    <v-btn
      elevation="3"
      fab
      color="orange darken-3"
      style="position:fixed; right:25px; top:20px; color:white;"
      @click="clickGotoWorldMap"
    >
      <v-icon>
        mdi-map-search
      </v-icon>
    </v-btn>

    <!-- Signup -->
    <v-container class="signup" fill-height>
      <v-row class="text-center" align="center" justify="center">
        <v-col cols="12">
          <!-- 아이디, 비번, 비번확인 -->
          <SignupForm
            v-if="page === 1"
            @toEmailVerification="setSignupData"
            :signupData2="signupData"
          />
          <!-- 이메일 입력 -->
          <SignupEmail
            v-if="page === 2"
            @toEmailVerification="emailVerification"
            @pageDown="(page = 1), setPage(1)"
          />
          <!-- 인증번호 확인 -->
          <SignupEmailVerification
            v-if="page === 3"
            @finishSignup="doSignup"
            @pageDown="(page = 2), setPage(2)"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";

import { mapActions } from "vuex";

import SignupForm from "@/components/member/signup/SignupForm.vue";
import SignupEmail from "@/components/member/signup/SignupEmail.vue";
import SignupEmailVerification from "@/components/member/signup/SignupEmailVerification.vue";

export default {
  components: {
    SignupForm,
    SignupEmail,
    SignupEmailVerification
  },
  data: function() {
    return {
      signupData: {},
      page: 1
    };
  },
  methods: {
    ...mapActions("Signup", ["signup", "saveSignupData", "setPage"]),
    clickGotoWorldmap() {
      this.$router.push({ name: "WorldMap" });
    },
    setSignupData(signupData) {
      this.saveSignupData(signupData);
      this.signupData = this.$store.state.Signup.signupData;
      this.page = 2;
      this.setPage(this.page);

      console.log("기본 정보 저장 after");
      console.log(this.$store.state.Signup.signupData);
    },
    emailVerification(userEmailData) {
      this.signupData = this.$store.state.Signup.signupData;
      this.signupData.email = userEmailData.userEmail;
      this.saveSignupData(this.signupData);
      this.page = 3;
      this.setPage(this.page);

      console.log("이메일 저장 after");
      console.log(this.$store.state.Signup.signupData);
    },
    doSignup() {
      console.log(this.signupData);
      this.signup(this.signupData);
      Swal.fire({
        title: "가입되었습니다!",
        text: `${this.signupData.username} 님\n NUVO에 오신 것을 환영합니다.`,
        background: "#fff url(/images/trees.png)",
        backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `
      });
      this.saveSignupData({});
      this.setPage(1);
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style scoped>
</style>
