
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { OptionProvider } from "../context";
import Navbar from "./Navbar";





const Main=()=>{




    return(
            <Fragment>
                <Navbar/>
                <OptionProvider>
                    <Outlet/>
                </OptionProvider>
            </Fragment>
    )
}

export default Main