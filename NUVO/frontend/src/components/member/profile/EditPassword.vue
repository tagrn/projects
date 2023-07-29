<template>
  <v-dialog persistent transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ml-2 mt-5" outlined rounded small v-bind="attrs" v-on="on">
        Edit password
      </v-btn>
    </template>

    <!-- Modal 창 -->
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="#7597ab" dark>비밀번호 변경</v-toolbar>
        <div class="card-form" style="margin: 20px">
          <!-- 비밀번호 인증  -->
          <div class="card-input">
            <label for="password" class="card-input__label">
              비밀번호 인증
            </label>
            <v-text-field
              label="비밀번호"
              name="password"
              type="text"
              v-model="formData.password"
              :messages="check ? '' : '오른쪽의 체크를 눌러 중복확인해주세요'"
              @input="check = false"
            >
              <v-icon
                slot="append"
                :color="check ? '' : '#ea907a'"
                @click="passwordCheck(formData.password)"
                >mdi-check</v-icon
              >
            </v-text-field>
          </div>

          <v-divider inset></v-divider>
          <v-spacer></v-spacer>

          <!-- 새 비밀번호  -->
          <div class="card-input">
            <label for="newPwd" class="card-input__label">
              새 비밀번호
            </label>
            <v-text-field
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :type="show1 ? 'text' : 'password'"
              name="newPwd"
              prepend-icon="mdi-lock-outline"
              v-model="formData.pwd"
              color="#424242"
              :messages="
                newPwdCheck(formData.pwd)
                  ? ''
                  : '비밀번호는 영문과 숫자를 섞어서 8자 이상 되어야 합니다'
              "
              autocomplete="off"
            ></v-text-field>
          </div>

          <!-- 새 비밀번호 확인 -->
          <div class="card-input">
            <label for="newPwd2" class="card-input__label">
              새 비밀번호 확인
            </label>

            <v-text-field
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              :type="show2 ? 'text' : 'password'"
              name="newPwd2"
              prepend-icon="mdi-lock-outline"
              v-model="formData.pwdConfirm"
              color="#424242"
              :messages="
                newPwdCheck2(formData.pwd, formData.pwdConfirm)
                  ? ''
                  : '비밀번호와 동일하게 입력해주세요'
              "
              autocomplete="off"
            ></v-text-field>
          </div>
        </div>
        <v-card-actions class="justify-end">
          <v-btn
            :disabled="
              !check ||
                !newPwdCheck(formData.pwd) ||
                !newPwdCheck2(formData.pwd, formData.pwdConfirm)
            "
            color="#7c9986"
            @click="changePassword(), (dialog.value = false)"
            >Submit</v-btn
          >
          <v-btn color="#af8a83" @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import SERVER from "@/apis/UrlMapper.ts";
import { mapActions } from "vuex";

export default {
  name: "ProfileForm",
  components: {},
  data() {
    return {
      formData: {
        password: "",
        pwd: "",
        pwdConfirm: "",
        pwdNotMask: "",
        pwdConfirmNotMask: "",
      },
      check: false,
      show1: false,
      show2: false,
      isPasswordMasked: false,
    };
  },
  methods: {
    ...mapActions("Signup", ["pwdCheck"]),
    passwordCheck(pwd) {
      const uinfo = {
        upwd: pwd,
        uname: this.$store.state.Auth.authToken.username,
      };
      this.pwdCheck(uinfo).then((res) =>
        res ? (this.check = true) : (this.check = false)
      );
    },
    newPwdCheck(password) {
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
    newPwdCheck2(password, password2) {
      if (!this.newPwdCheck(password2)) return false;
      if (password !== password2) return false;
      return true;
    },
    changePassword() {
      axios
        .post(
          `${SERVER.BASE_URL}${SERVER.ROUTES.auth.changePwd}?currpassword=${this.formData.password}&password=${this.formData.pwdConfirm}&username=${this.$store.state.Auth.authToken.username}`
        )
        .then((res) => {
          if (res.data == true) {
            swal.fire({
              icon: "success",
              title: "Success!",
              text: "비밀번호 변경 완료!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
