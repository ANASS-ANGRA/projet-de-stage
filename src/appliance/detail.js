import { useEffect } from "react";
import { useSelector } from "react-redux"

function Details_ap(){
    const detail=useSelector(state=>state.appliance.detail);

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
                            <td>{d.libelle}</td>
                            <td>{d.libelle_appliance}</td>
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