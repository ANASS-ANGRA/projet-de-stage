import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetch_clients } from "../store/slice/client_slice"
import Api_base from "../api"
import axios from "axios";


function Table_client(){
    const clients=useSelector(state=>state.clients.clients)
    const dispatch= useDispatch()
     useEffect(()=>{dispatch(fetch_clients())},[])

   
     function dl(id){
        axios.get(`${Api_base}delet_client/${id}`).then(()=>{
              dispatch(fetch_clients())
         })
     }
    
    return(
        <div>
            <table class="table table-dark table-striped ">
                <tbody>
                    <tr>
                        <td>Nom</td>
                        <td>Activite</td>
                        <td>secteur</td>
                        <td>action</td>
                    </tr>
                    {
                        clients.map((c)=>(
                            <tr>
                                <td>{c.libelle}</td>
                                <td>{c.activite}</td>
                                <td>{c.secteur}</td>
                                <td> 
                                <button type="button" class="btn btn-light">details</button>
                                <button type="button" class="btn btn-info">edit</button>
                                <button type="button" class="btn btn-danger" onClick={() => dl(c.id)}>delet</button>
                                </td>
                            </tr>
                        ))
                    }
                  
                </tbody>
            </table>
        </div>
    )
}

export default Table_client