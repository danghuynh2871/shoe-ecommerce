import { createWebHistory, createRouter } from "vue-router";
import Register from '@/components/ComRegister.vue'
import Login from '@/components/ComLogin.vue'
import Admin from '@/components/admin/ComAdmin.vue'
import ComProductManagement from '@/components/admin/ComProductManagement.vue'; // Updated to welcome interface
import ListProduct from '@/components/admin/products/ListProduct.vue'; // New component
import ListCustomer from '@/components/admin/customers/ListCustomer.vue'; // New component
import InsertProduct from '@/components/admin/products/InsertProduct.vue';
import CustomerManagement from '@/components/admin/ComCustomerManagement.vue';

const routes = [
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        children: [
            {
                path: "products",
                name: "ComProductManagement",
                component: ComProductManagement
            },
            {
                path: "products/list",
                name: "ListProduct",
                component: ListProduct
            },
            {
                path: "products/insert",
                name: 'InsertProduct',
                component: InsertProduct
            },
            {
                path: "customers",
                name: "CustomerManagement",
                component: CustomerManagement
            },
            {
                path: "customers/list",
                name: "ListCustomer",
                component: ListCustomer
            },
            
        ]
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;