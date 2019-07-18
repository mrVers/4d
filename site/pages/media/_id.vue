<template>
  <section class="video-section">
    <div class="video-main" v-if="episode">

      <div class="video-wrapper" ref="videoWrap">
        <video
          class="main-player"
          width="100%"
          ref="mainVideo"
          controls
          :poster="episode.response.images.orig"
          :key="episode.link">
          <source :src="episode.link" type="video/mp4">
          Your browser does not support HTML5 video :'(
        </video>
      </div>

      <div class="meta">
        <div class="meta-main">

          <div class="title">
            <h1>{{ episode.title }}</h1>
            <a class="episode-link" :href="episode.link" target="_blank" rel="noreferrer nofollow">
              <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z"/></svg>
            </a>
          </div>

          <div class="info">
            <div>
              <p> Datum predvajanja: {{ episode.response.date }}</p>
              <span class="source">{{ episode.response.source }}</span>
            </div>
          </div>
        </div>

        <div class="meta-description">
          <p>{{ episode.description }}</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from '~/node_modules/vuex-class';

@Component({})
export default class HelloWorld extends Vue {
  @Prop() src;
  @Prop() slug;
  @State episodes?: any;

  async mounted() {
    if (!!this.episodes && !this.episodes.length) {
      await (this as any).$store.dispatch('GET');
    }
  }

  get id() {
    return Number(this.$route.params.id)
  }

  get episode() {
    return this.episodes.find(e => e.recordingId === this.id);
  }
}
</script>

<style lang="scss">
  .main-player {
    margin: 0 auto;
    display: block;
    min-height: 225px;
    background-color: #191919;
    width: 100%;
    height: 100%;
    object-fit: contain;
    outline: none;
  }

  .video-wrapper {
    display: block;
    text-align: center;
    margin: 0 auto;
  }

  .video-main {
    max-width: 1070px;
    margin: 24px 0;
  }

  .video-section {
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

  }

  .meta {
    h1 {
      max-height: 4.8rem;
      overflow: hidden;
      font-size: 1.8rem;
      font-weight: 400;
      line-height: 2.4rem;
      margin: 0;
    }
  }

  .meta-main {
    padding: 20px 0 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    .source {
      background-color: #2a272e;
      font-size: 1.2rem;
      color: #fff;
      padding: 6px;
      display: inline-block;
    }

    p {
      display: inline-block;
      font-size: 1.2rem;
    }

    .title {
      display: flex;
      align-items: center;
    }
  }

  .meta-description {
    display: block;
    max-width: 800px;
    white-space: pre-wrap;
    margin: 24px 0;

    p {
      font-size: 1.4rem;
      margin: 0;
      line-height: 1.8rem
    }
  }

  .nav-icon {
    width: 26px;
    fill: #fff;
    transform: rotate(135deg);
  }

  .info {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .episode-link {
    margin-left: 12px;
    padding: 0 2px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
</style>
