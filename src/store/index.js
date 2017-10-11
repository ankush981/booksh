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
        favoriteBooks: [],
        apiBaseUrl: 'https://www.googleapis.com/books/v1/volumes'
    },
    mutations: {
        'ADD_NEW_PAGE' (state, books) {
            if(books) {
                state.paginatedBooks.push(books);
            }
        },
        'REMOVE_FROM_FAVORITES' (state, id) {
            if(!favoriteBooks) {
                return;
            }

            var locatedAtIndex = null;
            var totalFavorites = state.favoriteBooks.length;

            for (var i = 0; i < totalFavorites; i++) {
                if (state.favoriteBooks[i].id === id) {
                    locatedAtIndex = i;
                }
            }

            // not found -- shouldn't ever happen!
            if(locatedAtIndex === null) {
                return;
            }

            // chop off!
            state.favoriteBooks.splice(locatedAtIndex, 1);
        },
        'ADD_TO_FAVORITES' (state, icon) {
            if (icon) {
                state.favoriteBooks.push(icon);
            }
        },
        'EMPTY_CACHE' (state) {
            state.bookCache = [];
        },
        'PAGE_NEXT' (state) {
            state.pageNumber++;
        },
        'PAGE_BACK' (state) {
            state.pageNumber--;
        }
    },
    actions: {
        removeFromFavorites: (state, id) => {
            this.$store.commit('REMOVE_FROM_FAVORITES', id);
        },
        
        searchForBooks: (state, term) => {
            console.log('Going to search for: ' + term);
            this.$store.commit('EMPTY_CACHE');
            this.$store.commit('PAGE_NEXT');
        },

        fetchBooksFromApi: (state) => {
            if(!state.currentPage) {
                return [];
            }

            // See if we can load from cache
            var cachedBooks = state.bookCache[state.currentPage - 1];
            
            if(cachedBooks) {
                return cachedBooks;
            }

            // othewise, send request to API
            var url = state.apiBaseUrl + 'q=' + state.searchTerm + '&page=' + state.currentPage;

            Vue.axios.get(url).then((response) => {
                console.log(response.data)
            });            
        },
        gotoNextPage: (state) => {
            // go to next page only if cache data exists for current page
            if(state.cachedBooks[state.currentPage - 1]) {
                this.$store.commit('PAGE_NEXT');
            }
        },
        gotoPreviousPage: (state) => {
            if(state.currentPage > 0) {
                this.$store.commit('PAGE_BACK');
            }
        }
    },
    getters: {
        getBooksForCurrentPage: (state) => {
            var books = state.bookCache[state.currentPage - 1];
            return books ? books : [];
        },    
    }
});