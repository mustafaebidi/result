import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchBy from "../commponets/SearchBy"
import { AiOutlineSearch } from "react-icons/ai";
import { useGlobalContext } from "../context"
import { toast } from 'react-toastify';
import GeneralStatistics from "../commponets/GeneralStatistics";
import { resultApiSlice,useLazyGetResultsBySittingNumberQuery } from "../store/slice/results/resultApiSlice";
import ReactLoading from "react-loading";


const searchOptions=[
    {
        id:"name",
        name:"الاسم او رقم الجلوس",
        api:"getResultByName",

    },
    {
        id:"school",
        name:"المدرسة",
        api:"getBySchool"

    },
    {
        id:"educationalAdministration",
        name:"الاداره التعليمة",
        api:"getByAdministration"

    }
]





const Home=()=>{


    const {setOptions}=useGlobalContext()



    const [searchBar,setSearchBar]=useState({
        searchBy:"getResultByName",
        value:"",
    })

    const [trigger, {isLoading}] = resultApiSlice.endpoints[searchBar.searchBy].useLazyQuery()
    const [resultsBySittingNumber]=useLazyGetResultsBySittingNumberQuery()

    const [err,setErr] =useState("")
    const navigate =useNavigate()



    const onSubmit=async(e)=>{
        e.preventDefault()
        try{
            
            if(searchBar.searchBy === "getResultByName" && Number.isInteger(Number(searchBar.value))){
                const  res=await resultsBySittingNumber(searchBar.value).unwrap()
                console.log(res)
                navigate(`singleResult/${searchBar.value}`)
                return ;

            }

            const res=await trigger({name:searchBar.value,page:1}).unwrap()
            setOptions({...searchBar,page:1})
            navigate("results")
            console.log(res)

        }
        catch(err){

            console.log(err)

            if(err.status !== 404 && err.status !== 400 ){
                console.log(err)
                setErr("")
                toast.error('الانترنت مقطوع حاول الاتصال بالانترنت', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                return;
            }
            const {data}=err
            setErr( data.msg || data?.errors[0]?.msg )
        }

    }

    return(
        <div>
            <div className={` ${isLoading ?"flex" :"hidden"} flex justify-center items-center h-[100%] w-[100%] bg-[#ffffff56]  fixed  left-0  z-50`}>
                <ReactLoading type="bubbles" color="#F53E3D" height={100} width={50} />
            </div>

            <div>
                <SearchBy>

                    <div className="my-3">
                        <div  className="flex gap-2 bg-main text-white p-3">
                            <span className="p-2 whitespace-nowrap">البحث ب</span>
                            <div className="flex gap-2 flex-wrap">
                                {searchOptions.map(({id,name,api})=>{
                                    return(
                                        <div onClick={()=>{setSearchBar((prev)=>({...prev,searchBy:api}))}} className={`${searchBar.searchBy === api ?"active" :""} font-bold p-2 cursor-pointer`} key={id}>{name}</div>
                                    )

                                })}
                            </div>  

                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="flex w-full border-b-2">
                
                                <input type="text" onChange={(e)=>(setSearchBar((prev)=>({...prev,value:e.target.value})))} className="w-full py-2 px-6 outline-0"/>
                                <div className="p-2 cursor-pointer" onClick={onSubmit}>
                                    <AiOutlineSearch  size={25}/>
                                </div>
                            </div>
                        </form>
                    </div>

                </SearchBy>

                <div className="text-[red]" to="SingleResult">{err}</div>           
            </div>

      
            <div className="bg-[#bdc0bd33]">
                <div className="mt-8 mx-auto max-w-[1200px] p-5">
                    <div className="p-4">
                        <h2 className="text-center text-[#444] font-bold text-4xl mb-2">إحصاءات عامة</h2>
                        <div className=" w-[82px] mx-auto h-[3px] bg-[#80808031] relative  rounded after:content-[''] after:w-7 after:h-[3px] after:rounded after:absolute  after:bg-[red] after:left-6">
                            
                        </div>
                    </div>
                    <GeneralStatistics/>
                </div>
            </div>


            {/*<StudentGraduate/>*/}

        </div>  
    )
}





export default Home