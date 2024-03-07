export default [
    {
        path: '/products',
        name: 'products',
        component: () => import('../views/products/ProductsView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/products/create',
        name: 'productCreate',
        component: () => import('../views/products/CreateProductView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/products/:id',
        name: 'productDetail',
        component: () => import('../views/products/ProductDetailView.vue'),
        meta: {
            requiresAuth: true
        }
    }
    
]
