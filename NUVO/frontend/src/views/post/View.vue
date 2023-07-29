<template>
  <div>
    <div
      v-for="(file, index) in files"
      :key="index"
      class="file-preview-wrapper"
    >
      <img :src="file.filepath" :name="file.id" @click="moveToDetail" />
    </div>
  </div>
</template>
<script
  type="text/javascript"
  src="https://code.jquery.com/jquery-1.12.4.min.js"
></script>
<script
  type="text/javascript"
  src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
></script>
<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

export default {
  data() {
    return {
      files: [],
      listNum: 0,
      index: 0
    };
  },
  created: function() {
    axios
      .get(`${SERVER.BOARD_BASE_URL}allview`)
      .then(response => {
        this.files = response.data;
        this.index = response.data.length;
        console.log(this.files);
        console.log(this.index);
      })
      .catch(function() {
        console.log("안됨");
      });
  },
  methods: {
    // 해당 페이지로 이동
    moveToDetail(e) {
      const no = e.target.getAttribute("name");
      console.log(no);
      this.$router.push("/detail?id=" + no);
    }
  }
};
</script>

<style></style>
