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
export default class SkeletonCard extends Vue { }
</script>

<style scoped lang="scss">
.skeleton {
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

  .skeleton-thumbnail {
    width: 100%;
    height: 150px;
    background-color: #1d1d1d;

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
