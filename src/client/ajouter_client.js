import axios from "axios"
import { useEffect, useState } from "react"
import Api_base from "../api";
import { useDispatch, useSelector } from "react-redux";
import { fetch_clients, new_client } from "../store/slice/client_slice";


function Ajouter_client(){
  const [nom,setnom]=useState('')
  const [activite ,setactivite]=useState('')
  const [type ,settype]=useState('')
  const dispatch =useDispatch()
  const edit = useSelector(state=>state.clients.edit)
  useEffect(()=>{
     setnom(edit?.libelle)
     setactivite(edit?.activite)
     settype(edit?.secteur)
     console.log(edit)
  },[edit])

    function ajouter(){
         const data={
            nom:nom,
            activite:activite,
            type:type
         }
         console.log(data)
         //dispatch(new_client(data))
         axios.post(`${Api_base}new_client`,data).then(()=>{
              dispatch(fetch_clients())
         })
    }
    function dl(id){
       
       // axios.get(`${Api_base}delete_appliance/${id}`).then(()=>{
        //    dispatch(fetch_appliances())
       // })
    }
    function rest() {
        setactivite('')
        setnom("")
        settype('')

    }
    const handleChange = (event) => {
        settype(event.target.value);
      };

    return(
        <div>

       
        <div class="form">
            <label>libelle :</label>
            <input type="text" placeholder="nom" value={nom} onChange={(e)=>{setnom(e.target.value)}}/>
            <label >activite</label>
            <input type="text" placeholder="activite" value={activite} onChange={(e)=>{setactivite(e.target.value)}} />
            <label>secteur</label>
            <select onChange={handleChange} value={type}>
            <option value="">--Please choose an option--</option>
                <option value="public">public</option>
                <option value="privite">privite</option>
            </select>
            <button onClick={ajouter} type="button" class="btn btn-light">submit</button>
             <button type="button" class="btn btn-danger" onClick={rest}>Rest</button>
        </div>
        <p>filter :</p><br/>
            <input type="text" />
         </div>
    )
}

export default Ajouter_client