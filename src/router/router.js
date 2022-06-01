import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    { 
        path: '/', 
        component: ()=> import(/* webpackChunkName: "OrderListPage" */'@/modules/shop/pages/OrderListPage') 
    },
    { 
        path: '/item/id', 
        component: ()=> import(/* webpackChunkName: "ItemPage" */'@/modules/shop/pages/ItemPage') 
    },
    { 
        path: '/:id', 
        component: ()=> import(/* webpackChunkName: "OrderPage" */'@/modules/shop/pages/OrderPage') 
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: ()=> import(/* webpackChunkName: "OrdeNotFoundrListPage" */'@/modules/shared/pages/NotFoundPage') 
    },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router;