import { useSelector } from "react-redux"
import Ajouter_pov from "./ajouter_pov"
import Table_pov from "./table_pov"



function Pov(){
  
     return(
        <div>
            <Ajouter_pov/>
            <Table_pov/>
        </div>
     )
}

export default Pov