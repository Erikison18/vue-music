import {mapGetters} from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playList)
  },
  activated() {
    this.handlePlaylist(this.playList)
  },
  methods: {
    handlePlaylist() {
      throw new Error('compoment must implement handlePlaylist method')
    }
  },
  watch: {
    playList(newVal) {
      this.handlePlaylist(this.playList)
    }
  }
}