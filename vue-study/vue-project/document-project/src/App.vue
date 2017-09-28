<template>
    <div id="main">
        <router-view></router-view> 
    </div>   
</template>
<script>
import store from './vuex/store' 
export default {
    store
}
</script>
<style>
 #main {
    position:absolute;
    width:100%;
    height:100%;
 }
</style>