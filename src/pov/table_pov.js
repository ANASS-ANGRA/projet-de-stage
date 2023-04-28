import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetch_povs } from "../store/slice/pov_slice"
import axios from "axios"
import Api_base from "../api"



function Table_pov(){
    const povs=useSelector(state=>state.povs.povs)
    const dispatch =useDispatch()
    useEffect(()=>{dispatch(fetch_povs())},[])

    function dl(id){
        axios.get(`${Api_base}delete_pov/${id}`).then(()=>{
            dispatch(fetch_povs())
        })
    }

    return(
        <div>
            <table class="table table-dark table-striped ">
                <tbody>
                    <tr>
                        <td>client</td>
                        <td>libelle</td>
                        <td>libelle appliance</td>
                        <td>date debut</td>
                        <td>date fin</td>
                        <td>description</td>
                        <td>analyse cybersecurite</td>
                        <td>ingenieur cybersecurite</td>
                        <td>compte Manager</td>
                        <td>action</td>
                    </tr>
                    {povs.map((p)=>(
                        <tr>
                            <td>{p.client.libelle}</td>
                            <td>{p.libelle_pov}</td>
                            <td>{p.appliance.libelle}</td>
                            <td>{p.date_debut}</td>
                            <td>{p.date_fin}</td>
                            <td>{p.description}</td>
                            <td>{p.analyse_cybersecurite}</td>
                            <td>{p.ingenier_cybersecurite}</td>
                            <td>{p.compte_manager}</td>
                            <td>
                            <button type="button" class="btn btn-info">edit</button>
                            <button type="button" class="btn btn-danger" onClick={() => dl(p.id)}>delet</button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table_pov