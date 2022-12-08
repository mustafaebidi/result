import {  useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import Input from "../commponets/input";
import { motion } from "framer-motion"
import { useSelector  } from "react-redux";

import { Navigate} from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import ReactLoading from "react-loading";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectCurrentResource } from "../store/slice/lang";
import { useSignupMutation } from "../store/slice/auth/authApiSlice";
import { Fragment } from "react";

const username=/^[A-Za-z0-9]{3,16}$/
const email=/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/
const password=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/





const Signup=()=>{

    const currentResource = useSelector(selectCurrentResource)
    const [signup,{isSuccess,error,status}] =useSignupMutation()
    const navigate =useNavigate()


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
            [e.target.name]:{value:e.target.value,valid:valid}
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
            await signup({username,email,password}).unwrap()

            toast.success('تم التسجيل بنجاح', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

        }
        catch(err){
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
                });
            }
        }
        
    }


    if(isSuccess){
        return <Navigate to="/login" replace />
    }

    return(

        <Fragment>
        
        <div className={` ${status === "pending" ?"flex" :"hidden"} flex justify-center items-center h-[100%] w-[100%] bg-[#ffffff56]   top-0 fixed  left-0  z-50`}>
            <ReactLoading type="bubbles" color="#F53E3D" height={100} width={50} />
        </div>

        <motion.div
            initial={{ x: "-100vw" }} 
            animate={{ x: 0 }}
            transition={{dalay:0.5 , type:"spring"}} 
        
        >
            <div className="mb-12 text-center">
                <h1 className="text-5xl	font-bold">تسجيل</h1>
            </div>
            <form className="flex flex-col gap-6" onSubmit={onSubmit}  autoComplete="off">

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
                    تسجيل
                </button>

                


            </form>

        </motion.div>
        </Fragment>
    )
}
export default Signup