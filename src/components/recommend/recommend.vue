<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.recommend
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
    .recommend-list
      .list-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-sizing border-box
        align-items center
        padding 0 20px 20px
        .icon
          flex 0 0 60px
          width 60px
          padding-right 20px
        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 20px
          overflow hidden
          font-size $font-size-medium
          .name
            margin-bottom 10px
            color #ffffff
          .desc
            color rgba(255, 255, 255, 0.3)
</style>

<template>
    <div class="recommend">
      <Scroll ref="scroll" class="recommend-content" :data="descList">
        <div>
          <div class="slider-wrapper" v-if="recommends.length">
            <slider>
              <div v-for="(item, index) in recommends" :key="index">
                <a :href="item.linkUrl">
                  <img @load=loadImage :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li class="item" v-for="(item, index) in descList" :key="index">
                <div class="icon">
                  <img :src="item.imgurl" width="60" height="60">
                </div>
                <div class="text">
                  <h2 class="name">{{item.creator.name}}</h2>
                  <p class="desc">{{item.dissname}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
</template>

<script>
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'

export default{
  components: {
    Slider,
    Scroll
  },
  data () {
    return {
      recommends: [],
      descList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.descList = res.data.list
        }
      })
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  }
}
</script>
