<template>
  <div class="navigation">
    <div class="page-btn" @click="prevPage()" :class="{ disabled: page < 2 }">«</div>
    <div class="curren-page">{{ page }} od {{ totalPages }}</div>
    <div class="page-btn" @click="nextPage()" :class="{ disabled: page >= totalPages }">»</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Navigation extends Vue {
  @Prop() showsLength?: number;

  perPage = 64;
  page = 1;

  nextPage() {
    if (this.totalPages > this.page) {
      this.page++;
      this.pageChangeEvent();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.pageChangeEvent();
    }
  }

  get totalPages() {
    if (this.showsLength) {
      return Math.ceil(this.showsLength / this.perPage);
    }
    return 1;
  }

  pageChangeEvent() {
    this.$emit('pageChange', {
      sliceStart: (this.perPage * this.page) - this.perPage,
      sliceEnd: this.perPage * this.page
    });
  }

}
</script>

<style scoped lang="scss">
  .navigation {
    display: flex;
    max-width: 140px;
    width: 100%;
    justify-content: space-between;
    font-size: 1.4rem;
    align-items: baseline;
    margin-bottom: 32px;
  }

  .page-btn {
    cursor: pointer;
    font-size: 18px;
    padding: 2px 6px;

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
