<template>
  <div class="about section bg-grey" id="about">
    <v-container>
      <div class="title-section">
        <p>OUR GOAL</p>
        <h3>Innovating the way</h3>
        <h3>people encounter their memories</h3>
      </div>
      <v-row>
        <v-col md="4">
          <div class="content">
            <v-icon>mdi-earth</v-icon>
            <h5>Travel</h5>
            <p class="mb-0">
              여행 사진 공유 Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Earum, natus recusandae!
            </p>
          </div>
        </v-col>
        <v-col md="4">
          <div class="content">
            <v-icon>mdi-book-open-page-variant </v-icon>

            <h5>Smart Gallery</h5>
            <p class="mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit Ea
              laudantium empore nobis quisquam.
            </p>
          </div>
        </v-col>
        <v-col md="4">
          <div class="content">
            <v-icon>mdi-virtual-reality</v-icon>
            <h5>Virtual Reality</h5>
            <p class="mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit Ea
              laudantium empore nobis quisquam.
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* about us */
.about .content {
  background: #fff;
  border-radius: 15px;
  text-align: center;
  padding: 30px;
  cursor: default;
}

.about .content i {
  font-size: 56px;
  color: #614cab;
}

.about .content h5 {
  margin-top: 25px;
  margin-bottom: 15px;
  font-size: 20px;
}

.about .content:hover {
  background: #614cab;
  color: #fff;
  transition: 0.7s ease-out;
  box-shadow: 0 12px 30px -15px rgba(0, 0, 0, 0.2);
}

.about .content:hover i {
  color: #fff;
}

.about .content:hover h5 {
  color: #fff;
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

.title-section h3 span {
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #614cab;
}
</style>
