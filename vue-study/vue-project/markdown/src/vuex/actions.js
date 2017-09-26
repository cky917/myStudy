//actions.js 还记得vuex核心思想的那张数据流图，还有上面我描述src的完成状态的关于 vuex里面各文件的意义所在，actions.js 说白了，就是处理玩rawHtml之后，dispatch 结果到 mutations，剩下更新state的工作交给mutations

import Vue from 'vue'
import marked from 'marked'
import store from './store' //后面讲vuex 配置会提到
import highlight from 'highlight.js'

//marked配置文件
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
});


export const renderHtml = (e)=>{
    var _renderHtml = marked(e.target.value) 
    store.commit('MARKDOWN_SUCCESS',{
        rawhtml:e.target.value,
        renderHtml:_renderHtml
    })
}