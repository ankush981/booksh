import BrowseBooks from './components/BrowseBooks.vue';
import FavoritedBooks from './components/FavoritedBooks.vue';

export const routes = [
    { path: '/', component: BrowseBooks },
    { path: '/favorites', component: FavoritedBooks }
];