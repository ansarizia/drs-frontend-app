import {useContext} from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css'

 function Navbar ()  {
   
    return (
        <div>
           
            <nav class="navbar">
     
     <div class="logo">DRS</div>
     
     <ul class="nav-links">
       
       <input type="checkbox" id="checkbox_toggle" />
       <label for="checkbox_toggle" class="hamburger">&#9776;</label>
       
       <div class="menu">
         <li><Link to="/">Home</Link></li>
         <li><Link to="/">About</Link></li>
         <li class="services">
           <Link href="/">Services</Link>
           
           <ul class="dropdown">
             <li><Link to="/">Home T</Link></li>
             <li><Link to="/">Home </Link></li>
             <li><Link to="/">Home </Link></li>
           </ul>
         </li>
         <li><Link to="/">Admin</Link></li>
         <li><Link to="/">Contact</Link></li>
       </div>
     </ul>
   </nav>
        </div>
        
    )
}

export default Navbar;