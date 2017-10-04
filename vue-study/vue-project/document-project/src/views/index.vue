<template>
    <div>
        <li>
            <router-link :to="{ name: 'markdown'}">markdown</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'myTable'}">table</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'githubCommit'}">githubCommit</router-link>
        </li>
    </div>
</template>

<script>
    export default {
        
    }
</script>