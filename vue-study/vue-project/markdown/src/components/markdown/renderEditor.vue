<template>
    <div id="render-editor" v-html="renderHtml"></div>
</template>

<script>
    export default {
        computed:{
            renderHtml:function(){
                return this.$store.state.renderHtml
            }
        }
    }
</script>
<style>
    #render-editor {
        float:right;
        width:50%;
        height:100%;
        overflow: scroll;
    }
</style>