import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { fetch_client } from "../store/slice/client_slice";
import { fetch_appliances_detail } from "../store/slice/appliance_slice";
import { fetch_pov_detail } from "../store/slice/pov_slice";

function Details_ap(){
    const detail=useSelector(state=>state.appliance.detail);
    const dispach=useDispatch()

    return(
        <div>
            <table class="table bottom">
                <tbody>
                <tr>
                    <td>client</td>
                    <td>libelle</td>
                    <td>date debut</td>
                    <td>date fin</td>
                    <td>description</td>
                    <td>analyse cyber securite</td>
                    <td>compte manager</td>
                    <td>ingenieur cyber securite</td>
                </tr>
                 {
                    detail.map((d , i)=>(
                        <tr key={i}>
                            <td onClick={()=>dispach(fetch_client(d.client_id))}><Link to="/client/info">{d.libelle}</Link></td>
                            <td onClick={()=>dispach(fetch_pov_detail(d.id))}><Link to="/pov/detail">{d.libelle_appliance}</Link></td>
                            <td>{d.date_debut}</td>
                            <td>{d.date_fin}</td>
                            <td>{d.description}</td>
                            <td>{d.analyse_cybersecurite}</td>
                            <td>{d.compte_manager}</td>
                            <td>{d.ingenier_cybersecurite}</td>
                        </tr>   
                    ))
                 }
                </tbody>
            </table>
        </div>
    )
}
export default Details_ap