

function Nav_bar(){
    return(
        <div id="nav_bar"> 
            <ul class="nav bg-primary text-white">
               <li class="nav-item">
                   <a class="nav-link active text-white" aria-current="page" href="#">Active</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link text-white" href="#">home</a>
                </li>
               <li class="nav-item">
                    <a class="nav-link text-white" href="#">action</a>
                </li>
                <li class="nav-item">
                      <a class="nav-link disabled">Disabled</a>
                </li>
            </ul>
           
        </div>
    )
}
export default Nav_bar;