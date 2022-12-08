
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


import Pagination from '@mui/material/Pagination';
import { useState } from "react";
import { useGlobalContext } from "../context";
import CustomTable from "../commponets/CustomTable";
import ReactLoading from "react-loading";


import { resultApiSlice } from "../store/slice/results/resultApiSlice";





const ResultsList=()=>{

    const {setOptions,options}=useGlobalContext()
    const [page,setPage]=useState(1)



    const {data,error,isFetching} = resultApiSlice.endpoints[options.searchBy].useQuery({name:options.value,page})



    if(error?.status === "FETCH_ERROR"){
        toast.error('الانترنت مقطوع حاول الاتصال بالانترنت', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            toastId: "result",
        });
    }

    

    const handlePagination=(e,page)=>{
        setPage(page)
        setOptions((state)=>({...state,page}))
    }



    const handleChange=async(searchBy,value)=>{
            setOptions((state)=>({...state,searchBy:searchBy,value:value,page:1}))
            setPage(1)
    }


    let columns=[
        {
            id:"name",
            label: 'الاسم',
            align:"center",
        
            Render:({data,id})=>{
                return(
                    <Link className="duration-300 hover:text-main" to={`/singleResult/${data["studentInfo"]["sittingNumber"]}`}>{data["studentInfo"][id]}</Link>
                )
            }
    
        },
    
        {
            id:"school",
            label: 'المدرسة',
            align:"center",
            api:"getBySchool",
    
    
            Render:({data,id})=>{
                let value=data["studentInfo"][id]
                return(
                    <div className="cursor-pointer  duration-300 hover:text-main"  onClick={()=>handleChange("getBySchool",value)}>{value}</div>
                )
            }

        },
    
        {
            id:"educationalAdministration",
            label: 'الادارة التعلمية',
            align:"center",

            Render:({data,id})=>{
                let value=data["studentInfo"][id]
                return(
                    <div className="cursor-pointer duration-300 hover:text-main" onClick={()=>handleChange("getByAdministration",value)}>{value}</div>
                )
    
            }
    
        },
        {
            id:"division",
            label: 'الشعبة',
            align:"center",
        },
    
        {
            id:"studentStatus",
            label: 'حاله الطالب',
            align:"center",
        }
        ,
        {
            id:"totalScores",
            label: 'المجموع',
            align:"center",    
        }
    ]



    return(

        <div className="container mx-auto px-4 py-6 overflow-auto">
            <div className={` ${isFetching ?"flex" :"hidden"} flex justify-center items-center h-[100%] w-[100%] bg-[#ffffff56]  fixed  left-0  z-50`}>
                <ReactLoading type="bubbles" color="#F53E3D" height={100} width={50} />
            </div>

            <CustomTable data={data.data} columns={columns} />

            <Pagination className="py-4" onChange={handlePagination} page={page} count={Math.ceil(data.lenOfReslts/12)} color="primary" />

        </div>
    )
}

export default ResultsList