<template>
  <div>
    <!-- 누보 뜻 보여주기 -->
    <div class="d-flex justify-center">
      <v-btn
        color="#DDA288"
        class="mt-12"
        style="color:white; font-size:20px;"
        @click="overlay = !overlay"
      >
        NUVO?
      </v-btn>
    </div>
    <v-overlay :absolute="absolute" :opacity="opacity" :value="overlay">
      <div style="text-align:center; font-size:20px;">
        20세기 초,
      </div>
      <br />
      <div style="text-align:center; font-size:20px;">
        유럽의 일부 예술가들은 전통적인 고전주의적 미술 양식에서 탈피해 새로운
        방식의 미술을 탐구했습니다.
      </div>
      <br />
      <div style="text-align:center; font-size:20px;">
        '새로운 예술(Art Nouvueau)'이라고 불리는 이러한 예술 양식은 대중들에게
        신선한 충격을 주었으나
      </div>
      <br />
      <div style="text-align:center; font-size:20px;">
        20세기의 거대한 산업혁명 물결에 금방 매몰되고 말았습니다. 우리는 이들의
        정신을 계승하여,
      </div>
      <br />
      <div style="text-align:center; font-size:20px;">
        포스트 모더니즘 시대에 사람들이 예술을 접하는 방식을 혁신합니다.
      </div>
      <br /><br />
      <div style="text-align:center; font-size:30px;">
        그것이 우리 'NUVO'의 철학입니다.
      </div>
      <br /><br />
      <div style="text-align:center;">
        <v-btn color="#DDA288" @click="overlay = false" style="color:white">
          돌아가기
        </v-btn>
      </div>
    </v-overlay>
    <br /><br /><br /><br />
  </div>
</template>

<script>
export default {
  name: "NUVOExplanation",
  data: function() {
    return {
      absolute: true,
      overlay: false,
      opacity: 1
    };
  }
};
</script>

<style></style>
