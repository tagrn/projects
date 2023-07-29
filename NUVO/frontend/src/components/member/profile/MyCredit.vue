<template>
  <v-card color="amber" dark>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">My Credit</v-card-title>

        <v-card-text>
          <v-icon>mdi-cash-multiple</v-icon>
          <span
            style="margin: 10px;background:#fff; color:#FFC107; font-size: 22px; border-radius: 10px"
          >
            {{ coinWallet }}
          </span>
          N-Coin
        </v-card-text>
        <v-card-actions>
          <v-btn @click="goEditCard" class="ml-2" outlined rounded small>
            Charge Credit
          </v-btn>
        </v-card-actions>
      </div>
      <v-avatar class="ma-3" height="120" width="200" tile>
        <v-img
          :src="`https://bankmeister.com/assets/images/card/693.png`"
        ></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

export default {
  props: ["user"],
  data: () => ({
    coinWallet: 0
  }),
  created() {
    axios
      .get(`${SERVER.BASE_URL}auth/getuser?username=${this.user.username}`)
      .then(res => {
        this.coinWallet = res.data.money;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goEditCard() {
      this.$router.push({ name: "Pay" });
    }
  }
};
</script>

<style></style>
