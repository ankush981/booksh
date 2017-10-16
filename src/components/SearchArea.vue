<template>
    <div>
        <div id="search-area">
            <input type="text" v-model='searchTerm' class="search-box"> 
            <button @click="newSearch" class="search-button">Search</button>
            <div v-if="showSearchTerm">Showing results for "{{ searchTerm }}"</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchTerm: '',
                showSearchTerm: false
            }
        },

        methods: {
            newSearch() {
                if(!this.searchTerm) {
                    return;
                }
                this.$store.dispatch('newSearchForBooks', this.searchTerm);
                this.showSearchTerm = true;
            }
        }
    }
</script>

<style>
    #search-area {
        text-align: center;
        margin-top: 40px;    
    }

    .search-box {
        display: inline-block;
        font-size: 2em;
        font-family: Merriweather;
        color: #555;
        border: 1px solid #BBB;
        height: 40px;
    }

    .search-button {
        display: inline-block;
        font-size: 1.3em;
        font-family: Merriweather;
        color: #555;
        padding: 6px;
        position: relative;
        top: -4px;
    }
</style>