import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { edit, fetch_appliances, fetch_appliances_detail } from "../store/slice/appliance_slice"
import axios from "axios"
import Api_base from "../api"


function Table_ap(){
    const dispatch= useDispatch()
   const data= useSelector(state=>state.appliance.appliances)
    useEffect(()=>{dispatch(fetch_appliances())},[])
   
    function dl(id){
        axios.get(`${Api_base}delete_appliance/${id}`).then(()=>{
            dispatch(fetch_appliances())
        })
    }
    
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
                            <td>{a.libelle_appliance}</td>
                            <td>{a.dbid}</td>
                            <td>{a.reference}</td>
                            <td>{a.type.libelle}</td>
                            <td><button type="button" class="btn btn-light" onClick={()=>{dispatch(fetch_appliances_detail(a.id))}}>details</button></td>
                            <td>
                                <button type="button" class="btn btn-info" onClick={()=>{dispatch(edit(a.id))}}>edit</button>
                                <button type="button" class="btn btn-danger" onClick={() => dl(a.id)}>delet</button>
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