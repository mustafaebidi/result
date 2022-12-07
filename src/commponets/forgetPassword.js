import { useState } from "react"
import Input from "../commponets/input"

import { MdEmail } from "react-icons/md";

import { useSelector } from "react-redux";



const Forgetpassword=()=>{

    const[error,setError]=useState()

    const {currentResource} = useSelector((state)=>state.lang)


    return(

        <div>

            <div className="mb-16 text-center">
                <h1 className="text-4xl	font-bold">إعادة تعيين كلمة المرور</h1>
            </div>

            <div>

                <Input name="email" placeholder={currentResource.entreYourEmail} icon={<MdEmail color="white"/>}/>

            </div>
        </div>

    )
}

export default Forgetpassword