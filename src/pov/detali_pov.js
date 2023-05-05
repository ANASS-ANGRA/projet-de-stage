import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Modal , Buimport ,Button ,Form } from "react-bootstrap" 
import Api_base from "../api"
import { edit_sceance_sl, fetch_pov_detail } from "../store/slice/pov_slice"
import axios from "axios"



function Detail_pov(){
    const pov=useSelector(state=>state.povs.pov)
     const loading=useSelector(state=>state.povs.loading)
     const dispatch = useDispatch()

     /////////////////////////         ////////// sceance ///////           ////////////////

    const [id_sceance,setId_sceance]=useState()
    const [id_sceance_edit , setId_seance_edit]=useState()
    const[show_delet_sceance, setShow_delet_sceance]=useState(false)
    const[show_ajouter_sceance, setShow_ajouter_sceance]=useState(false)
    const [show_edit_sceance, Setshow_edit_seance]=useState(false)
    const [date_seance ,setdate_sceance] = useState()
    const [resumer_sceance ,setResume_sceance]=useState()
    const [participant_scenace ,setparticipant_sceance]=useState()
    const sceance_edit=useSelector(state=>state.povs?.sceance_edit)

    // delete//

    const handleClose_delet_seance  =()=> setShow_delet_sceance(false);
     const handleShow_delet_seance = (id)=>{
        console.log(id)
        setId_sceance(id)
        setShow_delet_sceance(true);
     }

     function delet_sience(){
         axios.get(`${Api_base}delet_seance/${id_sceance}`).then(()=>{
            setShow_delet_sceance(false);
            dispatch(fetch_pov_detail(pov.id))
         })
     }

     //edit //


     useEffect(()=>{
        setdate_sceance(sceance_edit?.date_sceance)
        setResume_sceance(sceance_edit?.resumer)
        setparticipant_sceance(sceance_edit?.participant)
     },[sceance_edit])
    const handleClose_edit_sceance = ()=>{
        Setshow_edit_seance(false)
        rest_sceance()
    }
    const handlshow_edit_sceance = (id) =>{
        console.log(id)
        setId_seance_edit(id)
        Setshow_edit_seance(true)
        dispatch(edit_sceance_sl(id))
    }
  
    function edit_sceance(){
          const data = {
            id:id_sceance_edit,
            date:date_seance,
            resumer:resumer_sceance,
            participant:participant_scenace
          }
          axios.post(`${Api_base}edit_seance`,data).then(()=>{
            dispatch(fetch_pov_detail(pov.id))
            handleClose_edit_sceance()
            rest_sceance()
          })
    }
       
    // ajouter //
    
    const handleClose_ajouter_seance = ()=>setShow_ajouter_sceance(false)
    const handleShow_ajouter_seance= () =>setShow_ajouter_sceance(true)

    function ajouter_sceance(){
       const data ={
        pov:pov.id,
        date:date_seance,
        resumer:resumer_sceance,
        participant:participant_scenace
    }
    axios.post(`${Api_base}ajouter_sceance`).then(()=>{
        dispatch(fetch_pov_detail(pov.id))
    })
   }
    function rest_sceance(){
        setdate_sceance("")
        setResume_sceance("")
        setparticipant_sceance( "")
    }

    ////////////////////////// suivi  ///////////////////////
    const [id_suivi, setId_suivi] = useState();
const [id_suivi_edit, setId_suivi_edit] = useState();
const [show_delete_suivi, setShow_delete_suivi] = useState(false);
const [show_edit_suivi, Setshow_edit_suivi] = useState(false);
const [offre_commerciel_edit ,setOffreCommerciel_edit]=useState()
const [Montant_edit , setMontant_edit] = useState()
const [compte_rendu_edit ,setcompte_rendu_edit] = useState()

    const handleClose_delet_suivi  =()=> setShow_delete_suivi(false);
    const handleShow_delet_suivi = (id)=>{
       console.log(id)
       setId_suivi(id)
       setShow_delete_suivi(true)
       setOffreCommerciel_edit()
    }

    function delet_suivi(){
        console.log(id_suivi)
        axios.get(`${Api_base}delete_suivi/${id_suivi}`).then(()=>{
           setShow_delete_suivi(false);
           dispatch(fetch_pov_detail(pov.id))
        })
    }


    const handleClose_edit_suivi = () => Setshow_edit_suivi(false)
    const handlshow_edit_suivi = () => {
        
        setId_suivi_edit(pov.suivi.id)
        setOffreCommerciel_edit(pov.suivi?.offre_commerciel)
        setMontant_edit(pov.suivi?.mantant)
        setcompte_rendu_edit(pov.suivi?.compte_rendu)
        Setshow_edit_suivi(true)
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
            <div class="form">
                <p> <b>libelle : </b>{pov.libelle_pov}</p>
                <p><b>appliance :</b> {pov.appliance?.libelle_appliance}</p>
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
            <button  type="button" class="btn btn-primary" onClick={handleShow_ajouter_seance}>ajouter</button>
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
                        <button type="button" class="btn btn-info" onClick={()=> handlshow_edit_sceance(s.id)}>edit</button>
                        <button type="button" class="btn btn-danger" onClick={() => handleShow_delet_seance(s.id)}>delet</button>
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
                         { pov.suivi?.id &&  <div> <button type="button" class="btn btn-info" onClick={handlshow_edit_suivi} >edit</button>
                        <button type="button" class="btn btn-danger" onClick={() => handleShow_delet_suivi(pov.suivi.id)}>delet</button> </div> }
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>

            <Modal show={show_delet_sceance} onHide={handleClose_delet_seance}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr(e) de vouloir supprimer ceci ? Cette action est définitive et ne peut pas être annulée. Veuillez confirmer votre choix en appuyant sur OK ou annulez en appuyant sur Annuler.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_delet_seance}>
            annulée
          </Button>
          <Button variant="primary" onClick={delet_sience}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show_edit_sceance} onHide={handleClose_edit_sceance}>
        <Modal.Header closeButton>
          <Modal.Title>Edit sceance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>date sceance</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                placeholder="date"
                value={date_seance}
                onChange={(e)=>{setdate_sceance(e.target.value)}}
              /> 
            </Form.Group>

          
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>resumer</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={resumer_sceance}
                onChange={(e)=>{setResume_sceance(e.target.value)}}
              />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>participant</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={participant_scenace}
                onChange={(e)=>{setparticipant_sceance(e.target.value)}}
              />
              </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_edit_sceance}>
            Close
          </Button>
          <Button variant="primary" onClick={edit_sceance}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={show_ajouter_sceance} onHide={handleClose_ajouter_seance}>
        <Modal.Header closeButton>
          <Modal.Title>Edit sceance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>date sceance</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                placeholder="date"
                value={date_seance}
                onChange={(e)=>{setdate_sceance(e.target.value)}}
              /> 
            </Form.Group>

          
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>resumer</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={resumer_sceance}
                onChange={(e)=>{setResume_sceance(e.target.value)}}
              />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>participant</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={participant_scenace}
                onChange={(e)=>{setparticipant_sceance(e.target.value)}}
              />
              </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_ajouter_seance}>
            Close
          </Button>
          <Button variant="primary" onClick={edit_sceance}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={show_delete_suivi} onHide={handleClose_delet_suivi}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr(e) de vouloir supprimer ceci ? Cette action est définitive et ne peut pas être annulée. Veuillez confirmer votre choix en appuyant sur OK ou annulez en appuyant sur Annuler.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_delet_suivi}>
            annulée
          </Button>
          <Button variant="primary" onClick={delet_suivi}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show_edit_suivi} onHide={handleClose_edit_suivi}>
        <Modal.Header closeButton>
          <Modal.Title>Edit suivi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>offre_commerciel</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={offre_commerciel_edit}
                onChange={(e)=>{setOffreCommerciel_edit(e.target.value)}}
              /> 
            </Form.Group>

          
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Montant</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={Montant_edit}
                onChange={(e)=>{setMontant_edit(e.target.value)}}
              />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>compte_rendu</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={compte_rendu_edit}
                onChange={(e)=>{setcompte_rendu_edit(e.target.value)}}
              />
              </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_edit_suivi}>
            Close
          </Button>
          <Button variant="primary" onClick={edit_sceance}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


         </div>
    )
}

export default Detail_pov