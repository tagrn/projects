<template>
  <div>
    <div v-for="(file, idx) in files" :key="idx">
      <img :src="file.filepath" :alt="idx" />
    </div>
    <div v-if="this.userid === files[0].author">
      <button @click="deletePost">삭제</button>
      <button @click="fixPost">수정</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

export default {
  data() {
    return {
      files: [],
      index: 0,
      // userid : localStorage.user.username,
      userid: "ssafy"
    };
  },
  created() {
    // 해당 게시물에 대한 정보 가져오기
    const id = this.$route.query.id;
    axios
      .get(`${SERVER.BOARD_BASE_URL}getposts?id=${id}`)
      .then(response => {
        this.files = response.data;
        console.log(this.files);
      })
      .catch(function() {
        console.log("x");
      });
  },
  methods: {
    deletePost() {
      if (confirm("정말로 삭제")) {
        axios
          .delete(
            `${SERVER.BOARD_BASE_URL}/delpost?id=${this.$route.query.id}`,
            {
              headers: {
                Authorization:
                  "Bearer " +
                  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlaGRyamYiLCJpYXQiOjE2MTIwODEwNTMsImV4cCI6MTYxMjE2NzQ1M30.YipqqNrw_PpswmLAKXP7IAj9a20FPXOaWIcqhAB2JPZkiCq8X2Uth1gc_3l-CplTK3TEzOV3IHNZdfiW0mrn7w"
              }
            }
          )
          .then(response => {
            alert("삭제되었습니다.");
            this.$router.push("/view");
          })
          .catch(function() {
            console.log("x");
          });
      }
    },
    fixPost() {
      this.$router.push("/fix");
    }
  }
};
</script>

<style></style>
