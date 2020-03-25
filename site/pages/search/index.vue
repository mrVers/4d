<template>
  <div>
    <div class="content">
      <div>
        <div class="title-container">
          <h2>Poišči</h2>
        </div>
        <div class="search-container">
          <form @submit="submitForm" class="search-form">
            <input class="search-input" v-model="queryString" ref="searchInput" type="text" name="queryString" minlength="3" placeholder="Išči po naslovu, opisu...">
            <input type="submit" hidden />
          </form>
        </div>
        <div class="search-results">
          <SearchSection :results="searchResults" :searching="isSearching"></SearchSection>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { State } from "vuex-class"
import { Media } from '~/types';
import SearchSection from '~/components/SearchSection.vue';

@Component({
  components: {
    SearchSection
  }
})
export default class Search extends Vue {
  @State searchResults?: Media[];
  @State isSearching?: boolean;

  queryString = null;

  async mounted() {
    await this.$store.dispatch('RESET_SEARCH');
    (this.$refs.searchInput as HTMLElement).focus();
  }

  async submitForm(e) {
    e.preventDefault();
    if (this.queryString && (this.queryString as any).length >= 3) {
      await this.$store.dispatch('SEARCH', { search: this.queryString });
    }
  }
}
</script>

<style scoped lang="scss">
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

  .search-container {
    display: flex;
    margin-top: 24px;
    justify-content: center;

    .search-form {
      display: flex;
      width: 100%;

      @media (min-width: 662px) {
        width: 664px;
      }

    }
    .search-input {
      width: 100%;
      background-color: transparent;
      border: 1px solid #999;
      padding: 10px 16px;
      font-size: 1.4rem;
      color: #fff;
      outline: none;

      &:focus {
        border: 1px solid #fff;
      }
    }
  }
</style>
