<!-- demo root element -->
<template>
    <div id="demo">
        <form id="search">
            Search <input name="query" v-model="searchQuery">
        </form>
        <TableComponents
            :data="gridData"
            :columns="gridColumns"
            :filter-key="searchQuery">
        </TableComponents>
    </div>
</template>

<script>
    import TableComponents from '../components/table-components/tableComponent'

    export default {
        data(){
            return {
                searchQuery: '',
                gridColumns: ['name', 'power'],
                gridData: [
                    { name: 'Chuck Norris', power: Infinity },
                    { name: 'Bruce Lee', power: 9000 },
                    { name: 'Jackie Chan', power: 7000 },
                    { name: 'Jet Li', power: 8000 }
                ]
            }
        },
        components:{
            TableComponents
        }
    }
</script>