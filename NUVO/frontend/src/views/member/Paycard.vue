<template>
  <div class="wrapper">
    <div class="wrapper-center">
      <!-- Header -->
      <CardForm
        :form-data="formData"
        @input-card-number="updateCardNumber"
        @input-card-name="updateCardName"
        @input-card-month="updateCardMonth"
        @input-card-year="updateCardYear"
        @input-card-cvv="updateCardCvv"
      />

      <!-- Follower -->
    </div>
  </div>
</template>

<script>
import CardForm from "@/components/member/profile/CardForm";

export default {
  name: "scale",
  components: {
    CardForm
  },
  data() {
    return {
      focused: null,
      colors: ["#ff4f66", "#7971ea", "#5900d8"],
      formData: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: ""
      }
    };
  },
  methods: {
    updateCardNumber(val) {
      this.formData.cardNumber = val;
    },
    updateCardName(val) {
      this.formData.cardName = val;
    },
    updateCardMonth(val) {
      this.formData.cardMonth = val;
    },
    updateCardYear(val) {
      this.formData.cardYear = val;
    },
    updateCardCvv(val) {
      this.formData.cardCvv = val;
    }
  }
};
</script>

<style lang="css" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.wrapper-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 100%;
  background: #5a4e4d;
}
</style>
