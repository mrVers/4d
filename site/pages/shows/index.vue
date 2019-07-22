<template>
  <div>
    <div class="content">
      <FrontSection :episodes="shows" :sectionTitle="'Dokumentarci'" :limitLength="false"></FrontSection>
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
  @State shows?: Media[];

  async mounted() {
    await this.$store.dispatch('GET_DOCS');
  }
}
</script>

<style scoped lang="scss">

</style>
