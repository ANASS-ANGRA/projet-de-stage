import { Link } from "react-router-dom";


function Nav_bar(){
    return(
        <div id="nav_bar"> 
            <ul class="nav bg-primary text-white">
               <li class="nav-item">
                   <Link class="nav-link text-white" to="/" >appliance</Link>
               </li>
               <li class="nav-item">
                <Link class="nav-link text-white" to="/clients" >clients</Link>
                </li>
               <li class="nav-item">
                    <a class="nav-link text-white" href="/pov">povs</a>
                </li>
          
            </ul>
           
        </div>
    )
}
export default Nav_bar;