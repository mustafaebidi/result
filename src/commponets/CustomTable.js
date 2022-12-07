
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const CustomTable=({data,columns})=>{
    return(
        <Table>
            <TableHead  className="mu:hidden">
                <TableRow>
                    {columns.map((col)=>{
                        return(
                            <TableCell key={col.id} align="center">{col.label}</TableCell>
                        )
                    })}

                </TableRow>
            </TableHead>

            <TableBody>
                {data.map((info,index)=>{
                    return(
                        <TableRow className={`${index % 2 === 0 ? "bg-[#afafaf25]" :""}`} key={info["_id"]}>
                            {columns.map(({id,Render,align,api},index)=>{
                                let value=info["studentInfo"][id]

                                if(Render){
                                    return(
                                        <TableCell className={`${id === "name" ? "mu: font-bold" :""} mu:block`} align={align} key={index}>
                                            <Render data={info} id={id} api={api}  />
                                        </TableCell>
                                    ) 
                                }
        
                                return <TableCell className="mu:block"  key={index} align="center">{value}</TableCell>
                                
                                


                            })}
                        </TableRow>
                    )
                })}

            </TableBody>    
        </Table>
    )
}

export default CustomTable