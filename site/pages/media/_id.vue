<template>
  <section>
    <div class="video-wrapper" ref="videoWrap">
      <video
        class="main-player"
        width="400"
        ref="mainVideo"
        controls
        v-if="episode.link"
        @ended="ended()"
        :poster="episode.response.images.orig"
        :key="episode.link">
        <source :src="episode.link" type="video/mp4">
        Your browser does not support HTML5 video :'(
      </video>
      <p @click="fullScreen()">{{ episode.description }}</p>
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

      console.log("params:", this.$route.params.id) // Works here

      if (this.$refs.mainVideo) {
        (this.$refs.mainVideo as any).oncanplay = () => {
          // console.log('can play');
        };
      }

      console.log(this.episodes);
      setTimeout(() => console.log(this.episode), 1000);
      setTimeout(() => console.log(this.episodes), 1000);


      console.log(!!this.episodes && !this.episodes.length);
      if (!!this.episodes && !this.episodes.length) {
        await (this as any).$store.dispatch('GET');
      }

     // this.episode = this.episodes.find(e => e.recordingId === this.$route.params.id);
     //  console.log(this.episode);
    }

    get id() {
      return this.$route.params.id
    }

    get episode() {
      console.log('HERE');
      console.log(this.$route.params.id);
      console.log(this.episodes.find(e => e.recordingId === Number(this.$route.params.id)));
      return this.episodes.find(e => e.recordingId === Number(this.$route.params.id));
    }

    ended() {
      // console.log('ended!');
      this.$emit('load-new');
    }

    getSlug() {
      return `https://thumbs.gfycat.com/${this.slug}-mobile.jpg`;
    }

    fullScreen() {
      // console.log(document.documentElement);
      if ((this.$refs.videoWrap as HTMLElement).requestFullscreen) {
        (this.$refs.videoWrap as HTMLElement).requestFullscreen();
      }
    }

    destroySource() {
      // console.log('DESTROYING');
      (this.$refs.mainVideo as HTMLVideoElement).src = '';
      (this.$refs.mainVideo as HTMLVideoElement).load();
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
  }

  .video-wrapper {
    display: block;
    text-align: center;
    min-height: 500px;
    max-width: 70%;
    margin: 0 auto;
    /*border: 1px solid #292929;*/
    height: calc(100vh - 500px);

    @media screen and (max-width: 768px) {
      max-width: 95%;
    }
  }
</style>
