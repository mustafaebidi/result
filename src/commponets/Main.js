import { Fragment } from "react"

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";






const Main=()=>{



    return(
        <Fragment>
            <Navbar/>

            <Outlet/>
        
        </Fragment>
    )
}

export default Main