<template>
    <div>
        <div id="search-area">
            <input type="text" v-model='searchTerm' class="search-box"> 
            <button @click="newSearch" class="search-button">Search</button>
            <div v-if="currentlySearching" class='currently-searching'>
                Searching ...    
            </div>
            <div v-if="showSearchTerm && !currentlySearching" class="show-search-term">Showing results for "{{ searchTerm }}"</div>
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
        },

        computed: {
            currentlySearching() {
                return this.$store.state.currentlySearching;
            }
        }
    }
</script>

<style>
    #search-area {
        text-align: center;
        margin: 40px auto;
    }

    .search-box {
        display: inline-block;
        font-size: 1.4em;
        font-family: Merriweather;
        color: #555;
        border: 1px solid #BBB;
        padding: 5px;
    }

    .search-button {
        display: inline-block;
        font-size: 1.3em;
        font-family: Merriweather;
        color: #555;
        padding: 6px;
    }

    .show-search-term {
        margin: 40px auto;
        font-style: italic;
        color: #555;
    }

    .currently-searching {
        margin: 20px auto;
    }
</style>