<template>
  <v-container fluid ma-0 pa-0>
    <SideNavBar />

    <ScrollFixed />

    <AppDownload />
    <Goal />
    <Services />
    <Pricing />
    <Profolio />
    <Impression />
  </v-container>
</template>

<script>
import SideNavBar from "@/components/navigation/SideNavBar.vue";
import ScrollFixed from "@/components/about/ScrollFixed.vue";
import AppDownload from "@/components/about/AppDownload.vue";
import Goal from "@/components/about/Goal.vue";
import Services from "@/components/about/Services.vue";
import Pricing from "@/components/about/Pricing.vue";
import Profolio from "@/components/about/Profolio.vue";
import Impression from "@/components/about/Impression.vue";

export default {
  components: {
    SideNavBar,
    ScrollFixed,
    AppDownload,
    Goal,
    Services,
    Pricing,
    Profolio,
    Impression
  }
};
</script>

<style scoped></style>
