<template>
<div id="navcss">
<md-whiteframe  md-elevation="4">
  <md-toolbar class="md-primary">
    <md-button class="md-icon-button menu-icon" @click="toggleNav">
        <md-icon>menu</md-icon>
    </md-button>
    <h1 class="md-title brand-name" style="flex:1">Eculum</h1>
    <md-menu md-direction="bottom left">
        <md-button class="md-icon-button" md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item>My Item 1</md-menu-item>
        <md-menu-item>My Item 2</md-menu-item>
        <md-menu-item>My Item 3</md-menu-item>
      </md-menu-content>
    </md-menu>
  </md-toolbar>
  </md-whiteframe>

  <md-sidenav class="md-left c-side-nav" ref="leftSidenav">
      <div class="phone-viewport">
      <md-toolbar md-theme="blue" class="md-small side-nav-header">
        <md-list>
        <md-list-item>
          <md-avatar>
            <img src="../assets/avatar-2.jpg" alt="Avatar">
          </md-avatar>
          <span style="flex:1; font-size:18px">Paras Sharma</span>
          <md-button class="md-icon-button">
            <md-icon class="white-icon">settings</md-icon>
          </md-button>
        </md-list-item>
        </md-list>
      </md-toolbar>
    <md-list>
    <md-list-item>
        <md-icon>whatshot</md-icon>
        <span>News</span>

        <md-list-expand>
        <md-list>
            <md-list-item class="md-inset">World</md-list-item>
            <md-list-item class="md-inset">Americas</md-list-item>
            <md-list-item class="md-inset">Europe</md-list-item>
        </md-list>
        </md-list-expand>
    </md-list-item>

    <md-list-item>
        <md-icon>videogame_asset</md-icon>
        <span>Games</span>

        <md-list-expand>
        <md-list>
            <md-list-item class="md-inset">Console</md-list-item>
            <md-list-item class="md-inset">PC</md-list-item>
            <md-list-item class="md-inset">Phone</md-list-item>
        </md-list>
        </md-list-expand>
    </md-list-item>

    <md-list-item>
        <md-icon>video_library</md-icon>
        <span>Video</span>

        <md-list-expand>
        <md-list>
            <md-list-item class="md-inset">Humor</md-list-item>
            <md-list-item class="md-inset">Music</md-list-item>
            <md-list-item class="md-inset">Movies</md-list-item>
            <md-list-item class="md-inset">TV Shows</md-list-item>
        </md-list>
        </md-list-expand>
    </md-list-item>
    </md-list>
  </div>
  </md-sidenav>
  </div>
</template>

<script>

export default {
  name: 'nav',
  data () {
    return {
      swipeable: true
    }
  },
  methods: {
    toggleNav () {
      this.$refs.leftSidenav.toggle()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.brand-name {
  font-family: 'Offside', cursive;
  text-transform: uppercase;
  font-size: 1.6em !important;
  text-align: center;
}

@media screen and (min-width: 822px) {
  .c-side-nav > .md-sidenav-content {
    pointer-events: auto !important;
    transform: translate3d(0, 0, 0) !important;
    box-shadow: 1px 1px 1px grey;
  }

  .md-sidenav-backdrop {
    z-index: 1 !important;
  }

  .menu-icon {
    display: none;
  }
}


</style>
<style scoped>
.side-nav-header {
  background: #00BCD4;
  color:#fff;
}

.white-icon {
  color: #fff !important;
}

</style>
