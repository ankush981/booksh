<template>
    <div>
        <input type="text" v-model='searchTerm' placeholder="Type search here"> 
        <button @click="newSearch">Search</button>
        <div v-if="showSearchTerm">Showing results for "{{ searchTerm }}"</div>
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