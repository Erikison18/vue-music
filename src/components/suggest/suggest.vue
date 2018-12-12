<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.suggest
  height 100%
  overflow hidden
  .suggest-list
    padding 0 30px
    .suggest-item
      display flex
      align-items center
      padding-bottom 20px
    .icon
      flex 0 0 30px
      width 30px
      [class^="icon-"]
        font-size 14px
        color $color-text-d
    .name
      flex 1
      font-size $font-size-medium
      color $color-text-d
      overflow hidden
      .text
        no-wrap()
  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform  translateY(-50%)
</style>

<template>
  <Scroll class="suggest" :data="result"
  @scrollToEnd="searchMore" :pullup="pullup">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result"
      :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
  </Scroll>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {getSongVkey} from 'api/singer'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  components: {
    Scroll,
    Loading
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true
    }
  },
  methods: {
    search() {
      this.hasMore = true
      console.log(this.query, this.page, this.showSinger)
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this._getResult(res.data)
          this.checkMore(res.data)
          console.log(this.result)
        }
      })
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    searchMore() {
      console.log(8888888, this.hasMore)
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          console.log(this.result)
          this.result = this.result.concat(this._getResult(res.data))
          this.checkMore(res.data)
          console.log(this.result)
        }
      })
    },
    checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
        this.hasMore = false
      }
    },
    _getResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      console.log(data)
      if (data.song) {
        console.log(1111111111111111)
        data.song.list.forEach(musicData => {
          getSongVkey(musicData.songmid).then((res) => {
            const vkey = res.data.items[0].vkey
            if (musicData.songid && musicData.albummid) {
              console.log(2222)
              console.log(ret)
              ret.push(createSong(musicData, vkey))
            }
          })
        })
      }
      console.log(ret)
      return ret
    }
  },
  watch: {
    query() {
      this.search()
    }
  }
}
</script>
