import React from 'react';
import NavBar from './Navbar';
import Menu from './menu';
import WindowsWrapper from './windows/WindowWrapper';
import DevTools from 'mobx-react-devtools';

const Configurator = () => {
    return (
        <div className="configurator">
            <DevTools/>
            <NavBar/>
            <div className="main">
                <div className="content">
                    <Menu/>
                    <WindowsWrapper/>
                </div>
            </div>
        </div>
    )
};

export default Configurator;