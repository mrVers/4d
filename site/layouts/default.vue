<template>
  <div>
    <Header></Header>
    <nuxt class="main"/>
    <div class="footer"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import Header from '~/components/Header.vue';

@Component({
  components: {
    Header
  }
})
export default class extends Vue { }
</script>

<style scoped lang="scss">
  .footer {
    display: flex;
    margin-bottom: 16px;
    justify-content: center;
  }
</style>
