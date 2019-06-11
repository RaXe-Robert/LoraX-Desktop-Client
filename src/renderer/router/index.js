import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('@/pages/Home').default,
            children: [
                {
                    path: '/servers',
                    name: 'servers',
                    component: require('@/pages/Servers').default,
                    meta: {
                        buttons: [
                            {
                                name: 'call admin',
                                action: () => { console.log('hi'); }
                            }
                        ]
                    }
                },
                {
                    path: '/stats',
                    name: 'stats',
                    component: require('@/pages/Stats').default
                },
                {
                    path: '/group-finder',
                    name: 'group-finder',
                    component: require('@/pages/GroupFinder').default
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: require('@/pages/Settings').default
                },
                {
                    path: '/about',
                    name: 'about',
                    component: require('@/pages/About').default
                },
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
