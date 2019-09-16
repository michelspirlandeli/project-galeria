import Vue from 'vue'
import Router from 'vue-router'

import home from './components/home/home.vue'
import manterGaleria from './components/galeria/manterGaleria.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/home', name: 'home', component: home},
        { path: '/galeria', name: 'manterGaleria', component: manterGaleria}
    ]
})  