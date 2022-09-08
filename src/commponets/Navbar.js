


import { selectCurrentUser } from "../store/slice/auth"
import { useSelector } from "react-redux";



const Navbar=()=>{

    const user = useSelector(selectCurrentUser)

    return(

        
        <div className="py-4 text-white bg-main">
        <div className="container mx-auto px-4 flex justify-between">
            <div className="font-bold text-xl">Natigak</div>
            <div>{user}</div>
        </div>
    </div>

    )
}

export default Navbar