<style lang="stylus" scoped>
@import '~common/stylus/variable'

</style>

<template>
  <Scroll class="listview" :data="data">
    <ul>
      <li v-for="(group, index) in data" class="list-group" :key="index">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.items" :key="index" class="list-group-item">
            <img :src="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    Scroll
  }
}
</script>