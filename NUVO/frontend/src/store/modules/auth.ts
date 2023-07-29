import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import AuthService from "@/apis/AuthService";

const storedUser = localStorage.getItem("user");

@Module({ namespaced: true })
class UserAuth extends VuexModule {
  /*********************************************************************
   * States
   *********************************************************************/
  public status = storedUser ? { loggedIn: true } : { loggedIn: false };
  public authToken = storedUser ? JSON.parse(storedUser) : null;

  get isLoggedIn(): boolean {
    return this.status.loggedIn;
  }

  /*********************************************************************
   * Mutations
   *********************************************************************/
  @Mutation
  public loginSuccess(user: any): void {
    this.status.loggedIn = true;
    this.authToken = user;
  }

  @Mutation
  public loginFailure(): void {
    this.status.loggedIn = false;
    this.authToken = null;
  }

  @Mutation
  public logout(): void {
    this.status.loggedIn = false;
    this.authToken = null;
  }

  @Mutation
  public registerSuccess(): void {
    this.status.loggedIn = false;
  }

  @Mutation
  public registerFailure(): void {
    this.status.loggedIn = false;
  }

  /*********************************************************************
   * Actions
   *********************************************************************/
  @Action({ rawError: true })
  login(data: any): Promise<any> {
    return AuthService.login(data.username, data.password).then(
      user => {
        this.context.commit("loginSuccess", user);
        return Promise.resolve(user);
      },
      error => {
        this.context.commit("loginFailure");
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      }
    );
  }

  @Action
  signOut(): void {
    AuthService.logout();
    this.context.commit("logout");
  }

  @Action({ rawError: true })
  register(data: any): Promise<any> {
    return AuthService.register(data.username, data.email, data.password).then(
      response => {
        this.context.commit("registerSuccess");
        return Promise.resolve(response.data);
      },
      error => {
        this.context.commit("registerFailure");
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      }
    );
  }
}

export default UserAuth;
