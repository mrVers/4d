<template>
  <div>
    <div class="content">
      <FrontSection :episodes="shows" :sectionTitle="'Najnovejši dokumentarci'" :limitLength="true"></FrontSection>
      <FrontSection :episodes="movies" :sectionTitle="'Najnovejši filmi'" :limitLength="true"></FrontSection>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { State } from "vuex-class"
import Card from "~/components/Card.vue"
import Header from '~/components/Header.vue';
import FrontSection from '~/components/FrontSection.vue';
import { Media } from '~/types';


@Component({
  components: {
    Card,
    Header,
    FrontSection
  }
})
export default class extends Vue {
  @State movies?: Media[];
  @State shows?: Media[];

  async mounted() {
    await this.$store.dispatch('GET');
  }
}
</script>

<style scoped lang="scss">
  .content {
    flex: none;
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0 24px;

    @media (min-width: 448px) {
      width: 428px;
      padding: 0;
    }

    @media (min-width: 662px) {
      width: 664px;
    }

    @media (min-width: 876px) {
      width: 856px;
    }

    @media (min-width: 1090px) {
      width: 1070px;
    }
  }
</style>
