<template>
    <div>
        <app-header></app-header>
        <app-search></app-search>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import SearchArea from './components/SearchArea.vue';

export default {
    components: {
        AppHeader: Header,
        AppSearch: SearchArea,
        AppFooter: Footer
    }
}
</script>

<style>
    /* global styling */
    @import url('https://fonts.googleapis.com/css?family=Merriweather');

    body {
        color: #333;
        background-color: #f5f5dc;
        padding: 20px;
        font-family: Merriweather, serif;
    }
</style>
