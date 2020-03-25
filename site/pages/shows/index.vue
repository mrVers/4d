<template>
  <div>
    <div class="content">
      <FrontSection :episodes="limitEpisodes(shows)" :sectionTitle="'Dokumentarci'" :limitLength="false"></FrontSection>
    </div>
    <Navigation :showsLength="shows.length" v-on:pageChange="onPageChange($event)"></Navigation>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { State } from "vuex-class"
import Card from "~/components/Card.vue"
import Header from '~/components/Header.vue';
import FrontSection from '~/components/FrontSection.vue';
import { Media } from '~/types';
import Navigation from '~/components/Navigation.vue';

@Component({
  components: {
    Card,
    Header,
    FrontSection,
    Navigation
  }
})
export default class extends Vue {
  @State shows?: Media[];

  sliceStart = 0;
  sliceEnd = 64;

  async mounted() {
    if (await !this.$store.getters.totalShowsLoaded()) {
      await this.$store.dispatch('GET_DOCS');
    }
  }

  limitEpisodes(episodes): Media[] {
    if (!!episodes) {
      return episodes.slice(this.sliceStart, this.sliceEnd);
    }
    return [];
  }

  onPageChange(event) {
    this.sliceStart = event.sliceStart;
    this.sliceEnd = event.sliceEnd;
    window.scrollTo(0, 0);
  }
}
</script>

<style scoped lang="scss">

</style>
