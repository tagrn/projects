<template>
  <div class="portfolio section" id="portfolio">
    <v-container>
      <div class="title-section">
        <p>PORTFOLIO</p>
        <h3>See our<span> amazing</span></h3>
        <h3><span>NUVO Team</span> members!</h3>
      </div>
      <div class="box-content">
        <div class="portfolio-filter-menu">
          <ul>
            <li data-filter="all" class="active">
              <span>Show All</span>
            </li>
            <li data-filter="1">
              <span>Frontend</span>
            </li>
            <li data-filter="2">
              <span>Backend</span>
            </li>
            <li data-filter="3">
              <span>Specialist</span>
            </li>
          </ul>
        </div>

        <v-row no-gutters class="filtr-container">
          <v-col
            v-for="(member, idx) in members"
            :key="idx"
            md="4"
            sm="6"
            xs="12"
            class="filtr-item"
            :data-category="member.category"
          >
            <div class="content-image">
              <img :src="member.image" alt="" />
              <div class="image-overlay"></div>
              <div class="portfolio-caption">
                <div class="title">
                  <h4>{{ member.name }}</h4>
                  <span>{{ member.role }}</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import $ from "jquery";
import Filterizr from "filterizr";

Filterizr.installAsJQueryPlugin($);

export default {
  data() {
    return {
      members: [
        {
          category: "2",
          image: require("@/assets/images/aboutPage/member1.png"),
          name: "DongGeol Kim",
          role: "[Backend] Leader Developer",
          desc: "Database, Springboot"
        },
        {
          category: "1, 3",
          image: require("@/assets/images/aboutPage/member2.png"),
          name: "MinHo Jang",
          role: "[Frontend] [VR] Developer",
          desc: ""
        },
        {
          category: "2",
          image: require("@/assets/images/aboutPage/member3.png"),
          name: "TaeJin Kim",
          role: "[Backend] Developer",
          desc: ""
        },
        {
          category: "1",
          image: require("@/assets/images/aboutPage/member4.png"),
          name: "TaeWan Gu",
          role: "[Frontend] Developer",
          desc: ""
        },
        {
          category: "3",
          image: require("@/assets/images/aboutPage/member5.png"),
          name: "SoJin Kwan",
          role: "Early member",
          desc: ""
        }
      ]
    };
  },
  mounted() {
    // porfolio filterizr
    const filterizr = $(".filtr-container").filterizr();

    // portfolio filter
    $(".portfolio-filter-menu li").on("click", function() {
      $(".portfolio-filter-menu li").removeClass("active");
      $(this).addClass("active");
    });
  }
};
</script>

<style scoped>
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
  -webkit-text-stroke-color: #dda288;
}

/*portfolio*/
.portfolio .row .col-md-4 {
  padding: 15px;
}

.portfolio .portfolio-filter-menu {
  margin-bottom: 30px;
  text-align: center;
}

.portfolio .portfolio-filter-menu ul li {
  display: inline-block;
  margin: 0 10px;
  border: 1px solid #614cab;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 1px;
  transition: 0.4s ease-in-out;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 6px;
}

.portfolio .portfolio-filter-menu ul li span {
  z-index: 99;
  position: relative;
}

.portfolio .portfolio-filter-menu ul li.active {
  background: #614cab;
  color: #fff;
}

.portfolio .content-image {
  position: relative;
}

.portfolio .content-image:hover .image-overlay {
  opacity: 0.7;
}

.portfolio .content-image:hover .portfolio-caption {
  opacity: 1;
}

.portfolio .content-image img {
  width: 100%;
  height: 270px;
  border-radius: 15px;
}

@media (min-width: 1904px) {
  .portfolio .content-image img {
    width: 100%;
    height: 500px;
    border-radius: 15px;
  }
}

.portfolio .content-image img:visited {
  outline: none;
}

.portfolio .content-image img:focus {
  outline: none;
}

.portfolio .content-image .portfolio-caption {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 40%;
  color: #333;
  text-align: center;
  opacity: 0;
  transition: all 0.5s ease;
  color: #fff;
}

.portfolio .content-image .portfolio-caption h4 {
  font-size: 20px;
  color: #333;
  font-weight: 600;
  color: #fff;
}

.portfolio .content-image .portfolio-caption .subtitle {
  margin-top: 22px;
  top: 52px;
  position: relative;
  text-align: right;
}

.portfolio .content-image .portfolio-caption ul li {
  display: inline-block;
  margin: 0 5px;
}

.portfolio .content-image .portfolio-caption i {
  width: 30px;
  height: 30px;
  background: #333;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  color: #fff;
}

.portfolio .content-image .image-overlay {
  background: #614cab;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
  opacity: 0;
  transition: all 0.5s ease;
  margin: auto;
}
</style>
