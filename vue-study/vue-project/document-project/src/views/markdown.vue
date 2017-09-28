<template>
    <div class="markdown-box">
        <raw-editor></raw-editor> 
        <render-editor></render-editor>
    </div>
</template>

<script>
    import rawEditor from '../components/markdown/rawEditor'
    import renderEditor from '../components/markdown/renderEditor'

    export default {
        components:{
            rawEditor,
            renderEditor
        }
    }
</script>
<style>
.markdown-box{
    width:100%;
    height:100%;
}
</style>