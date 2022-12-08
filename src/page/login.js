import {  Fragment, useState } from "react";
import { FaUser } from "react-icons/fa";

import { FaKey } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion"
import Input from "../commponets/input";


import { useLoginMutation } from "../store/slice/auth/authApiSlice";
import ReactLoading from "react-loading";

import { toast } from 'react-toastify';

let fields=[
    {
        id:1,
        placeholder:"ادخل البريد الالكتروني",
        name:"email",
        icon:<FaUser color="white"/>,
        required: true,


    },
    {
        id:2,
        placeholder:"ادخل كلمة السر",
        name:"password",
        type: "password",

        icon:<FaKey color="white"/>,
        required: true,

    }
]




const Login=()=>{

    const [login, {error,status}] = useLoginMutation()










    const[values,setValues]=useState({
        email:"",
        password:""
    })

    const onChange=(e)=>{

        setValues((state)=>{
            return {...state,[e.target.name]:e.target.value}
        })

    }

    const onSubmit=async (e)=>{
        e.preventDefault()
        const{email,password}=values

        try{

            await login({ email, password }).unwrap()
       
        }
        catch (err){
            if( err.status !== 401 && err.status !== 400){
                toast.error('الانترنت مقطوع حاول الاتصال بالانترنت', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: "result",

                });
            }

 
        }
    }

    

    



    return(

        
        
        <Fragment>

            <div className={` ${status === "pending" ?"flex" :"hidden"} flex justify-center items-center h-[100%] w-[100%] bg-[#ffffff56]   top-0 fixed  left-0  z-50`}>
                <ReactLoading type="bubbles" color="#F53E3D" height={100} width={50} />
            </div>
            
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }} 
            >
                <motion.div className="flex flex-col gap-4 mb-4 text-center">
                    <h2 className="text-5xl	font-bold">مرحبا بعودتك</h2>
                    <span className="text-gray-500 font-bold">تسجيل الدخول للمتابعة</span>
                </motion.div>
    
                <form className="flex flex-col gap-6" autoComplete="off">

                    {fields.map((field)=>{
                        const{id,icon,...rest}=field
                        return(
                            <Input onChange={onChange} key={id} icon={icon} {...rest}/>
                        )
                    })}


                    <div >
                        <Link to="/forget-password">هل نسيت كلمة السر ؟</Link>
                    </div>

                    <div className="text-center text-red-600">{error ? (error?.data?.msg || error?.data?.errors[0]?.msg ) : null}</div>

                    <div  className="flex flex-col gap-10 text-center">
                        <button onClick={onSubmit} className="bg-main p-2 text-[white] cursor-pointer rounded">
                            تسجيل الدخول
                        </button>

                        <NavLink className="bg-main  text-[white] rounded  block p-2" to="/signup">تسجيل</NavLink>

                    </div>


                </form>
            </motion.div>
        </Fragment>
    )
}
export default Login