<template>
    <div>
        <input type="text" v-model='searchTerm' placeholder="Type search here"> 
        <button @click="newSearch">Search</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchTerm: ''
            }
        },
        methods: {
            newSearch() {
                if(!this.searchTerm) {
                    return;
                }
                this.$store.dispatch('searchForBooks', this.searchTerm);
                this.searchTerm = '';
            }
        }
    }
</script>