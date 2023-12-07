import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/customers',
                    name: 'customers',
                    component: () => import('@/views/pages/customers/list.vue')
                },
                {
                    path: '/customers/add',
                    name: 'add_customers',
                    component: () => import('@/views/pages/customers/add.vue')
                },
                {
                    path: '/roles/list',
                    name: 'roles',
                    component: () => import('@/views/pages/authorization/roles/list.vue')
                },
                {
                    path: '/permissions/list',
                    name: 'permissions_list',
                    component: () => import('@/views/pages/authorization/permissions/list.vue')
                },
                {
                    path: '/users/list',
                    name: 'users_list',
                    component: () => import('@/views/pages/authorization/users/list.vue')
                },
                {
                    path: '/users/add',
                    name: 'users_add',
                    component: () => import('@/views/pages/authorization/users/add.vue')
                },
                {
                    path: '/users/edit/:id',
                    component: () => import('@/views/pages/authorization/users/edit.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

const publicRoutes = ['login', 'forgot-password', 'change-password-token', 'error', 'accessDenied', 'notfound'];

router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken && !publicRoutes.includes(to.name)) {
        next('/auth/login');
    } else if (accessToken && publicRoutes.includes(to.name)) {
        next('/');
    } else {
        next();
    }
});

export default router;
