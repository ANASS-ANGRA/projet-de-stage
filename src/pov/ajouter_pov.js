import { useDispatch, useSelector } from "react-redux"
import "./style.css"
import { useEffect, useState } from "react"
import { fetch_appliances } from "../store/slice/appliance_slice"
import { fetch_clients } from "../store/slice/client_slice"
import axios from "axios"
import Api_base from "../api"
import { fetch_povs } from "../store/slice/pov_slice"


function Ajouter_pov(){
       const [libelle,setlibelle]=useState("")
       const [appliance,setappliance]=useState("")
       const [client,setclient]=useState("")
       const [date_d,setdate_d]=useState("")
       const [date_f,setdate_f]=useState("")
       const [compte,setcompte]=useState("")
       const [ingeneur,setingeneur]=useState("")
       const [analyse,setanalyse]=useState("")
       const [descreption ,setdescreption]=useState("")
       const appliances= useSelector(state=>state.appliance.appliances)
       const clients=useSelector(state=>state.clients.clients)
       const dispatch=useDispatch()


       useEffect(()=>{dispatch(fetch_appliances())
           dispatch(fetch_clients())
        },[])

        function ajouter_pov(){
            const data ={
                libelle:libelle,
                appliance:appliance,
                client:client,
                date_d:date_d,
                date_f:date_f,
                compte:compte,
                ingeneur:ingeneur,
                analyse:analyse,
                descreption:descreption,
            }
           axios.post(`${Api_base}ajouter_pov`,data).then(()=>{
              dispatch(fetch_povs())
           })
        }

        function rest(){
            setlibelle("")
            setappliance("")
            setclient("")
            setdate_d("")
            setdate_f("")
            setcompte("")
            setingeneur("")
            setanalyse("")
            setdescreption("")
        }

   



    return(
        <div class="form">
            <h1>Pov</h1>
            <input type="text" placeholder="libelle" value={libelle} onChange={(e)=>{setlibelle(e.target.value)}}/>
            <select onChange={(e)=>{setappliance(e.target.value)}} value={appliance}>
                <option value="" >Appliance</option>
                {appliances.map((a,i)=>(
                     <option key={i}  value={a.id}>{a.libelle_appliance}</option>
                ))}
                
            </select>
            <select onChange={(e)=>{setclient(e.target.value)}} value={client}>
                <option value="">client</option>
                {clients.map((c,i)=>(
                    <option key={i} value={c.id}>{c.libelle}</option>
                ))}
            </select>
            <input type="date"  placeholder="Date debut" id="formulaire" required onChange={(e)=>{setdate_d(e.target.value)}}/>
            <input type="date"  placeholder="Date fin" id="formulaire" required onChange={(e)=>{setdate_f(e.target.value)}} />
            <input type="text" placeholder="compte manager" value={compte}   onChange={(e)=>{setcompte(e.target.value)}}/>
            <input type="text" placeholder="ingeneur cybersecurite" value={ingeneur} onChange={(e)=>{setingeneur(e.target.value)}} />
            <input type="text" placeholder="analyse cybersecurite" value={analyse} onChange={(e)=>{setanalyse(e.target.value)}}/>
            <input type="text" placeholder="descreption" value={descreption}  onChange={(e)=>{setdescreption(e.target.value)}}/>
            <button  type="button" class="btn btn-light" onClick={ajouter_pov}>submit</button>
             <button type="button" class="btn btn-danger" onClick={rest} >Rest</button>
        </div>
    )
}

export default Ajouter_pov