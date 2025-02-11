import { createPinia, defineStore } from "pinia";
import user_data from '@/data/user.json'
import Swal from "sweetalert2";
import Toast from "@/helper/toast";
import router from "@/router";

import employee from '@/data/employee.json'
import position from '@/data/position.json'
import office from '@/data/office.json'
import work_experience_type from '@/data/work_experience_type.json'
import work_experience from '@/data/work_experience.json'
import attendance from '@/data/attendance.json'
import region from '@/data/region.json'
import countrie from '@/data/contries.json'
import province from '@/data/province.json'
import district from '@/data/district.json'
import commune from '@/data/commune.json'
import village from '@/data/village.json'

export const useAuthStore = defineStore('useAuthStore',{
    state:() => ({
        _authenticated: false,
        _user: {},
        _accessToken: null,    
        _refreshToken: null,    
        _isTokenRefreshing: false,
        _notification: [],
    }),
    getters:{

    },
    actions:{
        setUsers(user_data) {
            localStorage.setItem("users", JSON.stringify(user_data));
        },
        login(payload){
            let user = JSON.parse(localStorage.getItem('users'))
            const users = user.find((e) => e.username == payload?.username)
            if(users){
                if(users?.password != payload?.password){
                    Swal.fire({
                        title:"Password is wrong",
                        icon:"error"
                    })
                }else {
                    if(users.is_disabled == 1 || users?.is_disabled == true){
                        Swal.fire({
                            title:"User is Disabled",
                            icon:"error"
                        })
                    }else {
                        this._user = users
                        localStorage.setItem("auth",this._authenticated = true)
                        localStorage.setItem("user",JSON.stringify(this._user))
                        router.push('/dashboard')
                        Toast.fire({
                            title:"Login success",
                            icon:"success"
                        })
                    }
                }
            }
        },
        register(payload){

        },
        verify(){
            localStorage.setItem('employees',JSON.stringify(employee))
            localStorage.setItem('positions',JSON.stringify(position))
            localStorage.setItem('offices',JSON.stringify(office))
            localStorage.setItem('regions',JSON.stringify(region))
            localStorage.setItem('provinces',JSON.stringify(province))
            localStorage.setItem('districts',JSON.stringify(district))
            localStorage.setItem('communes',JSON.stringify(commune))
            localStorage.setItem('villages',JSON.stringify(village))
            localStorage.setItem('countries',JSON.stringify(countrie))
            localStorage.setItem('work_experience_type',JSON.stringify(work_experience_type))
            localStorage.setItem('work_experiences',JSON.stringify(work_experience))
            localStorage.setItem('attendances',JSON.stringify(attendance))
        },
        logout(){
            try{
                localStorage.removeItem("employees")
                localStorage.removeItem("positions")
                localStorage.removeItem("offices")
                localStorage.removeItem("regions")
                localStorage.removeItem("provinces")
                localStorage.removeItem("districts")
                localStorage.removeItem("communes")
                localStorage.removeItem("villages")
                localStorage.removeItem("countries")
                localStorage.removeItem("work_experience_type")
                localStorage.removeItem("work_experiences")
                localStorage.removeItem("attendances")
                localStorage.removeItem("employee_transactions")
                localStorage.removeItem("user")
                localStorage.removeItem("auth")
                Toast.fire({
                    title:"Log out Successfully",
                    icon:"success",
                    timer:500
                }).then((e) => {
                    window.location.reload() 
                })
            }catch(error){
                Toast.fire({
                    title:"Log out failed interuption",
                    icon:"error"
                })
                console.log(error);
            }
        }
    }
})