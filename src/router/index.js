import moment from 'moment'
import Vue from 'vue'
import VueRouter from 'vue-router'
import aboutComponent from '../components/About'
import mapComponent from '../components/Map'
import loginComponent from '../components/Login'
import landComponent from '../components/Land'
import registerComponent from '../components/Register'

moment.locale('ru');

Vue.use(VueRouter);

const routes = [
    {
        name: 'root',
        path: '/',
        props: true,
        redirect: to => {
            return { name: 'map' };
        }
    },
    {
        name: 'about',
        path: '/about',
        component: aboutComponent
    },
    {
        name: 'node',
        path: '/:type(node|way)/:node',
        component: mapComponent
    },
    {
        name: 'position',
        path: '/map/:zoom/:lat/:lon',
        component: mapComponent
    },
    {
        name: 'map',
        path: '/map/:action?',
        props: true,
        component: mapComponent
    },
    {
        name: 'login',
        path: '/login',
        props: true,
        component: loginComponent
    },    
    {
        name: 'register',
        path: '/register',
        props: true,
        component: registerComponent
    },
    {
        name: 'land',
        path: '/land',
        component: landComponent
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router