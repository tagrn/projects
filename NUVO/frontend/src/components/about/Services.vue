<template>
  <div class="services section bg-grey" id="services">
    <v-container>
      <div class="title-section">
        <p>SERVICES</p>
        <h3>NUVO provides</h3>
        <h3>awesome services</h3>
      </div>
      <v-row>
        <v-col md="4" v-for="(content, idx) in contents" :key="idx">
          <div class="content">
            <v-icon>{{ content.icon }}</v-icon>
            <h5>{{ content.subtitle }}</h5>
            <p class="mb-0">
              {{ content.text }}
            </p>
          </div>
        </v-col>
      </v-row>
      <div class="completed">
        <v-row>
          <v-col md="4">
            <h4>540</h4>
            <span>Pictures</span>
          </v-col>
          <v-col md="4">
            <h4>831</h4>
            <span>Visitors</span>
          </v-col>
          <v-col md="4">
            <h4>65</h4>
            <span>Members</span>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contents: [
        {
          icon: "mdi-map-search",
          subtitle: "Worldmap",
          text: "세계 지도를 따라 대륙별 탐색 기능"
        },
        {
          icon: "mdi-lock-check",
          subtitle: "Secured",
          text:
            "Spring Security, JWT를 통한 인증, 인가 MD5 Hash 알고리즘을 통한 이미지 데이터 보호"
        },
        {
          icon: "mdi-comment-alert",
          subtitle: "Tips",
          text: "처음 방문하는 사용자를 위한 웹 사이트 사용 가이드 제공"
        },
        {
          icon: "mdi-arrange-bring-to-front",
          subtitle: "Animation",
          text: "다양한 애니메이션 기능"
        },
        {
          icon: "mdi-panorama",
          subtitle: "Photo VR Viewer",
          text: "파노라마 사진을 VR로 감상"
        },
        {
          icon: "mdi-cash",
          subtitle: "Easy Payment",
          text: "카카오 Pay 연동"
        }
      ]
    };
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
  -webkit-text-stroke-color: #614cab;
}

/* services */
.services .content {
  background: #fff;
  border-radius: 15px;
  text-align: center;
  padding: 30px;
  cursor: default;
  margin-bottom: 30px;
}

.services .content i {
  font-size: 56px;
  color: #614cab;
}

.services .content h5 {
  margin-top: 25px;
  margin-bottom: 15px;
  font-size: 20px;
}

.services .content:hover {
  background: #614cab;
  color: #fff;
  transition: 0.7s ease-out;
  box-shadow: 0 12px 30px -15px rgba(0, 0, 0, 0.2);
}

.services .content:hover i {
  color: #fff;
}

.services .content:hover h5 {
  color: #fff;
}

.services .completed {
  background: #fff;
  text-align: center;
  padding: 60px 0;
  border-radius: 15px;
  margin-top: 62px;
  margin-bottom: 10px;
}

.services .completed h4 {
  font-size: 58px;
  font-weight: 600;
  color: #614cab;
}

.services .completed span {
  font-size: 24px;
  font-weight: 500;
}
</style>
