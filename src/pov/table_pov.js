import { useEffect , useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { edit, fetch_povs } from "../store/slice/pov_slice"
import axios from "axios"
import Api_base from "../api"
import {Modal , Buimport ,Button ,Form } from "react-bootstrap" 



function Table_pov(){
    const povs=useSelector(state=>state.povs.povs)
    const [show, setShow] = useState(false);
    const [deletId ,setDeleteId]=useState(null);
    const [showedit, setShowedit] = useState(false);
    const [edit_id ,setEditId]=useState(null);
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
    const edit_e =useSelector(state=>state.povs.edit)
    const dispatch =useDispatch()
    useEffect(()=>{dispatch(fetch_povs())},[])
  
    useEffect(()=>{
        setlibelle(edit_e?.libelle_pov)
        setappliance(edit_e?.appliance_id)
        setclient(edit_e?.client_id)
        setdate_d(edit_e?.date_debut)
        setdate_f(edit_e?.date_fin)
        setcompte(edit_e?.compte_manager)
        setingeneur(edit_e?.ingenier_cybersecurite)
        setanalyse(edit_e?.analyse_cybersecurite)
        setdescreption(edit_e?.description)

        },[edit_e])

    const handleClose = () => setShow(false);
    const handleShow = (id) => { 
        
     console.log(id)
     setDeleteId(id)
     setShow(true);
    
    }

    const handleClose_edit = () => setShowedit(false);
    const handleShow_edit = (id) => {
        dispatch(edit(id))
     setEditId(id)
     setShowedit(true);
    }
   


    function dl(){
        axios.get(`${Api_base}delete_pov/${deletId}`).then(()=>{
            setDeleteId(null)
            setShow(false)
            dispatch(fetch_povs())
            
        })
    }
    function edit_(){
        const data ={
            id:edit_id,
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
        console.log(data)
       axios.post(`${Api_base}pov_edit`,data).then(()=>{
        console.log("s s")
          dispatch(fetch_povs())
          setEditId(null)
          setShowedit(false)
       })
    }

    return(
        <div>
            <table class="table table-dark table-striped ">
                <tbody>
                    <tr>
                        <td>client</td>
                        <td>libelle</td>
                        <td>libelle appliance</td>
                        <td>date debut</td>
                        <td>date fin</td>
                        <td>description</td>
                        <td>analyse cybersecurite</td>
                        <td>ingenieur cybersecurite</td>
                        <td>compte Manager</td>
                        <td>action</td>
                    </tr>
                    {povs.map((p)=>(
                        <tr>
                            <td>{p.client.libelle}</td>
                            <td>{p.libelle_pov}</td>
                            <td>{p.appliance.libelle}</td>
                            <td>{p.date_debut}</td>
                            <td>{p.date_fin}</td>
                            <td>{p.description}</td>
                            <td>{p.analyse_cybersecurite}</td>
                            <td>{p.ingenier_cybersecurite}</td>
                            <td>{p.compte_manager}</td>
                            <td>
                            <button type="button" class="btn btn-info" onClick={()=>{handleShow_edit(p.id)}}>edit</button>
                            <button type="button" class="btn btn-danger" onClick={() => handleShow(p.id)}>delet</button>
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
            <Form.Label>libelle pov</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                placeholder="libelle pov"
                value={libelle}
                onChange={(e)=>{setlibelle(e.target.value)}}
              /> 
            </Form.Group>

            <Form.Group>
            <Form.Label>Appliance</Form.Label>
                  <Form.Select  onChange={(e)=>{setappliance(e.target.value)}} value={appliance}>
                  <option value="" >Appliance</option>
                  {appliances && appliances.map((a,i)=>(
                     <option key={i}  value={a.id}>{a.libelle_appliance}</option>
                ))}
                  </Form.Select>
           
            </Form.Group>

            <Form.Group>
            <Form.Label>client</Form.Label>
                  <Form.Select onChange={(e)=>{setclient(e.target.value)}} value={client}>
                  <option value="">client</option>
                { clients && clients.map((c,i)=>(
                    <option key={i} value={c.id}>{c.libelle}</option>
                ))}
                  </Form.Select>
           
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>date_debut</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                value={date_d}
                onChange={(e)=>{setdate_d(e.target.value)}}
              />
              </Form.Group>

             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>date fin</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                value={date_f}
                onChange={(e)=>{setdate_f(e.target.value)}}
              />
            </Form.Group >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>compte manager</Form.Label>
             <Form.Control
              type="text"
              placeholder="compte manager"
              value={compte}
              onChange={(e)=>{setcompte(e.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>analyse cybersecurite</Form.Label>
             <Form.Control
               type="text"
                placeholder="analyse cybersecurite"
                 value={analyse} 
                 onChange={(e)=>{setanalyse(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>descreption</Form.Label>
             <Form.Control
               type="text"
                placeholder="descreption"
                 value={descreption} 
                  onChange={(e)=>{setdescreption(e.target.value)}}
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
        </div>
    )
}

export default Table_pov