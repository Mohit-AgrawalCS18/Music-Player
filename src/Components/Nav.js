import React from 'react'
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Nav=({setSidebar,Sidebar})=>{
     
    return(
       
    <header className="Navbar main-header d-flex justify-content-center m-3">
            <h4 className="col-sm-6"><b>Beats<FontAwesomeIcon icon={faMusic} className="mr-2" /></b></h4>
                <span>
                    <button onClick={()=>setSidebar(!Sidebar)} type="button"className="btn btn-outline-dark btn-block">
                        <div className="d-flex">
                            <div><FontAwesomeIcon icon={faMusic} className="mr-2" /></div>
                            <div>Library</div>
                        </div>
                    </button>
                </span>
            
            
    </header>
       
    )
}


export default Nav;