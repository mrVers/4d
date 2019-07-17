<template>
  <section class="section">
    <div class="title-container">
      <h2>{{ sectionTitle }}</h2>
    </div>
    <div class="media-container">
      <Card
        v-for="episode in limitEpisodes(episodes, sectionLimit)"
        :key="episode.recordingId"
        :episode="episode">
      </Card>
      <template v-if="!episodes.length">
        <SkeletonCard v-for="skeleton of Array(10)" :key="skeleton"></SkeletonCard>
      </template>
    </div>
    <div class="show-more">
      <button class="show-more-btn" @click="showToggle()">Pokaži {{ sectionLimit === 20 ? 'manj' : 'več' }}</button>
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
export default class extends Vue {
  @Prop() episodes?: Media[];
  @Prop() sectionTitle;

  sectionLimit = 10;

  limitEpisodes(episodes, length = 10) {
    if (!!episodes) {
      return episodes.slice(0, length);
    }
  }

  showToggle() {
    this.sectionLimit = this.sectionLimit === 20 ? 10 : 20;
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

  .content {
    flex: none;
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 428px;

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

  .show-more {
    margin-bottom: 24px;
  }
  .show-more-btn {
    background-color: transparent;
    color: #fff;
    padding: 8px 10px;
    font-size: 14px;
    border: 1px solid #444;
    cursor: pointer;
    transition: border ease-in-out 0.1s;
    outline: none;

    &:hover {
      border: 1px solid #999;
    }
  }
</style>
