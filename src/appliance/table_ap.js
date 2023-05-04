import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { edit, fetch_appliances, fetch_appliances_detail } from "../store/slice/appliance_slice"
import axios from "axios"
import Api_base from "../api"
import {Modal , Buimport ,Button ,Form } from "react-bootstrap" 


function Table_ap(){
    const dispatch= useDispatch()
   const data= useSelector(state=>state.appliance.appliances)
   const option = useSelector(state=>state.appliance.type)
     const [show, setShow] = useState(false);
     const [deletId ,setDeleteId]=useState(null);
     const [showedit, setShowedit] = useState(false);
     const [edit_id ,setEditId]=useState(null);
     const [type,settype]=useState("")
     const [libelle_edit,setLibelle_edite]=useState();
     const [DBID_edit ,setDbid_edit]=useState();
     const [reference ,setReference_edit]=useState();

     const edit_e =useSelector(state=>state.appliance.edit)
     useEffect(()=>{
       setLibelle_edite(edit_e?.libelle_appliance)
      setDbid_edit(edit_e?.dbid)
       setReference_edit(edit_e?.reference)
       settype(edit_e?.type_id)
     },[edit_e])

 useEffect(()=>{dispatch(fetch_appliances())},[])
  
 
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
   
    function dl(id){
        axios.get(`${Api_base}delete_appliance/${deletId}`).then(()=>{
            setDeleteId(null)
            handleClose()
            dispatch(fetch_appliances())
        })
    }

    const handleChange = (event) => {
      settype(event.target.value);
    };
    function edit_(){
      const data={
        id:edit_id,
        libelle:libelle_edit,
        DBID:DBID_edit,
        reference:reference,
        type:type
      }
      console.log(data)
        axios.post(`${Api_base}edit`,data).then(()=>{
           setEditId(null)
           setShowedit(false)
           dispatch(fetch_appliances())
        })
    }
    
    return(
        <div>

            <table class="table table-dark table-striped ">
                <tbody>
                     <tr>
                    <td>libelle</td>
                    <td>DBID</td>
                    <td>reference</td>
                    <td>type</td>
                    <td>historique</td>
                    <td>action</td>
                    </tr>
                    {
                        data?.map((a)=>(
                         <tr key={a.id}>
                            <td>{a.libelle_appliance}</td>
                            <td>{a.dbid}</td>
                            <td>{a.reference}</td>
                            <td>{a.type.libelle}</td>
                            <td><button type="button" class="btn btn-light" onClick={()=>{dispatch(fetch_appliances_detail(a.id))}}>details</button></td>
                            <td>
                                <button type="button" class="btn btn-info" onClick={()=>handleShow_edit(a.id)}>edit</button>
                                <button type="button" class="btn btn-danger" onClick={() => handleShow(a.id)}>delet</button>
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
                value={libelle_edit}
                onChange={(e)=>{setLibelle_edite(e.target.value)}}
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Dbid</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={DBID_edit}
                onChange={(e)=>{setDbid_edit(e.target.value)}}
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>refernce</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={reference}
                onChange={(e)=>{setReference_edit(e.target.value)}}
              />
            </Form.Group>
            <Form.Group>
                  <Form.Select onChange={handleChange}>
                  {option && option.map((o,i)=>(
                <option key={i} value={o.id}>{o.libelle}</option>
             ))}
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

export default Table_ap