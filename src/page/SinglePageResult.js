
import {  useParams } from "react-router-dom"
import { motion } from "framer-motion"

import { useGetResultsBySittingNumberQuery } from "../store/slice/results/resultApiSlice";
import { useGlobalContext } from "../context"

import ReactLoading from "react-loading";

import { resultApiSlice } from "../store/slice/results/resultApiSlice";
import { useEffect } from "react";

const bigData={

    studentInfo : {
        "sittingNumber": "رقم الجلوس",
        "totalScores": "مجموع الدرجات",
        "percentage": "النسبة المئوية",
        "name": "الأسم",
        "school": "المدرسة",
        "educationalAdministration": "الأدارة التعليمية",
        "studentStatus": "حالة الطالب",
        "educationQuality": "نوعية التعليم",
        "division": "الشعبة"
    },

    calculatedGrades : {
        "arabic": "اللغة العربية",
        "firstForeignLanguage": "اللغة الأجنبية الأولى",
        "secondForeignLanguage": "اللغة الأجنبية الثانية",
        "sumOfPureMathematics": "مجموع الرياضيات البحتة",
        "history": "التاريخ",
        "geography": "الجغرافيا",
        "PhilosophyAndLogic": "الفلسفة والمنطق",
        "PsychologyAndSociology": "علم النفس والاجتماع",
        "chemistry": "الكيمياء",
        "biology": "الأحياء",
        "geologyAndEnvironmentalSciences": "الجيولوجيا وعلوم البيئة",
        "appliedMathematics": "الرياضيات التطبيقية",
        "physics": "الفيزياء",
        "totalGrades": "مجموع الدرجات"
    
    
    },
    unCalculatedGrades : {
        "religiousEducation": "التربية الدينية",
        "nationalEducation": "التربية الوطنية",
        "economicsAndStatistics": "الاقتصاد والإحصاء",
    }
    
}

const mainTitle={
    "studentInfo":"البيانات الشخصيه",
    "calculatedGrades":"نتيجة الطالب",
    "unCalculatedGrades":"الدرجات غير المحسوبة"
}




const SingleResult=()=>{

    const {options}=useGlobalContext()


    const{number}=useParams()
    const{data,isLoading}=useGetResultsBySittingNumberQuery(number)

    const {result} = resultApiSlice.endpoints[options.searchBy].useQuery({name:options.value,page:options.page},{
        selectFromResult: ({ data }) => ({
            result: data?.data?.find((result)=>result.studentInfo.sittingNumber === number)
        }),
    })







    useEffect(()=>{

        document.body.scrollTop = document.documentElement.scrollTop = 0;

    },[])


    if(isLoading && !result ){
        return( 
            <div  className="flex justify-center items-center  min-h-screen">
                <ReactLoading type="bubbles" color="#0000FF" height={100} width={50} />
            </div>
        )
    }




    let DataForStudent=data?.data ? data?.data :result


    if(!DataForStudent){
       return <div>555</div>
    }

    
    let infoStudent = Object.entries(DataForStudent)  /// convert main object to array 


   

    let dalay=-0.4



    return(
        <motion.div className="container mx-auto px-4 pt-20 pb-20  ">
 
   
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 flex-wrap ">
                {infoStudent.map((entrie,index)=>{

                    let baseTitle=entrie[0]
                    let data=Object.entries(entrie[1])
                    let count=0
                    dalay=dalay+0.1


                    

                    return(
                        <motion.div key={baseTitle} className="min-w-fit"
                            initial={{ opacity:0 ,scale:0}}
                            whileInView={{ opacity: 1 ,scale:1}}
                            viewport={{ once: true }}
                            /*animate={{ x: 0 }}*/
                            transition={{delay:dalay,duration:0.6}} 
                   

                            
                        >
                            <h2 className={`${baseTitle+"-title"} p-4 text-xl text-center font-semibold text-white`} >{mainTitle[baseTitle]}</h2>

                            <div>
                                {data.map((info,index)=>{
                                    let title=info[0]
                                    let value=info[1]

                                    
                                    if(value === "غير مقرر"){
                                        count++;
                                        return ""
                                    }

                                    return(
                                        <div key={`${baseTitle}${index}`} className={`flex  flex-wrap gap-3 p-4 ${(index+count) % 2 ? 'bg-[#f1f1f1]' :""}  justify-center ${baseTitle}`}>

                                            <h5 className={`font-bold text-center  basis-[150px]`}>{ bigData[baseTitle][title] ? bigData[baseTitle][title] :title }</h5>

                                            <h5 className={`${baseTitle ==="studentInfo" ?"font-semibold" :"font-bold"} basis-[150px]  flex-1 text-center`}> {value} </h5>
                                            
                                        </div>
                                    )


                                })}
                            </div>

                        </motion.div>
                    )
                })}
            </div>

        </motion.div>
    )
}
export default SingleResult




