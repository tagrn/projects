<template>
  <v-card class="mx-auto" flat dark color="#5a4e4d" max-width="450">
    <div style="margin: 40px">
      <h1>이메일 인증</h1>
      <p>인증번호가 발송됩니다</p>
    </div>
    <v-text-field
      v-model="email"
      v-validate="'required|email'"
      data-vv-name="email"
      :messages="error.msg"
      label="E-mail."
      @input="emailChecked = false"
      outlined
      solo
      required
      autofocus
      color="#424242"
      autocomplete="off"
    >
      <v-icon
        slot="append"
        :color="emailChecked ? '' : '#ea907a'"
        @click="emailCheck2(email)"
        >mdi-check</v-icon
      >
    </v-text-field>

    <div>
      <v-btn color="grey" class="white--text" @click="$emit('pageDown')"
        >뒤로가기</v-btn
      >
      <v-divider class="mr-5" vertical></v-divider>
      <v-btn
        :disabled="!emailChecked"
        @click="emailVerification(email)"
        color="#ea907a"
        class="white--text"
        >인증번호 받기</v-btn
      >
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
  </v-card>
</template>

<script>
import swal from "sweetalert2";
import { mapActions } from "vuex";

export default {
  name: "Signupemail",
  data: function() {
    return {
      email: "",
      error: {
        msg: ""
      },
      isSubmit: false,
      component: this,
      emailChecked: false,
      overlay: false
    };
  },
  watch: {
    email: function() {
      this.checkForm();
    }
  },
  created() {
    console.log("SignupEmail Component Created!");
    this.component = this;
  },
  methods: {
    ...mapActions("Signup", ["getConfirmCode", "emailCheck"]),

    checkForm() {
      this.$validator.validateAll().then(result => {
        if (this.email.length >= 0 && !result) {
          this.error.msg = "이메일 형식이 아닙니다.";
        } else if (!this.emailChecked) {
          this.error.msg = "오른쪽 체크를 눌러서 이메일 중복 확인해주세요.";
        }
      });

      let isSubmit = true;

      Object.values(this.error).map(v => {
        if (v) isSubmit = false;
      });
      this.isSubmit = isSubmit;
    },
    emailVerification(email) {
      // email 보내기 + 받아서
      const signupEmailComponent = this;
      signupEmailComponent.overlay = !signupEmailComponent.overlay;
      this.getConfirmCode(email).then(code => {
        if (code.status === 200) {
          signupEmailComponent.overlay = !signupEmailComponent.overlay;
          swal.fire({
            text: "인증번호가 발송되었습니다.",
            icon: "info"
          });
          this.$emit("toEmailVerification", {
            confirmCode: code,
            userEmail: email
          });
        } else {
          signupEmailComponent.overlay = !signupEmailComponent.overlay;
          swal.fire({
            text: "인증번호 발송에 실패하였습니다.",
            icon: "error"
          });
        }
      });
    },
    emailCheck2(email) {
      this.emailCheck(email).then(res => {
        if (res === true) {
          swal.fire({
            icon: "success",
            title: "Success!",
            text: "사용 가능한 이메일입니다."
          });
          this.emailChecked = true;
        } else {
          swal.fire({
            icon: "error",
            text: "이미 사용 중인 이메일입니다."
          });
          this.emailChecked = false;
        }
        if (this.emailChecked) {
          this.error.msg = "";
        } else {
          this.error.msg = "오른쪽 체크를 눌러서 이메일 중복 확인해주세요.";
        }
      });
    }
  }
};
</script>
