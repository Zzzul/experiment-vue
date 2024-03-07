export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/LoginView.vue'),
        meta: {
            requiresGuest: false
        }
    },
]