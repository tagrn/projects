<template>
  <div>
    <!--=============================== Contents[FIXED] =============================== -->
    <!-- SOCIAL MEDIA(fixed)   =============================== -->
    <div class="media">
      <ul>
        <li>
          <a
            style="color: inherit;"
            href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp"
            >SSAFY</a
          >
        </li>
        <li>
          <a
            style="color: inherit;"
            href="https://lab.ssafy.com/s04-webmobile2-sub3/s04p13d110"
            >Github</a
          >
        </li>
        <li>@2021</li>
      </ul>
    </div>
    <!-- SCROLLDOWN(fixed)    =============================== -->
    <div class="scrolldown">scroll down</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  color: white;
}
/* FIXED =========================== */
/* SOCIAL MEDIA */
.media {
  position: fixed;
  top: 350px;
  right: -90px;
  transform: rotate(-90deg);
}

.media ul li {
  display: inline-block;
  padding: 0 20px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
}

/* SCROLLDOWN */
.scrolldown {
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 5px;

  position: fixed;
  bottom: 110px;
  left: -60px;
  transform: rotate(-90deg);
}

.scrolldown::before {
  content: "";
  border: 1px solid #fff;
  width: 100px;
  margin: 0 20px 0 0;
  transform: translateY(-3px);
  opacity: 0.5;
  display: inline-block;
}
</style>
