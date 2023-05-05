import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Modal , Buimport ,Button ,Form } from "react-bootstrap" 
import axios from "axios"
import Api_base from "../api"
import { contact_edit_f, fetch_client } from "../store/slice/client_slice"




function Contact (){
    const client=useSelector(state=>state.clients.client)
    const loading=useSelector(state=>state.clients.loading)
    const [show, setShow] = useState(false);
    const [deletId ,setDeleteId]=useState(null);
    const [showedit, setShowedit] = useState(false);
    const [edit_id ,setEditId]=useState(null);
    const [show_ajouter, setShow_ajouter] = useState(false);
    const [nom ,setnom]=useState("")
    const [prenom ,setprenom]=useState("")
    const [function_ ,setfunction_]=useState("")
    const [email ,setemail]=useState()
    const [telephon ,settelephon]=useState()
    const contact_edit=useSelector(state =>state.clients.contact_edit)

    useEffect(()=>{
       setnom(contact_edit?.nom);
       setprenom(contact_edit?.prenom)
       setfunction_(contact_edit?.fonction)
       setemail(contact_edit?.email)
       settelephon(contact_edit?.telephon)
    },[contact_edit])

    function rest(){
       setEditId(null)
        setnom("");
       setprenom("")
       setfunction_("")
       setemail("")
       settelephon("")
    }

    const dispatch =useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
       setDeleteId(id)
       setShow(true);
       console.log(id)
    }

    const handleClose_edit = () =>{
      setShowedit(false);
      rest()
    } 
    const handleShow_edit = (id) => {
      dispatch(contact_edit_f(id))
        console.log(id)
     setEditId(id)
     setShowedit(true)
    }


    const handleClose_ajouter =()=> setShow_ajouter(false);
    const handleShow_ajouter =()=> setShow_ajouter(true)

    function ajouter(){
      const data={
        client_id:client.id,
        nom:nom,
        prenom:prenom,
        function:function_,
        email:email,
        telephon:telephon
    }
    console.log(data)
    axios.post(`${Api_base}ajouter_contact`,data).then(()=>{
        dispatch(fetch_client(client.id))
        setShow_ajouter(false)
        rest()
    })
    }
  
    function dl(){
        axios.get(`${Api_base}delete_contact/${deletId}`).then(()=>{
            dispatch(fetch_client(client.id))
            setDeleteId(null)
            setShow(false);
        })
    }

    function edit_(){
        const data={
            id:edit_id,
            nom:nom,
            prenom:prenom,
            function:function_,
            email:email,
            telephon:telephon
        }
        console.log(data)
        axios.post(`${Api_base}edit_contact`,data).then(()=>{
            dispatch(fetch_client(client.id))
            setEditId(null);
            setShowedit(false)
            rest()
        })
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
                <p>nom :{client.libelle}  </p>
                <p>activite : {client.activite} </p>
                <p>secteur : {client.secteur} </p>
                <p>filter</p>
                <input type="text" placeholder="filter" />
                <button type="button" class="btn btn-primary" onClick={handleShow_ajouter}>ajouter</button>
            </div>
            <div>
            <table class="table bottom">
                <tbody>
                    <tr>
                        <td>Nom</td>
                        <td>prenom</td>
                        <td>fonction</td>
                        <td>email</td>
                        <td>telephone</td>
                        <td>action</td>
                    </tr>
                  {client.contact?.map((c)=>(
                    <tr>
                        <td>{c.nom}</td>
                        <td>{c.prenom}</td>
                        <td>{c.fonction}</td>
                        <td>{c.email}</td>
                        <td>{c.telephon}</td>
                        <td>
                        <button type="button" class="btn btn-info" onClick={()=> handleShow_edit(c.id)}>edit</button>
                        <button type="button" class="btn btn-danger" onClick={() => handleShow(c.id)}>delet</button> 
                        </td>
                    </tr>
                  ))}
                    
                </tbody>
            </table>

            </div>
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
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={nom}
                onChange={(e)=>{setnom(e.target.value)}}
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>prenom</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={prenom}
                onChange={(e)=>{setprenom(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>function</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={function_}
                onChange={(e)=>{setfunction_(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                autoFocus
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>telephon</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                value={telephon}
                onChange={(e)=>{settelephon(e.target.value)}}
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_edit}>
            Close
          </Button>
          <Button variant="primary" onClick={edit_}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show_ajouter} onHide={handleClose_ajouter}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={nom}
                onChange={(e)=>{setnom(e.target.value)}}
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>prenom</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={prenom}
                onChange={(e)=>{setprenom(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>function</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={function_}
                onChange={(e)=>{setfunction_(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                autoFocus
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>telephon</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                value={telephon}
                onChange={(e)=>{settelephon(e.target.value)}}
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_ajouter}>
            Close
          </Button>
          <Button variant="primary" onClick={ajouter}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      
            
        </div>
    )
}

export default Contact