<template>
  <v-card color="#8593ae" dark>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">My Profile</v-card-title>

        <v-card-subtitle>
          <v-icon>mdi-shield-account</v-icon>
          {{ user.username }}
        </v-card-subtitle>
        <v-card-actions>
          <EditPassword />
        </v-card-actions>
      </div>
      <v-avatar class="ma-3" height="120" width="200" tile> </v-avatar>
    </div>
  </v-card>
</template>

<script>
import EditPassword from "@/components/member/profile/EditPassword.vue";

export default {
  props: ["user"],
  components: {
    EditPassword
  }
};
</script>

<style></style>
