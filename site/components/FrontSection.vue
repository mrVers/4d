<template>
  <section class="section">
    <div class="title-container">
      <h2>{{ sectionTitle }}</h2>
    </div>
    <div class="media-container">
      <Card
        v-for="episode in limitEpisodes(episodes, episodeLimit)"
        :key="episode.recordingId"
        :episode="episode">
      </Card>
      <template v-if="!episodes.length">
        <SkeletonCard v-for="skeleton of Array(episodeLimit)" :key="skeleton"></SkeletonCard>
      </template>
      <template v-if="episodes.length === 16 && !limitLength">
        <SkeletonCard v-for="skeleton of Array(48)" :key="skeleton"></SkeletonCard>
      </template>
    </div>
    <div class="show-more" v-if="limitLength">
      <button class="show-more-btn" @click="showMore()">Pokaži {{ isShowMore ? 'več' : 'manj' }}</button>
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
export default class FrontSection extends Vue {
  @Prop() episodes?: Media[];
  @Prop() sectionTitle?: string;
  @Prop() limitLength?: boolean;

  isShowMore = true;

  limitEpisodes(episodes, length = 8): Media[] {
    if (!!episodes) {
      return episodes.slice(0, length);
    }
    return [];
  }

  showMore() {
    this.isShowMore = !this.isShowMore;
  }

  get episodeLimit() {
    return this.limitLength ? this.isShowMore ? 8 : 16 : this.episodes && !!this.episodes.length ? this.episodes.length : 64;
  }

}
</script>

<style scoped lang="scss">
  .section {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .title-container {
    margin-top: 24px;
    h2 {
      display: block;
      max-height: 2rem;
      overflow: hidden;
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2rem;
      margin: 0;
    }
  }

  .media-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 24px;
  }

  .show-more {
    margin-bottom: 24px;
  }
  .show-more-btn {
    background-color: transparent;
    color: #fff;
    padding: 8px 10px;
    font-size: 1.4rem;
    border: 1px solid #444;
    cursor: pointer;
    transition: border ease-in-out 0.1s;
    outline: none;

    &:hover {
      border: 1px solid #999;
    }
  }
</style>
