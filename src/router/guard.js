import { useAuthStore } from "@/store/auth.module"

export const setgurad = (router) => {
    router.beforeEach((to,from,next) => {
        
        const authStore = useAuthStore()

        const authCheck = localStorage.getItem('auth')
        const userCheck = localStorage.getItem('user')

        const isLoggedIn = !!((authStore._user && authStore._authenticated) || (userCheck && authCheck));

        if (isLoggedIn) {
            if (to.name === 'login' || to.name === 'register') {
                return next({ name: 'home' });
            }
        } else {
            if (to.name !== 'login' && to.name !== 'register') {
                return next({ name: 'login' });
            }
        }

        next();

    }) 
}   