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
    body {
        color: #333;
        padding: 20px;
    }
</style>
