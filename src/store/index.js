import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // Works as cache for a search term when pagination is used.
        // Note: Gets reset when new search is issued
        bookCache: [],
        searchTerm: '',
        currentPage: 0,
        currentlySearching: false, //are we currently in the middle of an Ajax call?
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
        },

        'START_SEARCH' (state) {
            state.currentlySearching = true;
        },

        'END_SEARCH' (state) {
            state.currentlySearching = false;
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
            var url = context.state.apiBaseUrl + '?q=' + context.state.searchTerm + '&startIndex=' 
                        + ((context.state.currentPage - 1) * 10 + 1);

            console.log(url);

            context.commit('START_SEARCH');
            Vue.axios.get(url).then((response) => {
                context.commit('ADD_BOOKS', response.data.items);
                context.commit('END_SEARCH');
            });            
        },

        gotoNextPage: (context) => {
            // Go to next page only if cache data exists for current page
            // In other words, if the current page is blank, hitting Next
            // shouldn't do anything
            if(context.state.bookCache[context.state.currentPage - 1]) {
                context.dispatch('addNewPageOfBooks');
            }
        },

        gotoPreviousPage: context => {
            // if we are on first page, we of course can't paddle back to 0th page
            if(context.state.currentPage > 1) {
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

        getCurrentPage: state => {
            return state.currentPage;
        }
    }
});