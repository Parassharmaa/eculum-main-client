<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>

import Layout from './Layout.vue'

export default {
  name: 'app',
  components: { Layout },
  data () {
    return {
      showError: this.$store.getters.errorShow
    }
  }
}

</script>

<style>

@media screen and (min-width: 822px) {
  .adjust-margin {
    margin-left: 330px !important;
  }
}


html {
  overflow: auto !important
}

.round-card {
  border-radius: 16px !important;
}

.cssload-thecube {
  width: 66px;
  height: 66px;
  margin: 0 auto;
  margin-top: 44px;
  position: relative;
  transform: rotateZ(45deg);
    -o-transform: rotateZ(45deg);
    -ms-transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    -moz-transform: rotateZ(45deg);
}
.cssload-thecube .cssload-cube {
  position: relative;
  transform: rotateZ(45deg);
    -o-transform: rotateZ(45deg);
    -ms-transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    -moz-transform: rotateZ(45deg);
}
.cssload-thecube .cssload-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
}
.cssload-thecube .cssload-cube:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(25,118,221);
  animation: cssload-fold-thecube 3.48s infinite linear both;
    -o-animation: cssload-fold-thecube 3.48s infinite linear both;
    -ms-animation: cssload-fold-thecube 3.48s infinite linear both;
    -webkit-animation: cssload-fold-thecube 3.48s infinite linear both;
    -moz-animation: cssload-fold-thecube 3.48s infinite linear both;
  transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
}
.cssload-thecube .cssload-c2 {
  transform: scale(1.1) rotateZ(90deg);
    -o-transform: scale(1.1) rotateZ(90deg);
    -ms-transform: scale(1.1) rotateZ(90deg);
    -webkit-transform: scale(1.1) rotateZ(90deg);
    -moz-transform: scale(1.1) rotateZ(90deg);
}
.cssload-thecube .cssload-c3 {
  transform: scale(1.1) rotateZ(180deg);
    -o-transform: scale(1.1) rotateZ(180deg);
    -ms-transform: scale(1.1) rotateZ(180deg);
    -webkit-transform: scale(1.1) rotateZ(180deg);
    -moz-transform: scale(1.1) rotateZ(180deg);
}
.cssload-thecube .cssload-c4 {
  transform: scale(1.1) rotateZ(270deg);
    -o-transform: scale(1.1) rotateZ(270deg);
    -ms-transform: scale(1.1) rotateZ(270deg);
    -webkit-transform: scale(1.1) rotateZ(270deg);
    -moz-transform: scale(1.1) rotateZ(270deg);
}
.cssload-thecube .cssload-c2:before {
  animation-delay: 0.44s;
    -o-animation-delay: 0.44s;
    -ms-animation-delay: 0.44s;
    -webkit-animation-delay: 0.44s;
    -moz-animation-delay: 0.44s;
}
.cssload-thecube .cssload-c3:before {
  animation-delay: 0.87s;
    -o-animation-delay: 0.87s;
    -ms-animation-delay: 0.87s;
    -webkit-animation-delay: 0.87s;
    -moz-animation-delay: 0.87s;
}
.cssload-thecube .cssload-c4:before {
  animation-delay: 1.31s;
    -o-animation-delay: 1.31s;
    -ms-animation-delay: 1.31s;
    -webkit-animation-delay: 1.31s;
    -moz-animation-delay: 1.31s;
}



@keyframes cssload-fold-thecube {
  0%, 10% {
    transform: perspective(122px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
        75% {
    transform: perspective(122px) rotateX(0deg);
    opacity: 1;
  }
  90%,
        100% {
    transform: perspective(122px) rotateY(180deg);
    opacity: 0;
  }
}

@-o-keyframes cssload-fold-thecube {
  0%, 10% {
    -o-transform: perspective(122px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
        75% {
    -o-transform: perspective(122px) rotateX(0deg);
    opacity: 1;
  }
  90%,
        100% {
    -o-transform: perspective(122px) rotateY(180deg);
    opacity: 0;
  }
}

@-ms-keyframes cssload-fold-thecube {
  0%, 10% {
    -ms-transform: perspective(122px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
        75% {
    -ms-transform: perspective(122px) rotateX(0deg);
    opacity: 1;
  }
  90%,
        100% {
    -ms-transform: perspective(122px) rotateY(180deg);
    opacity: 0;
  }
}

@-webkit-keyframes cssload-fold-thecube {
  0%, 10% {
    -webkit-transform: perspective(122px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
        75% {
    -webkit-transform: perspective(122px) rotateX(0deg);
    opacity: 1;
  }
  90%,
        100% {
    -webkit-transform: perspective(122px) rotateY(180deg);
    opacity: 0;
  }
}

@-moz-keyframes cssload-fold-thecube {
  0%, 10% {
    -moz-transform: perspective(122px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
        75% {
    -moz-transform: perspective(122px) rotateX(0deg);
    opacity: 1;
  }
  90%,
        100% {
    -moz-transform: perspective(122px) rotateY(180deg);
    opacity: 0;
  }
}
</style>

<style lang="stylus">
  $color-pack = false
  @import '../stylus/main'
</style>
