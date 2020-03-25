<template>
  <div>
    <div class="content">
      <FrontSection :episodes="limitEpisodes(movies)" :sectionTitle="'Filmi'" :limitLength="false"></FrontSection>
    </div>
    <Navigation :showsLength="movies.length" v-on:pageChange="onPageChange($event)"></Navigation>
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
    Navigation,
    Card,
    Header,
    FrontSection
  }
})
export default class extends Vue {
  @State movies?: Media[];

  sliceStart = 0;
  sliceEnd = 64;

  async mounted() {
    if (await !this.$store.getters.totalMoviesLoaded()) {
      await this.$store.dispatch('GET_MOVIES');
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
