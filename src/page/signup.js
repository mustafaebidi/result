import {  useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import Input from "../commponets/input";
import { motion } from "framer-motion"
import { useSelector  } from "react-redux";

import { Navigate} from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectCurrentResource } from "../store/slice/lang";
import { useSignupMutation } from "../store/slice/auth/authApiSlice";

const username=/^[A-Za-z0-9]{3,16}$/
const email=/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/
const password=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/








const Signup=()=>{

    const currentResource = useSelector(selectCurrentResource)
    const [signup,{isSuccess,error}] =useSignupMutation()

    const [values, setValues] = useState({
        username:{
            value:"",
            valid:false,
        },
        email: {
            value:"",
            valid:false,
        },
        password: {
            value:"",
            valid:false,
        },
        confirmPassword: {
            value:"",
            valid:false,
        },
      });
    


    const attrbit=[
    {
        id:1,
        placeholder:currentResource.entreYourName,
        icon:<FaUser color="white"/>,
        name: "username",
        required: true,
        errorMessage:"Username should be 3-16 characters and shouldn't include any special character!",
        pattern: username,

    },
    {
        id:2,
        placeholder:currentResource.entreYourEmail,
        icon:<MdEmail color="white"/>,
        name: "email",
        type: "email",
        required: true,
        errorMessage: "It should be a valid email address!",
        pattern: email,

    },
    {
        id:3,
        placeholder:currentResource.entreYourPassword,
        icon:<FaKey color="white"/>,
        name: "password",
        type: "password",
        required: true,
        errorMessage: "Password not vaild",
        pattern: password,


    },
    {
        id:4,
        placeholder:currentResource.confirmPassword,
        icon:<FaKey color="white"/>,
        name: "confirmPassword",
        type: "password",
        required: true,
        errorMessage: "Passwords don't match!",
        pattern:values.password.value,


    }
    ]


    const onChange=(e,valid)=>{
    

    setValues((state)=>({
        ...state,
        [e.target.name]:{
                            value:e.target.value,
                            valid:valid
                        }
    }))

    }

    const isValid=()=>{

        const fields=Object.values(values)

        const getValues=fields.map((value)=>{
            return value.valid
        })

        return getValues.every(Boolean)
    }


    const onSubmit=async(e)=>{

        e.preventDefault()

        const password=values.password.value
        const email=values.email.value
        const username=values.username.value

        try{
            const result=await signup({username,email,password}).unwrap()
            toast.success('تم التسجيل بنجاح', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(result)
        }
        catch(err){
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


    if(isSuccess){
        return <Navigate to="/login" replace />
    }

    return(

        <motion.div
            initial={{ x: "-100vw" }} 
            animate={{ x: 0 }}
            transition={{dalay:0.5 , type:"spring"}} 
        
        >
            <div className="mb-12 text-center">
                <h1 className="text-5xl	font-bold">Sign Up</h1>
            </div>
            <form className="flex flex-col gap-6" onSubmit={onSubmit} autocomplete="off">

                {attrbit.map((elment)=>{
                    let {icon,id,...rests}=elment

                    return(
                        <Input value={values[rests.name].value} key={id} icon={icon} onChange={onChange}  {...rests}/>
                    )

                })}

                <div className="text-center text-red-600">{error && (error?.data?.msg || error?.data?.errors[0]?.msg )}</div>

                <button   
                    className="bg-main p-2 text-[white]  rounded mt-10 disabled:opacity-75 " 
                    onClick={onSubmit}
                    disabled={!isValid()}
                >
                    {currentResource.signup}
                </button>

                


            </form>

        </motion.div>
    )
}
export default Signup