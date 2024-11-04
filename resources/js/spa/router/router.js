import {createRouter, createWebHistory} from "vue-router";

// === === === === Portal layout === === === === //
import layout from "../layout/layout.vue";
import home from "../pages/home.vue";

// === === === === Routes Declare === === === === //
const routes = [

    // === === === === Routes declare of portal layout === === === === //
    {
        path: '/', name: 'layout', component: layout,
        children: [
            {path: '', name: 'home', component: home },
        ]
    },

];

// === === === === Routes create router as show history and scroll behavior === === === === //
const router = createRouter({
    history: createWebHistory(), routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) { return { el: to.hash, behavior: 'smooth' }; } else { return {top: 0, behavior: 'smooth'}; }
    }
});

export default router;
