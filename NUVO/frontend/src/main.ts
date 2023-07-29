import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VeeValidate from "vee-validate";
import VueIntro from "vue-introjs";

import "intro.js/introjs.css";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [
  "a-scene",
  "a-entity",
  "a-camera",
  "a-box",
  "a-sky",
  "a-sphere",
  "a-cylinder",
  "a-plane",
  "a-assets",
  "a-cursor"
];

Vue.use(VueIntro);
Vue.use(VeeValidate, {
  fieldsBagName: "veeFields"
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
