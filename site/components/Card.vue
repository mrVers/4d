<template>
  <div class="card">
    <nuxt-link :to="{ name: 'media-id', params: { id: episode.recordingId } }">
      <img :src="episode.response.images.wide1" :title="episode.description" />
      <h2>{{episode.title}}</h2>
    </nuxt-link>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import { Media } from '~/types';

@Component({})
export default class Card extends Vue {
  @Prop() episode?: Media;
}
</script>

<style scoped lang="scss">
.card {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana,
    sans-serif;
  padding: 1rem;
  margin: 0.25rem;
  border: 0.25rem solid gainsboro;
  max-width: 32%;
  box-sizing: border-box;

  img {
    width: 100%;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }

}
</style>
