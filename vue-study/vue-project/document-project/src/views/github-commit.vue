<template>
    <div class="commit-history">
        <h1>Latest wxPachong Commits</h1>
         <template v-for="branch in branches">
            <input type="radio"
            :id="branch"
            :value="branch"
            name="branch"
            v-model="currentBranch">
            <label :for="branch">{{ branch }}</label>
        </template>
        <p>cky917@wxPachong@{{ currentBranch }}</p>
        <ul v-for="commit in commitsList">
            <li class="commit-item">
                <a :href="commit.html_url" target="_blank">{{ commit.sha.slice(0,7)}}</a>
                - <span>{{ commit.commit.message | truncate }}</span>
                <p>by:<a :href="commit.committer.html_url" target="_blank">{{ commit.commit.author.name }}</a></p>
            </li>
        </ul>
   </div>
</template>

<script>
    export default {
        data(){
            return {
                branches:['master','dev'],
                currentBranch:'master',
                commitsList:[],
                apiURL:'https://api.github.com/repos/cky917/wxPachong/commits?per_page=10&sha='
            }
        },
        created(){
            this.getData()
        },
        filters: {
            truncate: function (v) {
                var newline = v.indexOf('\n')
                return newline > 0 ? v.slice(0, newline) : v
            },
            formatDate: function (v) {
                return v.replace(/T|Z/g, ' ')
            }
        },
        watch: {
            currentBranch: 'getData'
        },
        methods:{
            getData(){
                var self = this;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', self.apiURL + self.currentBranch);
                xhr.onload = function(){
                    self.commitsList = JSON.parse(xhr.responseText);
                    console.log(self.commitsList[0].html_url);
                }
                xhr.send();
            },
        }
    }
</script>