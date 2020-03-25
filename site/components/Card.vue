<template>
  <div class="card">
    <div class="thumbnail">
      <nuxt-link class="thumb-link" :to="{ name: 'media-id', params: { id: episode.recordingId } }">
        <img class="img" :src="episode.response.images.wide1.replace('http:', '')" :title="episode.description" />
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 104.3v303.4c0 6.4 6.5 10.4 11.7 7.2l240.5-151.7c5.1-3.2 5.1-11.1 0-14.3L139.7 97.2c-5.2-3.3-11.7.7-11.7 7.1z"/></svg>
        <div class="length">{{ secondsToHms(episode.response.duration) }}</div>
      </nuxt-link>
    </div>
    <div class="meta">
      <h3>
        <nuxt-link :to="{ name: 'media-id', params: { id: episode.recordingId } }" :title="episode.title">
          {{episode.title }}
        </nuxt-link>
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import { Media } from '~/types';

@Component({})
export default class Card extends Vue {
  @Prop() episode?: Media;

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

<style scoped lang="scss">
.card {
  display: inline-block;
  margin-bottom: 24px;
  width: 100%;

  @media (min-width: 448px) {
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 36px;
    width: calc(100% / 2 - 16px - .01px);
  }

  @media (min-width: 662px) {
    width: calc(100% / 3 - 16px - .01px);
  }

  @media (min-width: 876px) {
    width: calc(100% / 4 - 16px - .01px);
  }

  &:hover {
    .thumbnail .icon {
      opacity: 0.6;
    }
  }

  .img {
    width: 100%;
    background-color: #1d1d1d;
    will-change: opacity;
    animation: fadein 0.5s ease-in-out;

    @media (min-width: 448px) {
      height: 111px;
    }

    @media (min-width: 662px) {
      height: 116px;
    }

    @media (min-width: 876px) {
      height: 111px;
    }

    @media (min-width: 1090px) {
      height: 141px;
    }
  }

  .meta{
    padding-right: 24px;
    a {
      color: #fff;
      text-decoration: none;
      display: block;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    h3 {
      margin: 8px 0 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 1.8rem;
    }
  }

  .thumbnail {
    position: relative;

    .thumb-link {
      display: block;
    }

    .icon {
      opacity: 0;
      transition: opacity ease-in-out 0.15s;
      position: absolute;
      fill: #fff;
      left: 0;
      right: 0;
      width: 80px;
      display: flex;
      margin: 0 auto;
      height: 100%;
      top: 0;
      pointer-events: none;
    }

  }
}

  .length {
    position: absolute;
    bottom: 5px;
    right: 5px;
    padding: 2px 4px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    pointer-events: none;
  }

@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
