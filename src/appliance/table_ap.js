import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetch_appliances } from "../store/slice/appliance_slice"


function Table_ap(){
    const dispatch= useDispatch()
   const data= useSelector(state=>state.appliance.appliances)
    useEffect(()=>{dispatch(fetch_appliances())},[])

    return(
        <div>

            <table class="table table-dark table-striped ">
                <tbody>
                     <tr>
                    <td>libelle</td>
                    <td>DBID</td>
                    <td>reference</td>
                    <td>type</td>
                    <td>historique</td>
                    <td>action</td>
                    </tr>
                    {
                        data?.map((a)=>(
                         <tr key={a.id}>
                            <td>{a.libelle}</td>
                            <td>{a.dbid}</td>
                            <td>{a.reference}</td>
                            <td>{a.type}</td>
                            <td><button type="button" class="btn btn-light">details</button></td>
                            <td>
                                <button type="button" class="btn btn-info">edit</button>
                                <button type="button" class="btn btn-danger">delet</button>
                            </td>
                         </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table_ap