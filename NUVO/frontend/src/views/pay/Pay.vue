<template>
  <v-container>
    <v-btn
      elevation="3"
      fab
      color="orange darken-3"
      style="position:fixed; right:25px; top:20px; color:white;"
      @click="clickGotoBack"
    >
      <v-icon>
        mdi-arrow-left-bold-circle
      </v-icon>
    </v-btn>
    <v-row>
      <v-col cols="12">
        <div style="widht:100%; height:80px;"></div>
      </v-col>
      <!-- 현재 코인 잔액 표시 -->
      <v-col cols="12" class="d-flex justify-center align-center">
        <div>
          <span
            class="d-flex align-end"
            style="font-weight: bold; font-size: 25px; color:#eeeeee;"
          >
            현재 코인 :
            <div class="d-flex" style="width: 20px;"></div>
            <span
              class="d-flex align-end"
              style="font-weight: bold; font-size: 50px; color:yellow; line-height:50px"
            >
              {{ coinWallet }}
            </span>
            <div class="d-flex" style="width: 10px;"></div>
            N-Coin
          </span>
        </div>
      </v-col>
      <!-- 페이 충전 타이틀 -->
      <v-col cols="12" class="d-flex justify-center align-center">
        <img src="@/assets/kakaologo.png" alt="" width="150px" />
        <pre></pre>
        <span style="font-weight: bold; font-size: 25px; color:#eeeeee;"
          >카카오페이 충전</span
        >
      </v-col>
      <!-- 금액 선택 -->

      <v-col
        md="4"
        xl="4"
        cols="6"
        v-for="(money, idx) in moneylist"
        :key="idx"
      >
        <div
          style="width:90%; height:100%; border:2px solid; border-color:yellow;"
          :class="{
            'hoverevent-select-charge-money': true,
            'select-charge-money': selectChargeMoney[idx]
          }"
          @click="clickChargeMoney(idx)"
        >
          <div style="height:20px"></div>
          <div class="d-flex justify-center">
            <span style="font-weight: bold; font-size: 25px; color:yellow;">{{
              NCoinlist[idx]
            }}</span>
            <pre></pre>
            <span
              style="font-weight: bold; font-size: 18px; color:#eeeeee; line-height:40px"
              >N-Coin 충전</span
            >
          </div>
          <div
            class="d-flex justify-center"
            style="font-weight: bold; font-size: 18px; color:#eeeeee; line-height:40px"
          >
            <span style="font-size: 30px">{{ money }}</span>
            <pre></pre>
            <span style="line-height: 45px"> 원 </span>
          </div>
          <div style="height:20px"></div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-start"
        style="color: yellow; font-weight:bold; font-size:15px;"
      >
        ※ 카카오페이의 최소 충전금액은 5,000원이며 최대 충전금액은
        50,000원입니다.
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-center"
        style="color: yellow; font-weight:bold; font-size:15px;"
      >
        <v-btn
          id="charge_kakao"
          style="background-color: yellow; font-size:25px; color:#222222; font-family:'S-CoreDream-8Heavy'; width: 280px; height: 50px;"
          @click="charge"
          v-if="selectMoney != null"
        >
          {{ selectMoney }}원 결제하기
        </v-btn>
        <div v-else style="color: white; font-weight:bold; font-size:25px;">
          결제하실 금액을 선택해주세요.
        </div>
      </v-col>
      <button></button>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

export default {
  name: "Pay",
  data: function() {
    return {
      coinWallet: 0,
      moneylist: [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000],
      NCoinlist: [50, 100, 150, 220, 275, 330, 385, 450, 600],
      selectChargeMoney: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      selectMoney: null
    };
  },
  created: function() {
    axios
      .get(
        `${SERVER.BASE_URL}auth/getuser?username=${this.$store.state.Auth.authToken.username}`
      )
      .then(res => {
        this.coinWallet = res.data.money;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    clickChargeMoney: function(idx) {
      this.selectMoney = this.moneylist[idx];
      this.selectChargeMoney = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];
      this.selectChargeMoney[idx] = true;
      console.log(this.selectMoney + "원 선택");
    },
    charge() {
      const money = this.selectMoney;
      console.log(money);
      const formData = new FormData();
      formData.append("username", this.$store.state.Auth.authToken.username);
      formData.append("cost", money);
      // 수정부분
      axios
        .post(`${SERVER.PAY_BASE_URL}kakao`, formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.Auth.authToken.token,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          try {
            window.location.href = response.data;
          } catch {
            alert("결제 실패");
          }
        })
        .catch(function() {
          console.log("FAILURE");
        });
    },
    clickGotoBack() {
      this.$router.push({name:"Profile"})
    }
  }
};
</script>

<style>
@font-face {
  font-family: "S-CoreDream-8Heavy";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.hoverevent-select-charge-money:hover {
  opacity: 0.5;
  transform: scale(1.07);
  transition: 150ms;
  cursor: pointer;
}

.select-charge-money {
  background-color: #f4ce00;
}
</style>
