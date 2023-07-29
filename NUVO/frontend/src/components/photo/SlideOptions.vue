<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#DDA288" dark v-bind="attrs" v-on="on">
        Slide Option
      </v-btn>
    </template>

    <v-card class="mx-auto" max-width="800">
      <v-toolbar flat color="#DDA288" dark>
        <v-toolbar-title>Slide Options</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn color="error" elevation="10" @click="saveCancel">
          <span> CANCEL </span>
          <v-icon>mdi-close-box</v-icon>
        </v-btn>
        <v-btn color="secondary" elevation="10" @click="saveOption">
          <span> SAVE </span>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <h2 class="title mb-2">
          Choose 2D animations (슬라이드쇼 효과)
        </h2>

        <v-chip-group
          v-model="pick1"
          active-class="pink pink--text"
          column
          multiple
        >
          <v-chip
            v-for="(opt, idx) in transitions2D"
            :key="idx"
            filter
            outlined
          >
            {{ opt }}
          </v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-text>
        <h2 class="title mb-2">
          Choose 3D animations (슬라이드쇼 효과)
        </h2>

        <v-chip-group
          v-model="pick2"
          active-class="indigo indigo--text"
          column
          multiple
        >
          <v-chip
            v-for="(opt, idx) in transitions3D"
            :key="idx"
            filter
            outlined
          >
            {{ opt }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    /**
      2D transitions
        Fade: fades from one image to next.
        Kenburn: fades, zoom and moves current image to next.
        Swipe: swipes the image to display next like uncovered with a curtain.
        Slide: slides the image horizontally revealing the next.
        Waterfall: divides the image in bars and drops them down in turns.
        Zip: divides the image in bars and slides them up and down alternately like a zip.
        Blinds 2D: divides the image in vertical bars that blinds and fades out.
        Blocks 1: the image is splited in blocks that shrink and fade out randomly.
        Blocks 2: the image is splited in blocks that shrink and fade out in wave from a corner to the opposite.
        Concentric: a concentric effect is performed by rotating the image converted into circles.
        Warp: a concentric effect is performed by rotating the image converted into circles in alternate direction.
        Camera: from outside to inside the image is being circled in black like a camera.
      3D transitions
        Cube: turns the image to a side like if place in a cube.
        Book: makes the effect of turning a page to display next image.
        Fall: the image falls in front displaying next image.
        Wave: makes the image 3D and divides it in slices that turn vertically to display the next image.
        Blinds 3D: divides the image in vertical bars that blinds 180 deg to form the next image.
        Round 1: the image is splited in blocks that turn 180 deg horizontally to form next image.
        Round 2: panels start to round vertically revealing the next image in upper arrow form leaving trail.
        Explode: the image starts to explode from the center to outside.
     */
    transitions2D: [
      "fade",
      "kenburn",
      "swipe",
      "slide",
      "waterfall",
      "zip",
      "blinds2d",
      "blocks1",
      "blocks2",
      "concentric",
      "warp",
      "camera"
    ],
    transitions3D: [
      "cube",
      "book",
      "fall",
      "wave",
      "blinds3d",
      "round1",
      "round2",
      "explode"
    ],
    pick1: [],
    pick2: [],
    prePick1: [],
    prePick2: [],
    vfTransitions: []
  }),
  methods: {
    saveCancel() {
      this.pick1 = this.prePick1;
      this.pick2 = this.prePick2;
      this.dialog = false;
    },
    saveOption() {
      this.prePick1 = this.pick1;
      this.prePick2 = this.pick2;

      this.vfTransitions = [];
      for (const i in this.pick1) {
        this.vfTransitions.push(this.transitions2D[this.pick1[i]]);
      }
      for (const i in this.pick2) {
        this.vfTransitions.push(this.transitions3D[this.pick2[i]]);
      }

      this.$emit("optionChanged", this.vfTransitions);
      this.dialog = false;
    }
  }
};
</script>

<style></style>
