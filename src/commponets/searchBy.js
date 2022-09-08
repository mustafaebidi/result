
import { AiOutlineSearch } from "react-icons/ai";





const SearchBy=()=>{

    const onSubmit=()=>{
        console.log(4)
    }
    return(
        <div className="my-3">
            <div className="flex gap-2 bg-main text-white p-3">
                <span>SearchBy</span>

                <div>Name or Seat number</div>

            </div>
            <form onSubmit={onSubmit}>
                <div className="flex w-full border-b-2">
    
                    <input className="w-full p-2 outline-0"/>
                    <div className="p-2">
                        <AiOutlineSearch  size={25}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBy