import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div className={'navbar'}>
            <Link to="/" className="navbar__item">Design</Link>
            <Link to="/text" className="navbar__item">Text editor</Link>
        </div>
    )
};

export default NavBar;