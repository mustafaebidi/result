import { memo, useRef } from "react"


const Input=(props)=>{


    const ref=useRef()
    const {icon,pattern,errorMessage,value,onChange,...rests}=props
    

    const isValid=(value)=>{

        if(pattern){
            ///return typeof(pattern) === typeof("") ?console.log(77) : pattern.test(value)

            return (typeof(pattern) === typeof("")) ? 
                                                        (pattern === value) ? true :false    
                                                    : pattern.test(value)
        }
        return false
    }


    return(
        <div>
            <div  className="flex">
                <input
                    autoComplete="off"
                    value={value} 
                    ref={ref} 
                    className="bg-input p-4 rounded border-none w-full outline-0" 
                    onChange={(e)=>onChange(e,isValid(ref.current.value))} 
                    {...rests} 
                />

                <div className="bg-main p-4 rounded flex justify-center items-center">
                    {icon}
                </div>
            </div>

            {pattern && <div className={`${value && !isValid(value) ? "" :"hidden" } text-red-600`}>{errorMessage}</div>}
        </div>
    )
}

export default memo(Input)


