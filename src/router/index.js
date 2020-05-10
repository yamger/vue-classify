import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: ['user', 'admin'],
        children: [
            {
                path: "",
                redirect: "search"
            },
            {
                path: "search",
                name: 'search',
                meta:{
                    keepAlive:true
                },
                component: () => import("../components/home/search"),

            },
            {
                path: 'admin',
                name: 'admin',
                meta:{
                    keepAlive:false
                },
                component: () => import("../components/home/admin")
            },
            {
                path: "journal-info",
                name:"journal-info",
                meta:{
                  keepAlive: false
                },
                component: () => import("../components/journal/journalInfo")
            },
        ]
    },
    {
        path: '*',
        name: '404',
        component: () => import("../views/404")
    }

]

const router = new VueRouter({
    routes
})

export default router
