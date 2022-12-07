import { FaUserGraduate } from "react-icons/fa";



const dataGradution=[
    [
        {
            title:"طلاب ثانوي",
            number:"709,867"
        },
        {
            title:"ادبي",
            number:"259,961"

        },
        {
            title:"مدارس النيل",
            number:"163"
        },
    ],
    [
        {
            title:"علمى علوم",
            number:"330,874"
        },
        {
            title:"المتفوقين",
            number:"1,796"

        },
        {
            title:"الدبلومات الخاصة",
            number:"15,691"
        },

    ],
    [
        {
            title:"علمى رياضة",
            number:"98,910"
        },
        {
            title:"الدمج التعليمي",
            number:"2,222"

        },
        {
            title:"المكفوفين",
            number:"250"
        },

    ]
]

const StudentGraduate=()=>{

    return(
        <div className="flex gap-2 mx-auto w-fit p-4 flex-wrap justify-center">
            {dataGradution.map((col)=>{
                return(
                    <div className="flex flex-col gap-4">
                        {col.map((data)=>{
                            return(
                                <div className="flex justify-center items-center flex-col">
                                    <FaUserGraduate color={"#f53e3d"} size={50}/>
                                    <h3 className=" font-semibold  text-2xl py-2">{data.title}</h3>
                                    <h3 className="mt-4 font-extrabold text-3xl">{data.number}</h3>
                                </div>
                            )

                        })}
                    </div>
                )
           

            })}
            <div></div>
        </div>
    )

}

export default StudentGraduate