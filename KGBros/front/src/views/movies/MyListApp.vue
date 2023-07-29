<template>
  <div id="mylistapp">
    <br>
    <br>
    <br>
    <br>
    <b-button variant="success" style="trasform:scale(3.0)"
    @click="getDownload"
    >다운로드</b-button>
  </div>
</template>

<script>
export default {
  name: "MyListApp",
  methods: {
    getDownload: function () {
      window.open("https://drive.google.com/u/0/uc?id=1nqj_7auBigTUO_XmRRTdOUhYQwEclRKq&export=download")
    }
  }
}
</script>

<style>

</style>