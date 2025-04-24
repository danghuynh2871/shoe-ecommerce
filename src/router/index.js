<<<<<<< HEAD
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
=======
import { createWebHistory,createRouter } from "vue-router";
import Home from '@/components/ComHome.vue'
import Login from '@/components/ComLogin.vue'
import Cart from '@/components/ComCart.vue'
import About from '@/components/ComAboutUs.vue'
import Contact from '@/components/ComContact.vue'
import Products from '@/components/ComListProduct.vue'

// tạo mảng chứa những đường link
const routes=[
    // đối tượng trang chủ
    {
        path:"/",
        name:"Home",
        component:Home
    },

    // đối tượng trang login
    {
        path:"/login",
        name:"Login",
        component:Login
    },
    // đối tượng trang cart
    {
        path:"/cart",
        name:"Cart",
        component:Cart
    },
    // đối tượng trang about
    {
        path:"/about",
        name:"About",
        component:About
    },
    // đối tượng trang contact
    {
        path:"/contact",
        name:"Contact",
        component:Contact
    },
    // đối tượng trang products
    {
        path:"/products",
        name:"Products",
        component:Products
    },

]
// tạo đối tượng router
const router=createRouter({
    history:createWebHistory(),
    routes
})
export default router
>>>>>>> origin/nhan
