<template>
  <v-container class="profileform">
    <!-- Basic profile -->
    <v-card>
      <v-container fluid ma-0 pa-0>
        <v-row>
          <v-col cols="6" class="mt-3">
            <v-row no-gutters>
              <v-col cols="12">
                <MyProfile :user="authToken" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" class="mt-3"> <MyCredit :user="authToken" /> </v-col>
        </v-row>
      </v-container>

      <v-container fluid ma-0 pa-0>
        <br>
        <v-card>
          <v-tabs
            v-model="tab"
            background-color="#8593ae"
            centered
            dark
            icons-and-text
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
              My Galleries
              <v-icon>mdi-image-multiple</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
              Bookmarks
              <v-icon>mdi-bookmark-multiple</v-icon>
            </v-tab>

            <v-tab href="#tab-3">
              My Account
              <v-icon>mdi-cash-multiple</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <MyPosts :user="authToken" />
            </v-tab-item>
            <v-tab-item value="tab-2">
              <Bookmark :user="authToken" />
            </v-tab-item>
            <v-tab-item value="tab-3">
              <MyPayment :user="authToken" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import MyProfile from "@/components/member/profile/MyProfile.vue";
import MyCredit from "@/components/member/profile/MyCredit.vue";

import Bookmark from "@/components/member/profile/Bookmark.vue";
import MyPosts from "@/components/member/profile/MyPosts.vue";
import MyPayment from "@/components/member/profile/MyPayment.vue";

export default {
  components: {
    MyProfile,
    MyCredit,
    Bookmark,
    MyPosts,
    MyPayment,
  },
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    ...mapState("Auth", ["authToken"]),
  },
};
</script>

<style scoped>
.container,
.row,
.col {
  background: #5a4e4d;
}
.profileform {
  width: 80%;
}
</style>
