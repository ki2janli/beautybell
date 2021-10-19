import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import Profile from '@/pages/Profile.vue'

const routes = [
	{
		path:'/',
		name: 'Login',
		component:Login
	},
	{
		path:'/Home',
		name: 'Home',
		component:Home
	},
	{
		path:'/Profile',
		name: 'Profile',
		component:Profile
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router