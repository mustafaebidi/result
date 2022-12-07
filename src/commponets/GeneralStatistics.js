
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const head=["العام الدراسي","متقدم","حاضر","ناجح","نسبة النجاح"]

const listData=[
    ["2020 - 2021","648,946","582,096","428,700","73.6%"],
    ["2019 - 2020","660,301","602,183","593,962","98.6%"],
    ["2018 - 2019","656,159","576,873","567,290","98.3%"]
]

const GeneralStatistics=()=>{

    return(<Table>

        <TableHead  className="mu:hidden">
            <TableRow >
                {head.map((col,index)=>{
                    return(
                        <TableCell className=" font-bold text-lg" key={index} align="center">{col}</TableCell>
                    )
                })}

            </TableRow>
        </TableHead>
        
        <TableBody>

                {
                    listData.map((col,index)=>{
                        return <TableRow className={`${index % 2 ? 'bg-[#dde4dd]' :""}`} >
                            {col.map((cell,index)=>{
                                return(
                                    <TableCell data-content={head[index]} className={`font-bold  flex-wrap mu:flex gap-4 justify-center`}  align="center">
                                        <div  className="hidden mu:block   basis-[195px]">{head[index]}</div>
                                        <div className="flex-1 min-w-fit">{cell}</div>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    })
   
                }

        </TableBody>
    
    
    </Table>)

}

export default GeneralStatistics