<style lang="stylus">
@import '~common/stylus/variable'

.loading-container
  position absolute
  width 100%
  top 50%
  transform translateY(-50%)
  z-index 1000000
  .loading
    width 100%
    text-align center
    .desc
      line-height 20px
      font-size $font-size-small
      color $color-text-l
</style>

<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>
