<template>
  <v-card class="mx-auto" flat dark color="#5a4e4d" max-width="450">
    <div>
      <h1>인증</h1>
      <p>인증번호를 입력하세요</p>
    </div>

    <v-text-field
      v-model="confirm"
      :messages="error.confirm"
      label="Verification Code"
      outlined
      solo
      required
      color="#424242"
      autocomplete="off"
    ></v-text-field>
    <div>
      <v-btn color="grey" class="white--text" @click="$emit('pageDown')"
        >뒤로가기</v-btn
      >
      <v-divider class="mr-5" vertical></v-divider>
      <v-btn
        color="#ea907a"
        class="white--text"
        :disabled="!isSubmit"
        @click="verify()"
        >회원가입 완료</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  name: "SignupEmailVerification",
  data: function() {
    return {
      confirm: "",
      error: {
        confirm: ""
      },
      isSubmit: false,
      component: this
    };
  },
  created() {
    this.component = this;
  },
  watch: {
    confirm: function() {
      this.checkForm();
    }
  },
  computed: {
    ...mapState("Signup", ["confirmCode2"])
  },
  methods: {
    checkForm() {
      if (this.confirm.length != 6)
        this.error.confirm = "확인 코드는 6자리 입니다.";
      else this.error.confirm = "";

      let isSubmit = true;

      Object.values(this.error).map(v => {
        if (v) isSubmit = false;
      });
      this.isSubmit = isSubmit;
    },
    verify() {
      // axios 보내고
      // 인증 완료 되서 넘어 오면

      const num = Number(this.confirm);

      if (num === this.confirmCode2) {
        this.$emit("finishSignup");
      } else {
        swal.fire({
          icon: "error",
          text: "인증번호를 확인해주세요"
        });
      }
    }
  }
};
</script>
