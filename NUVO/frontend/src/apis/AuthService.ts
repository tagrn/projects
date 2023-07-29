import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

const API_URL = SERVER.BASE_URL + "auth/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          console.log("save local");
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }
}

export default new AuthService();
