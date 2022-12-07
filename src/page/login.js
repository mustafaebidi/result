import {  useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

import { FaKey } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion"
import Input from "../commponets/input";

import { useSelector } from "react-redux";

import { selectCurrentResource } from "../store/slice/lang";
import { useLoginMutation } from "../store/slice/auth/authApiSlice";

import { toast } from 'react-toastify';




const Login=()=>{

    const [login, {error}] = useLoginMutation()
    const currentResource = useSelector(selectCurrentResource)



    let fields=[
        {
            id:1,
            placeholder:currentResource.entreYourEmail,
            name:"email",
            icon:<FaUser color="white"/>,
            required: true,
    
    
        },
        {
            id:2,
            placeholder:currentResource.entreYourPassword,
            name:"password",
            icon:<FaKey color="white"/>,
            required: true,
    
        }
    ]




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
            const we= await login({ email, password }).unwrap()
       
        }
        catch (err){
            console.log(err)
            if( err.status !== 401 && err.status !== 400){
                toast.error('الانترنت مقطوع حاول الاتصال بالانترنت', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

 
        }
    }

    

    



    return(

        <motion.div
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }} 
        >
            <motion.div className="flex flex-col gap-4 mb-4 text-center">
                <h2 className="text-5xl	font-bold">{currentResource.welcomeBack}</h2>
                <span className="text-gray-500 font-bold">{currentResource.loginToContinue}</span>
            </motion.div>
 
            <form className="flex flex-col gap-6" autoComplete="off">

                {fields.map((field)=>{
                    const{id,icon,...rest}=field
                    return(
                        <Input onChange={onChange} key={id} icon={icon} {...rest}/>
                    )
                })}


                <div className="">
                    <Link to="/forget-password">{currentResource["forgetPassword!"]}</Link>
                </div>

                <div className="text-center text-red-600">{error ? (error?.data?.msg || error?.data?.errors[0]?.msg ) : null}</div>

                <div  className="flex flex-col gap-10 text-center">
                    <button onClick={onSubmit} className="bg-main p-2 text-[white] cursor-pointer rounded">
                        {currentResource.login}
                    </button>

                    <NavLink className="bg-main  text-[white] rounded  block p-2" to="/signup">{currentResource.signup}</NavLink>

                </div>


            </form>
        </motion.div>
    )
}
export default Login