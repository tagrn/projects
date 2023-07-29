import axios from "axios";
import swal from "sweetalert2";

import SERVER from "@/apis/UrlMapper";
import ROUTER from "@/router";

export default {
  namespaced: true,
  state: {
    signupData: {
      username: "",
      password: "",
      email: "",
    },
    page: Number(localStorage.getItem("page"))
      ? Number(localStorage.getItem("page"))
      : 1,
    confirmCode2: "",
  },
  mutations: {
    SET_PAGE(state: any, page: any) {
      state.page = Number(page);
      localStorage.setItem("page", page);
    },
    SET_CODE(state: any, code: any) {
      state.confirmCode2 = code;
    },
    SET_SIGNUPDATA(state: any, signupData: any) {
      state.signupData = signupData;
    },
  },
  /************************** Action ***********************************/
  actions: {
    saveSignupData({ commit }: any, signupData: any) {
      commit("SET_SIGNUPDATA", signupData);
    },
    setPage({ commit }: any, page: any) {
      commit("SET_PAGE", page);
    },
    signup({ dispatch }: any, obj: any): void {
      const info = {
        data: obj,
        route: SERVER.ROUTES.auth.signup,
      };
      dispatch("postAuthData", info);
    },
    postAuthData({ commit }: any, info: any): Promise<any> {
      return axios
        .post(SERVER.BASE_URL + info.route, info.data, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          ROUTER.push({
            name: "Login",
          });
        })
        .catch((err) => {
          swal.fire({
            icon: "warning",
            title: "Error!",
            text: "로그인 정보를 확인해주세요.",
          });
        });
    },
    idCheck(obj: any, uid: string) {
      if (uid === "" || uid === undefined) {
        swal.fire({ icon: "error", text: "아이디를 입력하세요." });
        return false;
      }
      return axios
        .get(SERVER.BASE_URL + SERVER.ROUTES.auth.idCheck + "/" + uid)
        .then((res) => {
          if (res.data === "success") {
            swal.fire({
              icon: "success",
              title: "Success!",
              text: "사용 가능한 아이디입니다.",
            });
            return true;
          } else {
            swal.fire({
              icon: "error",
              title: "Opps...",
              text: "이미 사용 중인 아이디입니다.",
            });
            return false;
          }
        })
        .catch((err) => console.log(err.response));
    },
    emailCheck(context: any, email: string) {
      return axios
        .post(SERVER.BASE_URL + SERVER.ROUTES.auth.emailCheck, {
          userEmail: email,
        })
        .then((res) => {
          if (res.data === "success") {
            return true;
          } else {
            return false;
          }
        })
        .catch((err) => console.log(err));
    },
    pwdCheck(obj: any, uinfo: any) {
      if (uinfo.upwd === "" || uinfo.upwd === undefined) {
        swal.fire({ icon: "error", text: "비밀번호를 입력하세요." });
        return false;
      }
      return axios
        .post(
          SERVER.BASE_URL +
            SERVER.ROUTES.auth.pwdCheck +
            "?password=" +
            uinfo.upwd +
            "&username=" +
            uinfo.uname
        )
        .then((res) => {
          console.log(res.data);
          if (res.data == true) {
            swal.fire({
              icon: "success",
              title: "Success!",
              text: "비밀번호 변경 가능",
            });
            return true;
          } else {
            return false;
          }
        })
        .catch((err) =>
          swal.fire({
            icon: "error",
            title: "Opps...",
            text: "비밀번호를 다시 확인해주세요",
          })
        );
    },
    getConfirmCode({ commit }: any, email: any) {
      return axios
        .post(SERVER.BASE_URL + SERVER.ROUTES.auth.emailValidate, {
          userEmail: email,
        })
        .then((confirmCode: any) => {
          if (confirmCode === "fail") {
            swal.fire({
              icon: "warning",
              title: "Error!",
              text: "이메일을 확인해주세요.",
            });
            return "";
          } else {
            commit("SET_CODE", confirmCode.data);
            return confirmCode;
          }
        })
        .catch((err) => {
          return err.response;
        });
    },
  },
};
