import CLIENT_ID from './../../env.js';
import CLIENT_SECRET from './../../env.js';

export default new Vuex.Store({
    state: {
        // Works as cache for a search term when pagination is used.
        // Note: Gets reset when new search is issued
        iconsOnEachPage: [],
        // Search for cat icons by default - because they're cool!
        searchTerm: 'cat',
        favoriteIcons: []
    },
    mutations: {
        'ADD_NEW_PAGE' (state, icons) => {
            if(icons) {
                state.iconsOnEachPage.push(icons);
            }
        },
        'REMOVE_FROM_FAVORITES' (state, id) {
            if(!favoriteIcons) {
                return;
            }

            var locatedAtIndex = null;
            var totalFavorites = state.favoriteIcons.length;

            for (var i = 0; i < totalFavorites; i++) {
                if (state.favoriteIcons[i].id === id) {
                    locatedAtIndex = i;
                }
            }

            // not found -- shouldn't ever happen!
            if(locatedAtIndex === null) {
                return;
            }

            // chop off!
            state.favoriteIcons.splice(locatedAtIndex, 1);
        },
        'ADD_TO_FAVORITES' (state, icon) => {
            if (icon) {
                state.favoriteIcons.push(icon);
            }
        }
    },
    actions: {
        removeFromFavorites: (state, id) => {
            this.$store.commit('REMOVE_FROM_FAVORITES', id);
        }
    },
    getters: {
        getIconsByPageNumber: (state, pageNumber) => {
            var icons = state.iconsOnEachPage[pageNumber - 1];
            return icons ? icons : [];
        },
        getFavoriteIcons: state => {
            return state.favoriteIcons;
        }
    }

});