<template>
  <section class="video-section">
    <div class="video-main" v-if="episode && videoUrl">

      <div class="video-wrapper" ref="videoWrap" :class="{cast: isCasting}" @click="toggleCastPlay()">
        <video
          class="main-player"
          width="100%"
          ref="mainVideo"
          controls
          :poster="episode.response.images.orig.replace('http:', '')">
          <source :src="videoUrl" type="video/mp4">
          Your browser does not support HTML5 video :'(
        </video>
      </div>

      <div class="chromecast-controls" v-if="isCasting">
        <div class="top-controls">
          <div class="controls">
            <span class="icon-wrap" v-if="$cast.paused" @click="toggleCastPlay()">
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M199.9 416h-63.8c-4.5 0-8.1-3.6-8.1-8V104c0-4.4 3.6-8 8.1-8h63.8c4.5 0 8.1 3.6 8.1 8v304c0 4.4-3.6 8-8.1 8z" fill="currentColor"/>
                <path d="M375.9 416h-63.8c-4.5 0-8.1-3.6-8.1-8V104c0-4.4 3.6-8 8.1-8h63.8c4.5 0 8.1 3.6 8.1 8v304c0 4.4-3.6 8-8.1 8z" fill="currentColor"/>
              </svg>
            </span>
            <span class="icon-wrap" v-if="!$cast.paused" @click="toggleCastPlay()">
              <svg class="icon icon-play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M128 104.3v303.4c0 6.4 6.5 10.4 11.7 7.2l240.5-151.7c5.1-3.2 5.1-11.1 0-14.3L139.7 97.2c-5.2-3.3-11.7.7-11.7 7.1z"/>
              </svg>
            </span>
          </div>
          <div class="time">{{ secondsToHms(time) }} / {{ secondsToHms($cast.duration) }} - CHROMECAST</div>
        </div>
        <div class="timeline">
          <input type="range" class="range" min="0" :max="$cast.duration" step="1" v-model="time" @change="updateTime($event)">
          <div class="rangeslider">
            <div class="rangeslider-fill" :style="{width: elapsedTimePercent() + '%'}"></div>
          </div>
        </div>
      </div>

      <div class="meta">
        <div class="meta-main">

          <div class="title">
            <h1>{{ episode.title }}</h1>
            <a class="episode-link" :href="episode.link" title="Odpri v svojem oknu" target="_blank" rel="noreferrer nofollow">
              <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z"/></svg>
            </a>
            <button class="cast-btn" title="Predvajaj preko Chromecast" type="button" @click="startCast()">
              <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="m1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7h-18c-1.1 0-2 .9-2 2v3h2v-3h18v14h-7v2h7c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z" fill="#fff"/><path d="m0 0h24v24h-24z"/></g></svg>
            </button>
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
import { Component, Vue } from 'vue-property-decorator';
import { Media } from '~/types';

@Component({})
export default class SingleEpisode extends Vue {

  episode: Media | any = null;
  isCasting = false;
  videoUrl = '';
  time = 0;
  jwt = null;

  async mounted() {
    this.episode = await this.$store.getters.getShowById(this.id);

    if (!this.episode) {
      this.episode = await this.$store.dispatch('GET_ID', this.id);
    }

    try {
      this.jwt = await this.$store.dispatch('GET_JWT', this.id);
    } catch (e) {
    }

    this.videoUrl = this.episode.link + `?keylockhash=${this.jwt}`;

    if (this.$cast.session) {
      this.initOngoingSession();
    }
  }

  get id(): number {
    return Number(this.$route.params['id'])
  }

  initOngoingSession() {
    this.loadCastListeners();
    this.isCasting = true;
    this.videoUrl = '';
    if (this.$refs.mainVideo) {
      (this.$refs.mainVideo as HTMLVideoElement).load();
    }
  }

  startCast() {
    if (this.$cast.available) {
      const metadata = {
        title: this.episode.title,
        poster: this.episode.response.images.orig,
      };
      this.$cast.cast(this.videoUrl, metadata);
      this.loadCastListeners()
    }
  }

  loadCastListeners() {
    this.$cast.on('statechange', () => this.onCastStateChange(this.$cast.state));
    this.$cast.on('timeupdate', () => {
      if (this.$cast.time > 0) {
        this.time = this.$cast.time;
      }
    });
  }

  onCastStateChange(state: string) {
    if (state === 'playing') {
      // unload main player
      if (this.$refs.mainVideo) {
        if (!(this.$refs.mainVideo as HTMLVideoElement).paused) {
          (this.$refs.mainVideo as HTMLVideoElement).pause();
        }
        if ((this.$refs.mainVideo as HTMLVideoElement).currentTime > 30) {
          this.$cast.seek((this.$refs.mainVideo as HTMLVideoElement).currentTime);
        }
      }
      this.isCasting = true;
      this.videoUrl = '';
    }

    if (state === 'idle') {
      // load main player
      this.isCasting = false;
      this.videoUrl = this.episode.link + `?keylockhash=${this.jwt}`;
      if (this.$refs.mainVideo) {
        (this.$refs.mainVideo as HTMLVideoElement).currentTime = this.time;
        (this.$refs.mainVideo as HTMLVideoElement).load();
      }
    }
  }

  updateTime(event) {
    this.$cast.seek(this.time);
  }

  toggleCastPlay() {
    if (this.isCasting) {
      this.$cast.paused ? this.$cast.play() : this.$cast.pause();
    }
  }

  elapsedTimePercent(): number {
    return Math.round((this.time / this.$cast.duration) * 10000) / 100;
  }

  secondsToHms(d): string {
    d = Number(d);

    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);
    const hours = h > 0 ? ('0' + h).slice(-2) + ':' : '';

    return `${hours}${('0' + m).slice(-2)}:${('0' + s).slice(-2)}`;
  }


}
</script>

<style lang="scss">
  .main-player {
    margin: 0 auto;
    display: block;
    min-height: 225px;
    background-color: #000;
    width: 100%;
    height: 100%;
    object-fit: contain;
    outline: none;
  }

  .video-wrapper {
    display: block;
    text-align: center;
    margin: 0 auto;
    position: relative;

    &.cast:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      left: 0;
      background: rgb(0,0,0);
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 33%, black 100%);
      cursor: pointer;
    }
  }

  .video-main {
    max-width: 1070px;
    margin: 24px 0;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
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
    display: flex;

    &:hover {
      background-color: #2a272e;
    }
  }

  .cast-btn {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    margin-left: 6px;
    padding: 2px 5px;
    display: flex;

    &:hover {
      background-color: #2a272e;
    }

    svg {
      width: 20px;
    }
  }

  .top-controls {
    display: flex;
    align-items: center;
  }

  .time {
    font-size: 1.4rem;
  }

  .chromecast-controls {
    padding: 0 16px;
    position: absolute;
    margin-top: -64px;
    z-index: 2;
    width: calc(100% - 72px);

    &:hover {
      .range::-webkit-slider-thumb {
        opacity: 1;
      }
      .range::-moz-range-thumb {
        opacity: 1;
      }
    }
  }

  .range {
    -webkit-appearance: none;
    vertical-align: middle;
    outline: none;
    border: none;
    background: none;
    width: 100%;
    cursor: pointer;
    padding-bottom: 20px;
    padding-top: 4px;
  }

  .range::-webkit-slider-runnable-track {
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 10px 0px;
    height: 4px;
    border-radius: 3px;
    border: 1px solid transparent;
  }

  .range::-moz-range-track {
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 10px 0px;
    height: 4px;
    border-radius: 3px;
    border: none;
  }

  .range::-moz-range-thumb {
    border-radius: 20px;
    height: 12px;
    width: 12px;
    border: none;
    background: none;
    background-color: #fff;
    opacity: 0;
    transition: opacity 0.25s ease 0s;
  }

  .range::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    border-radius: 100%;
    background-color: #fff;
    height: 12px;
    width: 12px;
    margin-top: -5px;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
    opacity: 0;
    transition: opacity 0.25s ease 0s;
  }

  .rangeslider {
    box-shadow: none;
    border-radius: 3px;
    height: 4px;
    overflow: hidden;
    position: absolute;
    top: 4px;
    width: 100%;
    pointer-events: none;
  }
  .rangeslider-fill {
    background: #fff;
    position: absolute;
    top: 0;
    height: 100%;
    border-radius: 3px;
  }

  .timeline {
    position: relative;
  }

  .icon {
    fill: #fff;
    height: 20px;
  }

  .icon-wrap {
    display: flex;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 50%;
    padding: 8px;
    margin-right: 5px;
    cursor: pointer;
    transition: background-color 0.25s ease 0s;
    margin-left: -5px;

    &:hover {
      background-color: rgba(32, 33, 36, 0.71);
    }
  }

</style>
