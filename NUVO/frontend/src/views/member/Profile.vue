<template>
  <div>
    <SideNavBar />
    <v-btn
      elevation="3"
      fab
      color="orange darken-3"
      style="position:fixed; right:40px; top:20px; color:white;"
      @click="clickGotoWorldmap"
    >
      <v-icon>
        mdi-map-search
      </v-icon>
    </v-btn>
    <div class="wrapper">
      <div class="wrapper-center">
        <!-- Header -->
        <ProfileForm />

        <!-- Follower -->
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from "@/components/navigation/SideNavBar.vue";
import ProfileForm from "@/components/member/profile/ProfileForm";

export default {
  name: "scale",
  components: {
    SideNavBar,
    ProfileForm
  },
  data() {
    return {};
  },
  methods: {
    clickGotoWorldmap: function() {
      this.$router.push({ name: "WorldMap" });
    }
  }
};
</script>

<style scoped>
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
