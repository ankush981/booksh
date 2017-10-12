<template>
    <div>
        <h3 v-if="!booksAvailable">No books found</h3>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        computed: {            
            books: function() {
                return this.$store.getters.getBooksForCurrentPage;
            },

            booksAvailable: function() {
                return this.books.length != 0;
            }
        }
    }
</script>