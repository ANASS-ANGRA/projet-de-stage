import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetch_appliances, fetch_type_appliance } from "../store/slice/appliance_slice";
import axios from "axios";
import Api_base from "../api";


function Ajouter_ap(){
const [libelle,setlibelle]=useState("")
const [DBID ,setDBID ]=useState("")
const [reference,setreference]=useState("")
const [type,settype]=useState("")





    const dispatch= useDispatch();
    const option = useSelector(state=>state.appliance.type)
    useEffect(()=>{
      dispatch(fetch_type_appliance())
    },[])

    const handleChange = (event) => {
        settype(event.target.value);
      };

      function ajouter(){
        const data={
            libelle:libelle,
            DBID:DBID,
            reference:reference,
            type:type
        }
        axios.post(`${Api_base}ajouter_appliance`,data).then(()=>{
            dispatch(fetch_appliances())
        })
      }
      function rest(){
        setDBID("");
        setlibelle("");
        setreference("");
        settype("")
      }
    

        return(
        <div>
            <h1>appliance</h1>
            <div id="form">
             <label> libelle : </label>
             <input type="text" placeholder="libelle" value={libelle} onChange={(e)=>{setlibelle(e.target.value)}} />
             <label> DBID : </label>
             <input type="text" placeholder="DBID" value={DBID} onChange={(e)=>{setDBID(e.target.value)}} />
             <label>reference :</label>
             <input type="text" placeholder="reference"  value={reference} onChange={(e)=>{setreference(e.target.value)}}/>
             <label>type :</label>
             <select id="mySelect" onChange={handleChange} value={type}>
             <option value="">--Please choose an option--</option>
             {option && option.map((o,i)=>(
                <option key={i} value={o.id}>{o.libelle}</option>
             ))}
             </select>
             <button onClick={ajouter} type="button" class="btn btn-light">submit</button>
             <button type="button" class="btn btn-danger" onClick={rest}>Rest</button>
            </div>
            <p>filter :</p><br/>
            <input type="text" />
        </div>
    )
}
export default Ajouter_ap