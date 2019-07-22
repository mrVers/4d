<template>
  <div class="nav">
    <div class="header">
      <h1 class="site-name" @mouseover="hover()" @mouseout="hover()">
        <nuxt-link to="/">
          {{ isHover ? 'Videotek4_rtv' : 'Videotek4_' }}
        </nuxt-link>
      </h1>
      <div class="nav-items">
        <nuxt-link class="nav-link" to="/shows">Dokumentarci</nuxt-link>
        <nuxt-link class="nav-link" to="/movies">Filmi</nuxt-link>
        <nuxt-link class="nav-link" to="/search">Poišči</nuxt-link>
        <a class="nav-link" href="https://4d.rtvslo.si/" target="_blank" rel="noreferrer nofollow">
          <span>RTV 4D</span>
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z"/></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Header extends Vue {

  isHover = false;

  hover() {
   this.isHover = !this.isHover;
  }

}
</script>

<style scoped lang="scss">

  .nav {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    left: 0;
    right: 0;
    top: 0;
    padding: 10px 0;
    position: fixed;
    background-color: #121212;
    z-index: 1;
  }

  .header {
    display: flex;
    margin: 0 auto;
    align-items: center;
    padding: 0 24px;

    @media (min-width: 448px) {
      width: 428px;
      padding: 0;
      justify-content: space-between;
    }

    @media (min-width: 662px) {
      width: 664px;
    }

    @media (min-width: 876px) {
      width: 856px;
    }

    @media (min-width: 1090px) {
      width: 1070px;
    }
  }

  .site-name {
    margin: 0;
    text-transform: uppercase;

    a {
      color: #fff;
      text-decoration: none;
      padding: 5px 5px 5px 0;
      max-width: 118px;
      overflow: hidden;
      display: flex;

      @media (min-width: 662px) {
        max-width: none;
      }
    }
  }

  .nav-items {
    display: flex;
    flex-wrap: wrap;
    margin-left: 12px;
    justify-content: flex-end;
  }

  .nav-link {
    color: #fff;
    padding: 5px;
    font-size: 1.2rem;
    text-decoration: none;
    display: flex;
    align-items: center;

    &:hover {
      text-decoration: underline;
    }

    @media (min-width: 662px) {
      padding: 5px 10px;
      margin-left: 12px;
    }
  }

  .nav-icon {
    width: 20px;
    fill: #fff;
    transform: rotate(135deg);
  }
</style>
