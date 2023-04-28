import { useState } from "react"
import { useSelector } from "react-redux"




function Detail_pov(){
    const pov=useSelector(state=>state.povs.pov)
     const loading=useSelector(state=>state.povs.loading)

     if(loading){
        return(
            
                <div class="center">
                    <div class="wave"></div>
                    <div class="wave"></div>
                   <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                  <div class="wave"></div>
                   <div class="wave"></div>
                    <div class="wave"></div>
                   <div class="wave"></div>
                  </div>
         
        )
     }



    function dl(){

    }
    return(
         <div>
            <div class="form">
                <p> <b>libelle : </b>{pov.libelle_pov}</p>
                <p><b>appliance :</b> {pov.appliance.libelle_appliance}</p>
                <p><b>client :</b> {pov.client.libelle}</p>
                <p><b>date debut</b> {pov.date_debut}</p>
                <p><b>date_fin</b> {pov.date_fin}</p>
                <p><b>description</b> {pov.description}</p>
                <p><b>compte_manager</b> {pov?.compte_manager}</p>
                <p><b>ingenier_cybersecurite</b> {pov?.ingenier_cybersecurite}</p>
                <p><b>analyse_cybersecurite</b> {pov.analyse_cybersecurite}</p>

            </div>
            <div>
            <h1 class="text-center">sceance</h1>
            <table class="table bottom">
                <tbody>
                    <tr>
                        <td>date sceance</td>
                        <td>Resumer</td>
                        <td>list participant</td>
                        <td>action</td>
                    </tr>
                    {pov.science.map((s)=>(
                       <tr>
                        <td>{s?.date_sceance}</td>
                        <td>{s?.resumer}</td>
                        <td>{s?.participant}</td>
                        <td>
                        <button type="button" class="btn btn-info">edit</button>
                        <button type="button" class="btn btn-danger" onClick={() => dl(s.id)}>delet</button>
                        </td>
                       </tr>
                    ))}
                </tbody>
            </table>

            </div>
            <div>
            <h1 class="text-center">suivi</h1>
            <table class="table bottom">
                <tbody>
                    <tr>
                        <td>offre_commerciel</td>
                        <td>Montant</td>
                        <td>compte_rendu</td>
                        <td>type_prsentation</td>
                        <td>action</td>
                    </tr>
                    <tr>
                        <td>{pov.suivi?.offre_commerciel}</td>
                        <td>{pov.suivi?.mantant}</td>
                        <td>{pov.suivi?.compte_rendu}</td>
                        <td>{pov.suivi?.type_prsentation_id}</td>
                        <td>
                               <button type="button" class="btn btn-info">edit</button>
                        <button type="button" class="btn btn-danger">delet</button> 
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
         </div>
    )
}

export default Detail_pov