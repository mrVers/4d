<template>
  <section class="section">
    <div class="media-container">
      <Card
        v-for="episode in results"
        :key="episode.recordingId"
        :episode="episode">
      </Card>
      <template v-if="!results.length && searching">
        <SkeletonCard v-for="skeleton of Array(10)" :key="skeleton"></SkeletonCard>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import Card from "~/components/Card.vue"
import { Media } from '~/types';
import SkeletonCard from '~/components/SkeletonCard.vue';

@Component({
  components: {
    Card,
    SkeletonCard
  }
})
export default class SearchSection extends Vue {
  @Prop() results?: Media[];
  @Prop() searching?: boolean;
}
</script>

<style scoped lang="scss">
  .section {
    margin-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    @media (min-width: 448px) {
      margin-top: 48px;
    }
  }

  .media-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 24px;
  }
</style>
