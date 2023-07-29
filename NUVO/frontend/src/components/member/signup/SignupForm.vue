<template>
  <v-card
    class="mx-auto"
    flat
    dark
    color="#5a4e4d"
    max-width="450"
    max-height="550"
  >
    <div><h1>회원 가입</h1></div>

    <v-text-field
      label="아이디"
      name="signup"
      prepend-icon="mdi-account"
      type="text"
      v-model="signupData.username"
      color="#424242"
      :messages="idcheck ? '' : '오른쪽의 체크를 눌러 중복확인해주세요'"
      @input="idcheck = false"
      autofocus
      autocapitalize="off"
      autocorrect="off"
      autocomplete="off"
    >
      <v-icon
        slot="append"
        :color="idcheck ? '' : '#ea907a'"
        @click="idCheck2(signupData.username)"
        >mdi-check</v-icon
      >
    </v-text-field>

    <v-text-field
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show1 = !show1"
      :type="show1 ? 'text' : 'password'"
      label="비밀번호"
      name="password"
      prepend-icon="mdi-lock-outline"
      v-model="signupData.password"
      color="#424242"
      :messages="
        pwdCheck(signupData.password)
          ? ''
          : '비밀번호는 영문과 숫자를 섞어서 8자 이상 되어야 합니다'
      "
      autocomplete="off"
    ></v-text-field>

    <v-text-field
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show2 = !show2"
      :type="show2 ? 'text' : 'password'"
      label="비밀번호 확인"
      name="password confirm"
      prepend-icon="mdi-lock-outline"
      v-model="signupData.password2"
      color="#424242"
      :messages="
        pwdCheck2(signupData.password, signupData.password2)
          ? ''
          : '비밀번호와 동일하게 입력해주세요'
      "
      autocomplete="off"
    ></v-text-field>

    <!-- 영문, 숫자 혼용 확인 필요 -->
    <div style="padding:40px">
      <v-btn
        color="grey"
        class="white--text"
        @click="$router.push({ name: 'Login' }), saveSignupData({})"
        >뒤로가기</v-btn
      >
      <v-divider class="mr-5" vertical></v-divider>
      <v-btn
        :disabled="
          !signupData.username ||
            !signupData.password ||
            !signupData.password2 ||
            !idcheck ||
            !pwdCheck(signupData.password) ||
            !pwdCheck2(signupData.password, signupData.password2)
        "
        @click="toEmailVerification()"
        color="#ea907a"
        class="white--text"
        >다음으로</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignupForm",
  props: {
    signupData2: Object
  },
  mounted() {
    console.log("signupform mounted!");
    if (this.signupData2 != {}) {
      this.signupData = this.signupData2;
    }
  },
  data: function() {
    return {
      signupData: {
        username: "",
        password: "",
        password2: ""
      },
      show1: false,
      show2: false,
      idcheck: false
    };
  },
  methods: {
    ...mapActions("Signup", ["idCheck", "saveSignupData"]),
    toEmailVerification() {
      this.$emit("toEmailVerification", this.signupData);
    },
    pwdCheck(password) {
      const pattern1 = /[0-9]/;
      const pattern2 = /[A-Za-z]/;
      //특수문자 확인
      if (pattern1.test(password) == false) {
        return false;
      }
      if (pattern2.test(password) == false) {
        return false;
      }
      if (password.length < 8) return false;
      return true;
    },
    pwdCheck2(password, password2) {
      if (!this.pwdCheck(password2)) return false;
      if (password !== password2) return false;
      return true;
    },
    idCheck2(username) {
      this.idCheck(username).then(res =>
        res ? (this.idcheck = true) : (this.idcheck = false)
      );
    }
  }
};
</script>
