<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .tab
        display flex
        height 44px
        line-height 44px
        font-size: $font-size-medium
        .tab-item
            flex: 1
            text-align center
            span
              color $color-text-l
              padding-bottom 5px
            &.router-link-active
                span
                    color $color-theme
                    border-bottom 2px solid $color-theme
</style>

<template>
    <div class="tab">
        <router-link to="/recommend" class="tab-item">
            <span>推荐</span>
        </router-link>
        <router-link to="/singer" class="tab-item">
            <span>歌手</span>
        </router-link>
        <router-link to="/rank" class="tab-item">
            <span>排行</span>
        </router-link>
        <router-link to="/search" class="tab-item">
            <span>搜索</span>
        </router-link>
    </div>
</template>

<script>
export default{
}
</script>
