import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

import { FaKey } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import Input from "../input/input";
import { useSelector,useDispatch } from "react-redux";
import { login, reset, selectCurrentUser } from "../../store/slice/auth";

import { selectCurrentResource } from "../../store/slice/lang";




const Login=()=>{


    const dispath=useDispatch()

    const currentResource = useSelector(selectCurrentResource)
    const {isError,errorMsg,isSuccess} =useSelector((state)=>state.auth)
    const user = useSelector(selectCurrentUser)



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

    const onSubmit=(e)=>{
        e.preventDefault()
        const{email,password}=values
        dispath(login({email,password}))
    }


    //if(user){
        //navigate("/", { replace: true })
    //}


    //useEffect(()=>{
        //if(user){
            //navigate("/")
        //}

    //},[navigate, user])


    useEffect(()=>{

        return(()=>{
            dispath(reset())

        })

    },[dispath])




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
 
            <form className="flex flex-col gap-6">

                {fields.map((field)=>{
                    const{id,icon,...rest}=field
                    return(
                        <Input onChange={onChange} key={id} icon={icon} {...rest}/>
                    )
                })}


                <div className="">
                    <Link to="/forget-password">{currentResource["forgetPassword!"]}</Link>
                </div>

                <div>{isError}</div>

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