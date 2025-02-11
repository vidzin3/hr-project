import { createRouter,createWebHistory } from "vue-router"
import { setgurad } from "./guard";
import { useAuthStore } from "@/store/auth.module";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        // {
        //     path:'/',
        //     component:() => import('@/App.vue'),
        //     children:[
                
        //     ]
        // }
        {
            path:'/',
            redirect:{
                name:'home'
            }
        },
        {
            path:'/',
            component:() => import('@/layout/default.vue'),
            children:[
                {
                    path: '/dashboard',
                    name:'home',
                    component: () => import('@/page/index.vue'),
                },
                {
                    path: '/employee',
                    name:'employee',
                    children:[
                        {
                            path:'/employee/list',
                            name:'employee-list',
                            component: () => import('@/page/employees/list/index.vue'),
                        },
                        {
                            path: '/employee/create',
                            name:'employee-create',
                            component: () => import('@/page/employees/form/create.vue'),
                        },
                        {
                            path: '/employee/update/:id',
                            name:'employee-update',
                            component: () => import('@/page/employees/form/update.vue'),
                        },
                        {
                            path: '/employee/transaction/list',
                            name:'employee-transation-list',
                            component: () => import('@/page/employees/transaction/index.vue'),
                        },
                        {
                            path: '/employee/transaction/create',
                            name:'employee-transation-create',
                            component: () => import('@/page/employees/transaction/create.vue'),
                        },
                        {
                            path: '/employee/transaction/update/:id',
                            name:'employee-transation-update',
                            component: () => import('@/page/employees/transaction/update.vue'),
                        },
                        {
                            path: '/employee/transaction/report',
                            name:'employee-transation-report',
                            component: () => import('@/page/employees/transaction/report.vue'),
                        },
                        {
                            path: '/employee/report',
                            name:'employee-report',
                            component: () => import('@/page/employees/reports/index.vue'),
                        },
                    ]
                },
                {
                    path: '/attendance',
                    name:'attendance',
                    children:[
                        {
                            path:'/attendance/list',
                            name:'attendance-list',
                            component: () => import('@/page/attendance/index.vue'),
                        },
                        {
                            path:'/attendance/create',
                            name:'attendance-create',
                            component: () => import('@/page/attendance/create.vue'),
                        },
                        {
                            path:'/attendance/update/:id',
                            name:'attendance-update',
                            component: () => import('@/page/attendance/update.vue'),
                        },
                        {
                            path:'/attendance/report',
                            name:'attendance-report',
                            component: () => import('@/page/attendance/report.vue'),
                        },
                    ]
                },
                {
                    path:'/setting',
                    name:'settings',
                    children:[
                        {
                            path:'/setting/label',
                            name:'label-application',
                            component:() => import('@/page/settings/label-application/index.vue')
                        },
                        {
                            path:'/setting/user',
                            name:'user',
                            children:[
                                {
                                    path:'/setting/user/list',
                                    name:'user-list',
                                    component:() => import('@/page/settings/user/index.vue')
                                },
                                {
                                    path:'/setting/user/create',
                                    name:'user-create',
                                    component:() => import('@/page/settings/user/create.vue')
                                },
                                {
                                    path:'/setting/user/update/:id',
                                    name:'user-update',
                                    component:() => import('@/page/settings/user/update.vue')
                                },
                                {
                                    path:'/setting/user/change_password/:id',
                                    name:'user-change-password',
                                    component:() => import('@/page/settings/user/changePassword.vue')
                                },
                                {
                                    path:'/setting/user/profile',
                                    name:'user-profile',
                                    component:() => import('@/page/settings/user/profile.vue')
                                },
                            ]
                        },
                        {
                            path:'/setting/position/list',
                            name:'position',
                            component:() => import('@/page/settings/position/index.vue')
                        },
                        {
                            path:'/setting/position/create',
                            name:'position-create',
                            component:() => import('@/page/settings/position/create.vue')
                        },
                        {
                            path:'/setting/position/show/:id',
                            name:'position-show',
                            component:() => import('@/page/settings/position/show.vue')
                        },
                        {
                            path:'/setting/position/updatet/:id',
                            name:'position-update',
                            component:() => import('@/page/settings/position/update.vue')
                        },
                        {
                            path:'/setting/office/list',
                            name:'office',
                            component:() => import('@/page/settings/office/index.vue')                                
                        },
                        {
                            path:'/setting/office/create',
                            name:'office-create',
                            component:() => import('@/page/settings/office/create.vue')                                
                        },
                        {
                            path:'/setting/office/show/:id',
                            name:'office-show',
                            component:() => import('@/page/settings/office/show.vue')                                
                        },
                        {
                            path:'/setting/office/update/:id',
                            name:'office-update',
                            component:() => import('@/page/settings/office/update.vue')                                
                        },
                    ]
                }
            ]
        },
        {
            path:'/login',
            redirect:{
                name:'login'
            }
        },
        {
            path:'/login',
            component:() => import('@/layout/blank.vue'),
            children:[
                {
                    path: '/login',
                    name:'login',
                    component: () => import('@/page/login.vue'),
                },
                {
                    path: '/register',
                    name:'register',
                    component: () => import('@/page/register.vue'),
                },
            ]
        },
        {
            path:('/:path(.*)'),
            component:() => import("@/page/not-auth.vue")
        }
    ]
});

setgurad(router)

// router.beforeEach((to,from,next) => {
//     const authStore = useAuthStore()

//     const authCheck = localStorage.getItem('auth')
//     const userCheck = localStorage.getItem('user')

//     const isLoggedIn = !!((authStore._user && authStore._authenticated) || (userCheck && authCheck));

//     if (isLoggedIn) {
//         if (to.name === 'login' || to.name === 'register') {
//             return next({ name: 'home' });
//         }
//     } else {
//         if (to.name !== 'login' && to.name !== 'register') {
//             return next({ name: 'login' });
//         }
//     }

//     next();
    
// }) 

export default router;