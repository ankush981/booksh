<template>
    <div class="book-listing">
        <div class="book-start-marker"></div>

        <div class="book-title">
            {{ book.volumeInfo.title }}
        </div>

        <div class="book-image">
            <img :src="book.volumeInfo.imageLinks.smallThumbnail">
        </div>
        
        
        <div class="book-description" v-html="book.searchInfo.textSnippet">
        </div>

        <div class="book-end-marker"></div>
    </div>
</template>

<script>
    export default {
        props: [ 'book' ]
    }
</script>

<style scoped>
    .book-image {
        padding: 10px;
    }

    .book-title {
        font-size: 1.2em;
        font-weight: bold;
        padding: 10px 0px;
    }

    .book-description {
        padding: 20px 0px;
    }

    .book-listing {
        padding: 20px;
        padding-top: 40px;
        margin: 0px auto;
        margin-bottom: 20px;
        max-width: 600px;
        border: 2px solid #DDD;
    }

    .book-listing img {
        display: block;
        margin: 10px auto;
    }


 </style>