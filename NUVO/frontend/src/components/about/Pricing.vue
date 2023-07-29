<template>
  <div class="pricing section" id="pricing">
    <v-container>
      <div class="title-section">
        <p>PRICING TABLE</p>
        <h3>Your plance, your choise</h3>
      </div>
      <v-row>
        <v-col md="4">
          <div class="content">
            <h4>Basic</h4>
            <span>$5</span>
            <ul>
              <li>Access selected content</li>
              <li>Access to VR viewer</li>
              <li class="not-active">Support</li>
              <li class="not-active">Multimedia</li>
              <li class="not-active">Creative</li>
              <li class="not-active">Modern</li>
              <li class="not-active">Free Update</li>
            </ul>
          </div>
          <button class="button">Get Started</button>
        </v-col>
        <v-col md="4">
          <div class="content">
            <h4>Standard</h4>
            <span>$50</span>
            <ul>
              <li>Access every content(1 month)</li>
              <li>Access to VR viewer</li>
              <li>Support</li>
              <li>Multimedia</li>
              <li class="not-active">Creative</li>
              <li class="not-active">Modern</li>
              <li class="not-active">Free Update</li>
            </ul>
          </div>
          <button class="button">Get Started</button>
        </v-col>
        <v-col md="4">
          <div class="content">
            <h4>Premium</h4>
            <span>$200</span>
            <ul>
              <li>Access every content(unlimited)</li>
              <li>Access to VR viewer</li>
              <li>Support</li>
              <li>Multimedia</li>
              <li>Creative</li>
              <li>Modern</li>
              <li>Free Update</li>
            </ul>
          </div>
          <button class="button">Get Started</button>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  mounted() {
    $(".pricing .content").on("mouseover", function() {
      $(".pricing .content").removeClass("content-center");
      $(this).addClass("content-center");
    });
  }
};
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}

ul li {
  list-style-type: none;
}
/* button */
.button {
  background: #ffb005;
  padding: 12px 30px;
  font-weight: 500;
  font-size: 15px;
  border-radius: 5px;
  color: #fff;
  letter-spacing: 1px;
  margin-top: 22px;
  display: inline-block;
  border: 2px solid transparent;
}

/* section */
.section {
  padding: 90px 0 100px;
}

.title-section {
  text-align: center;
  margin-bottom: 50px;
}

.title-section p {
  color: #dda288;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 15px;
  display: block;
}

.title-section h3 {
  color: white;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 6px;
}

/* pricing */
.pricing {
  text-align: center;
  padding-bottom: 76px;
}

.pricing .content {
  background: #f9f8fc;
  text-align: center;
  border-radius: 15px;
  padding: 35px 0 46px;
}

.pricing .content h4 {
  font-size: 24px;
}

.pricing .content span {
  font-size: 38px;
  color: #614cab;
  display: block;
  margin: 14px;
  font-weight: 600;
}

.pricing .content ul li {
  font-size: 19px;
  font-weight: 500;
  margin-bottom: 15px;
}

.pricing .content ul li.not-active {
  color: #ddd;
}

.pricing .content-center {
  background: #614cab;
}

.pricing .content-center h4 {
  color: #fff;
}

.pricing .content-center span {
  color: #fff;
}

.pricing .content-center ul li {
  color: #fff;
}

.pricing .content-center ul li.not-active {
  color: #aaa;
}

.pricing .button {
  position: relative;
  bottom: 46px;
  margin-bottom: -46px;
}
</style>
