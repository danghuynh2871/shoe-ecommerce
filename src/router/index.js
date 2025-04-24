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