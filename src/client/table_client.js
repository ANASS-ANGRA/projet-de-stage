import { useEffect ,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { edit, fetch_client, fetch_clients } from "../store/slice/client_slice"
import Api_base from "../api"
import axios from "axios";
import { Link } from "react-router-dom";
import {Modal , Buimport ,Button ,Form } from "react-bootstrap" 


function Table_client(){
    const clients=useSelector(state=>state.clients.clients)
    const [show, setShow] = useState(false);
    const [deletId ,setDeleteId]=useState(null);
    const [showedit, setShowedit] = useState(false);
    const [edit_id ,setEditId]=useState(null);
    const [nom ,setNom]=useState();
    const [activite ,setActivite]=useState();
    const [secteur ,setSecteur]=useState() 

    const edit_e = useSelector(state=>state.clients.edit)
    useEffect(()=>{
       setNom(edit_e?.libelle)
       setActivite(edit_e?.activite)
       setSecteur(edit_e?.secteur)
  
    },[edit_e])

    const dispatch= useDispatch()
     useEffect(()=>{dispatch(fetch_clients())},[])

     const handleClose = () => setShow(false);
     const handleShow = (id) => {
      console.log(id)
      setDeleteId(id)
      setShow(true);
     }

     const handleClose_edit = () => setShowedit(false);
     const handleShow_edit = (id) => {
      setEditId(id)
      setShowedit(true);
      dispatch(edit(id))
     }

     const handleChange = (event) => {
        setSecteur(event.target.value);
      };
    
     function dl(){
        axios.get(`${Api_base}delet_client/${deletId}}`).then(()=>{
              dispatch(fetch_clients())
              setShow(false)
              setDeleteId(null)
         })
     }

     function edit_(){
         const data={
            id:edit_id,
            nom:nom,
            activite:activite,
            type:secteur
         }
           axios.post(`${Api_base}edit_client`,data).then(()=>{
                setShowedit(false)
                setEditId(null)
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
                                <button type="button" class="btn btn-light" onClick={()=> dispatch(fetch_client(c.id))}><Link to="/client/info">details</Link></button>
                                <button type="button" class="btn btn-info" onClick={()=>{handleShow_edit(c.id)}}>edit</button>
                                <button type="button" class="btn btn-danger" onClick={() => handleShow(c.id)}>delet</button>
                                </td>
                            </tr>
                        ))
                    }
                  
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr(e) de vouloir supprimer ceci ? Cette action est définitive et ne peut pas être annulée. Veuillez confirmer votre choix en appuyant sur OK ou annulez en appuyant sur Annuler.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            annulée
          </Button>
          <Button variant="primary" onClick={dl}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showedit} onHide={handleClose_edit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>libelle</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={nom}
                onChange={(e)=>{setNom(e.target.value)}}
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>activite</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={activite}
                onChange={(e)=>{setActivite(e.target.value)}}
              />
            </Form.Group>
            <Form.Group>
                  <Form.Select onChange={handleChange}>
                  <option value="">--Please choose an option--</option>
                <option value="public">public</option>
                <option value="privite">privite</option>
                  </Form.Select>
           
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_edit}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{edit_()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

     
        </div>
    )
}

export default Table_client