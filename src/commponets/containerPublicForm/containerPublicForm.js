import {ReactComponent as ReactLogo} from '../../Untitled-3-01.svg';
import { Outlet } from "react-router-dom";


const ContainerPublicForm=()=>{
    return(
        <div className="flex justify-center items-center min-h-screen relative overflow-hidden">

            <ReactLogo className="absolute right-0 top-[-6px] max-w-3xl" />
            <div className="mu:bottom-[-315px] mu:left-[-315px] w-[30rem] h-[30rem] absolute bottom-[-280px] left-[-280px] rounded-full bg-main"></div>

            <div className='px-12 w-[39rem] relative z-10  py-40'>
                <Outlet/>
            </div>

        </div>
    )
}

export default ContainerPublicForm;