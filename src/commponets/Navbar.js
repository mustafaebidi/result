


import { selectCurrentUser } from "../store/slice/auth"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styled from 'styled-components'

const Button = styled.div`
    

    &:hover > div{

        transform: translate(0px,0px) rotate(0deg);
        transition: all 0.3s;

    } 
`

const Navbar=()=>{

    const user = useSelector(selectCurrentUser)

    return(

        
        <div className="py-4 text-white bg-main shadow-[0_2px_4px_0px_rgba(0,0,0,0.2)]">
        <div className="container mx-auto px-4 flex justify-between">
            <Link  className="font-bold text-xl block relative overflow-hidden top-0 w-44 group " to="/">
                <div className="group-hover:opacity-0 duration-[300ms]">نتجتك</div>
                <Button className="flex gap-1 absolute top-0">
                    <div className="rotate-[45deg] translate-y-[100px] duration-[300ms]">اعرف</div>
                    <div className="rotate-[-45deg] translate-y-[-100px] duration-[300ms]">نتجتك</div>
                </Button>
            </Link>
            <div className="font-bold text-xl capitalize">{user}</div>
        </div>
    </div>

    )
}

export default Navbar