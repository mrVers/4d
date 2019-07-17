<template>
  <div class="skeleton">
    <div class="skeleton-thumbnail"></div>
    <div class="skeleton-title"></div>
    <div class="skeleton-title skeleton-title-short"></div>
    <div class="skeleton-title skeleton-title-shorter"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class extends Vue { }
</script>

<style scoped lang="scss">
.skeleton {
  margin-bottom: 24px;
  margin-right: 4px;

  .skeleton-thumbnail {
    width: 210px;
    height: 118px;
    background-color: #1d1d1d;
  }

  .skeleton-title {
    height: 20px;
    margin-top: 8px;
    background-color: #1d1d1d;
    margin-right: 48px;

    &-short {
      margin-right: 12px;
      margin-top: 6px;
    }

    &-shorter {
      margin-right: 72px;
      margin-top: 6px;
    }
  }
}
</style>
