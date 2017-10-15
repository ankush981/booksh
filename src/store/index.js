import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // Works as cache for a search term when pagination is used.
        // Note: Gets reset when new search is issued
        bookCache: [],
        searchTerm: '',
        currentPage: 1,
        apiBaseUrl: 'https://www.googleapis.com/books/v1/volumes'
    },

    mutations: {
        'ADD_BOOKS' (state, books) {
            state.bookCache.push(books);
        },

        'ADD_TO_FAVORITES' (state, id) {

        },

        'REMOVE_FROM_FAVORITES' (state, id) {

        },

        'EMPTY_CACHE' (state) {
            state.bookCache = [];
        },

        'PAGE_NEXT' (state) {
            state.currentPage++;
        },

        'PAGE_PREV' (state) {
            state.currentPage--;
        },

        'RESET_SEARCHED_BOOKS' (state) {
            state.currentPage = 0;
            state.bookCache = [];
            state.searchTerm = '';
        },

        'SET_INITIAL_BOOKS' (state, books) {
            state.currentPage = 1;
            state.bookCache[0] = books;
        },

        'SET_SEARCH_TERM' (state, term) {
            state.searchTerm = term;
        }
    },
    actions: {
        addToFavorites: (context, id) => {
            context.commit('ADD_TO_FAVORITES', id);
        },

        removeFromFavorites: (context, id) => {
            context.commit('REMOVE_FROM_FAVORITES', id);
        },
        
        newSearchForBooks: (context, term) => {
            context.commit('RESET_SEARCHED_BOOKS');
            context.commit('SET_SEARCH_TERM', term);
            context.dispatch('addNewPageOfBooks');                          
        },

        addNewPageOfBooks: (context) => {
            context.commit('PAGE_NEXT');

            var url = context.state.apiBaseUrl + '?q=' + context.state.searchTerm + '&page=' 
                        + context.state.currentPage;

            Vue.axios.get(url).then((response) => {
                context.commit('ADD_BOOKS', response.data.items);
            });            
        },

        gotoNextPage: (context) => {
            // Go to next page only if cache data exists for current page
            // In other words, if the current page is blank, hitting Next
            // shouldn't do anything
            if(state.bookCache[state.currentPage - 1]) {
                context.commit('PAGE_NEXT');
                context.disptch('addNewPageOfBooks');
            }
        },

        gotoPreviousPage: context => {
            if(state.currentPage > 0) {
                context.commit('PAGE_PREV');
            }
        }
    },
    getters: {
        getBooksForCurrentPage: state => {
            if (state.bookCache == []) {
                return [];
            }

            var books = state.bookCache[state.currentPage - 1];

            if (!books) {
                return [];
            }

            return books;
        },
    }
});