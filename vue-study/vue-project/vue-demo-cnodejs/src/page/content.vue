<template>
  <div>
    <myHeader></myHeader>
    <h2 v-text="data.title"></h2>
    <p>作者：{{data.author.loginname}}　　发表于：{{$utils.goodTime(data.create_at)}}</p>
    <hr>
    <article v-html="data.content"></article>
    <h3>网友回复：</h3>
    <ul>
      <li v-for="item in data.replies">
        <p>评论者：{{item.author.loginname}}　　评论于：{{$utils.goodTime(item.create_at)}}</p>
        <article v-html="item.content"></article>
      </li>
    </ul>
    <myFooter></myFooter>
  </div>
</template>
<script>
import myHeader from '../components/header.vue'
import myFooter from '../components/footer.vue'
export default {
  components: { myHeader, myFooter },
  data () {
    return {
      id: this.$route.params.id,
      data: {
        author: {}
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('topic/' + this.id, null, rs => {
        this.data = rs.data
      })
    }
  }
}
</script>