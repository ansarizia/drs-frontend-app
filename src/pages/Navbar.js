import {useContext} from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css'
import logo from '../images/eand-icon.svg';
import etlogo from '../images/etnewlogo.svg';



 function Navbar ()  {
   
    return (
        <div>
           
            <nav class="navbar">
     
     
     <div class="et_logo"> <img src={etlogo}></img> DRS</div>
     
     <ul class="nav-links">
       
       
       <label for="checkbox_toggle" class="hamburger">&#9776;</label>
       
       <div class="menu">
         <li><Link to="/">Home</Link></li>
         <li class="services">
           <Link href="/">Services</Link>
           
           <ul class="dropdown">
             <li><Link to="/">Service 1</Link></li>
             <li><Link to="/">Service 2 </Link></li>
             <li><Link to="/contactus">Contact </Link></li>
           </ul>
         </li>
         <li><Link to="/">Admin</Link></li>
         <li><Link to="/contactus">Contact</Link></li>
       </div>
     </ul>
   </nav>
        </div>
        
    )
}

export default Navbar;