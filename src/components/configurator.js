import React from 'react';
import {observer} from 'mobx-react';
import NavBar from './navbar';
import Menu from "./menu";
import WindowsWrapper from "./windows/windows-wrapper";
import DevTools from 'mobx-react-devtools';

const Configurator = () => {
    return (
        <div className={'configurator'}>
            <DevTools/>
            <NavBar/>
            <div className={'main'}>
                <Menu/>
                <WindowsWrapper/>
            </div>
        </div>
    )
};

export default Configurator;