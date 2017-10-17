<template>
    <div>
        <div class="pager">
            <span class="navigate" @click="pageBack"> <&nbsp; </span> 
            <span class="page-num"> Page {{ currentPage }} </span> &nbsp;
            <span class="navigate" @click="pageForward"> > </span>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            currentPage() {
                return this.$store.getters.getCurrentPage;
            }
        },

        methods: {
            pageBack() {
                this.$store.dispatch('gotoPreviousPage');
            },

            pageForward() {
                this.$store.dispatch('gotoNextPage');
            }
        }
    }
</script>

<style>
    .pager {
        text-align: center;
        font-size: 1.1em;        
    }

    .navigate {
        display: inline-block;
        font-size: 3em;
        cursor: pointer;
    }

    .page-num {
        position: relative;
        top: -10px;
    }
</style>