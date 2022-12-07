import { createContext, useContext, useState } from "react";



const optionContext = createContext()


const OptionProvider=({children})=>{



    const[options,setOptions]=useState({
        searchBy:"",
        value:"",
        page:1,
    })





    return(
        <optionContext.Provider value={{setOptions,options}}>{children}</optionContext.Provider>
    )

}

export const useGlobalContext = () => {
    return useContext(optionContext)
}
  
export { OptionProvider, optionContext }
