<template>
  <section>
    <h1 class="header">4D</h1>
    <div class="cards">
      <Card
        v-for="episode in episodes"
        :key="episode.recordingId"
        :episode="episode"
      ></Card>
    </div>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
import Card from "~/components/Card.vue"

@Component({
  components: {
    Card
  }
})
export default class extends Vue {
  @State episodes?: any;

  async mounted() {
    await (this as any).$store.dispatch('GET');
    console.log(this.episodes);
  }
}
</script>

<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
