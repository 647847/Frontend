import {Link} from 'react-router-dom'
import classes from './MainNavigation.module.css'
import React from 'react';
export default function MainNavigation(){
    return(
        <header className={classes.header}>
            
            <li>
                        <Link to='/'><div className={classes.logo}>Telstra</div></Link>
                    </li>
            {/* <img src="https://www.edigitalagency.com.au/wp-content/uploads/telstra-logo-purple-background-800x800.png" className={classes.image}/> */}
            <nav>
   
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/generate'>Generate</Link>
                    </li>
                    <li>
                        <Link to='/validate'>Validate</Link>
                    </li>
                    <li>
                        <Link to='/renew'>Renew</Link>
                    </li>
                    <li>
                        <Link to='/download'>Download</Link>
                    </li>
                </ul>
            </nav>
        </header>

    )
}