// URL을 재사용하기 위한 목적
export default {
   /* secret key */
  ROUTES: {
    auth: {
      URL: "auth/",
      login: "auth/signin",
      signup: "auth/signup",
      idCheck: "auth/idcheck",
      pwdCheck: "auth/checkpw",
      emailCheck: "auth/emailcheck",
      emailValidate: "auth/emailvalidate",
      changePwd: "auth/changepw",
      getAllBookmarks: "auth/bookmarkall",
    },
    board: {
      delpost: "delpost",
      getpost: "postgetusername",
      getpayment: "mypay",
    },
    files: {
      URL: "files/",
      upload: "upload/multipleFiles",
    },
  },
};
