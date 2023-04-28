import { useState } from "react"
import { useSelector } from "react-redux"





function Contact (){
    const client=useSelector(state=>state.clients.client)
    const loading=useSelector(state=>state.clients.loading)

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
                <p>nom :{client.libelle}  </p>
                <p>activite : {client.activite} </p>
                <p>secteur : {client.secteur} </p>
                <p>filter</p>
                <input type="text" placeholder="filter" />
                <button type="button" class="btn btn-primary">ajouter</button>
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
                        <button type="button" class="btn btn-info">edit</button>
                        <button type="button" class="btn btn-danger" onClick={() => dl(c.id)}>delet</button> 
                        </td>
                    </tr>
                  ))}
                    
                </tbody>
            </table>

            </div>
            
        </div>
    )
}

export default Contact