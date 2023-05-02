import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { recherche } from "../store/slice/appliance_slice"




function Recherch(){
   const [appliance,setappliance]=useState()
   const [c ,setc] = useState()
   const data=useSelector(state=>state.appliance.rech)
   const loading =useSelector(state=>state.appliance.loading)

   const dispatch =useDispatch()
   function recherch(){
     const d ={
        appliance:appliance,
        client:c
     }
    dispatch(recherche(d))
   }


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

   
    return(
        <div>
            <div>
                <label>appliance :</label><br/>
                <input type="text" placeholder="appliance" value={appliance} onChange={(e)=>{setappliance(e.target.value)}} /><br/>
                 <label>client</label><br/>
                <input type="text" placeholder="client" value={c} onChange={(e)=>{setc(e.target.value)}} /><br/>
                 <button type="button" class="btn btn-info" onClick={recherch}>recherche</button>
            </div>
            <div>
                <table class="table bottom">
                    <tbody>
                        <tr>
                            <td>client</td>
                            <td>pov libelle</td>
                            <td>appliance libelle</td>
                            <td>date debut</td>
                            <td>date fin</td>
                            <td>description</td>
                            <td>analyse cybersecurite</td>
                            <td>compte manager</td>
                            <td>ingenieur cybersecurite</td> 
                        </tr>
                        <tr>
                            <td>{data?.libelle}</td>
                            <td>{data?.libelle_pov}</td>
                            <td>{data?.libelle_appliance}</td>
                            <td>{data?.date_debut}</td>
                            <td>{data?.date_fin}</td>
                            <td>{data?.description}</td>
                            <td>{data?.analyse_cybersecurite}</td>
                            <td>{data?.compte_manager}</td>
                            <td>{data?.ingenier_cybersecurite}</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Recherch 