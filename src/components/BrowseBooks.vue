<template>
    <div>
        <h3 v-if="!books.length && searchTerm">No books found</h3>
        <div v-else>
            <div v-for="book in books">
                <single-book v-if="book" :book="book"></single-book>
            </div>
        </div>     
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import SingleBook from './SingleBook.vue';

    export default {
        components: {
            SingleBook: SingleBook
        },

        computed: {            
            books() {
                return this.$store.getters.getBooksForCurrentPage;
            },

            searchTerm() {
                return this.$store.state.searchTerm;
            }
        }
    }
</script>